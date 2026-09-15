/* ============================================================
   Sonsi FAN SITE — API（Cloudflare Worker）
   /api/ 以下のリクエストをこの1ファイルで処理します。
   それ以外のパスは静的ファイル（ASSETS）に渡します。

   必要なバインディング（wrangler.jsonc に記載）
     DB ................ D1 database
     ASSETS ............ 静的ファイル

   必要な環境変数（Cloudflareダッシュボード > 設定 > 変数とシークレット）
     DISCORD_CLIENT_ID / DISCORD_CLIENT_SECRET
     GOOGLE_CLIENT_ID  / GOOGLE_CLIENT_SECRET
     SITE_URL .......... https://sonsi-fan.site（末尾スラッシュなし）
   ============================================================ */

const SESSION_COOKIE = "sonsi_session";
const STATE_COOKIE   = "sonsi_state";
const SESSION_DAYS   = 30;
const POST_MAX_LEN   = 500;
const POST_INTERVAL  = 30;   // 秒。連投防止

/* ---------- 小道具 ---------- */
const now  = () => Math.floor(Date.now() / 1000);
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });

const randomToken = () => {
  const a = new Uint8Array(32);
  crypto.getRandomValues(a);
  return [...a].map(b => b.toString(16).padStart(2, "0")).join("");
};

const readCookie = (request, name) => {
  const raw = request.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
};

const cookie = (name, value, maxAge) =>
  `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;

const siteUrl = (env, url) => (env.SITE_URL || url.origin).replace(/\/$/, "");

/* ---------- 認証状態の取得 ---------- */
async function currentUser(request, env) {
  const sid = readCookie(request, SESSION_COOKIE);
  if (!sid) return null;
  const row = await env.DB.prepare(
    `SELECT u.id, u.name, u.avatar, u.role, u.banned, s.expires_at
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.id = ?`
  ).bind(sid).first();
  if (!row) return null;
  if (row.expires_at < now()) {
    await env.DB.prepare(`DELETE FROM sessions WHERE id = ?`).bind(sid).run();
    return null;
  }
  if (row.banned) return null;
  return { id: row.id, name: row.name, avatar: row.avatar, role: row.role };
}

/* ---------- OAuthプロバイダ定義 ---------- */
const PROVIDERS = {
  discord: {
    authorize: "https://discord.com/api/oauth2/authorize",
    token:     "https://discord.com/api/oauth2/token",
    scope:     "identify",
    idFor:     env => env.DISCORD_CLIENT_ID,
    secretFor: env => env.DISCORD_CLIENT_SECRET,
    async profile(accessToken) {
      const r = await fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!r.ok) return null;
      const u = await r.json();
      return {
        id: u.id,
        name: u.global_name || u.username || "名無し",
        avatar: u.avatar ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128` : null
      };
    }
  },
  google: {
    authorize: "https://accounts.google.com/o/oauth2/v2/auth",
    token:     "https://oauth2.googleapis.com/token",
    scope:     "openid profile",
    idFor:     env => env.GOOGLE_CLIENT_ID,
    secretFor: env => env.GOOGLE_CLIENT_SECRET,
    async profile(accessToken) {
      const r = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!r.ok) return null;
      const u = await r.json();
      return { id: u.sub, name: u.name || "名無し", avatar: u.picture || null };
    }
  }
};

/* ============================================================
   ルーティング
   ============================================================ */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // /api/ 以外は静的ファイルを返す
    if (!url.pathname.startsWith("/api/") && url.pathname !== "/api") {
      return env.ASSETS.fetch(request);
    }
    return handleApi(request, env, url);
  }
};

async function handleApi(request, env, url) {
  const path   = url.pathname.replace(/^\/api\/?/, "").replace(/\/$/, "");
  const method = request.method;

  if (!env.DB) return json({ error: "D1が接続されていません" }, 500);

  // 書き込み系はOriginを検証（CSRF対策）
  if (method !== "GET") {
    const origin = request.headers.get("origin");
    if (origin && origin !== siteUrl(env, url)) return json({ error: "不正なリクエストです" }, 403);
  }

  try {
    if (path === "me"     && method === "GET")  return await handleMe(request, env);
    if (path === "logout" && method === "POST") return await handleLogout(request, env, url);

    let m;
    if ((m = path.match(/^login\/(\w+)$/))    && method === "GET") return handleLogin(m[1], env, url);
    if ((m = path.match(/^callback\/(\w+)$/)) && method === "GET") return await handleCallback(m[1], request, env, url);

    if (path === "posts" && method === "GET")  return await listPosts(request, env, url);
    if (path === "posts" && method === "POST") return await createPost(request, env);

    if ((m = path.match(/^posts\/(\d+)$/)) && method === "DELETE") return await deletePost(+m[1], request, env);
    if (path === "reports" && method === "POST") return await createReport(request, env);

    return json({ error: "見つかりません" }, 404);
  } catch (e) {
    return json({ error: "サーバー側でエラーが発生しました", detail: String(e) }, 500);
  }
}

/* ---------- ログイン開始 ---------- */
function handleLogin(name, env, url) {
  const p = PROVIDERS[name];
  if (!p) return json({ error: "対応していないログイン方法です" }, 400);

  const clientId = p.idFor(env);
  if (!clientId) return json({ error: `${name} の設定がされていません` }, 500);

  const state = randomToken();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${siteUrl(env, url)}/api/callback/${name}`,
    response_type: "code",
    scope: p.scope,
    state
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${p.authorize}?${params}`,
      "Set-Cookie": cookie(STATE_COOKIE, `${name}:${state}`, 600)
    }
  });
}

/* ---------- コールバック ---------- */
async function handleCallback(name, request, env, url) {
  const p = PROVIDERS[name];
  if (!p) return json({ error: "対応していないログイン方法です" }, 400);

  const code  = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const saved = readCookie(request, STATE_COOKIE);

  if (!code || !state || saved !== `${name}:${state}`) {
    return redirectHome(env, url, "auth_failed");
  }

  // 認可コードをアクセストークンに交換
  const body = new URLSearchParams({
    client_id: p.idFor(env),
    client_secret: p.secretFor(env),
    grant_type: "authorization_code",
    code,
    redirect_uri: `${siteUrl(env, url)}/api/callback/${name}`
  });
  const tokenRes = await fetch(p.token, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body
  });
  if (!tokenRes.ok) return redirectHome(env, url, "auth_failed");

  const { access_token } = await tokenRes.json();
  const profile = await p.profile(access_token);
  if (!profile) return redirectHome(env, url, "auth_failed");

  // ユーザー登録 or 更新
  const t = now();
  await env.DB.prepare(
    `INSERT INTO users (provider, provider_id, name, avatar, created_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(provider, provider_id)
     DO UPDATE SET name = excluded.name, avatar = excluded.avatar`
  ).bind(name, profile.id, profile.name.slice(0, 40), profile.avatar, t).run();

  const user = await env.DB.prepare(
    `SELECT id, banned FROM users WHERE provider = ? AND provider_id = ?`
  ).bind(name, profile.id).first();

  if (user.banned) return redirectHome(env, url, "banned");

  // セッション発行
  const sid = randomToken();
  const maxAge = SESSION_DAYS * 86400;
  await env.DB.prepare(
    `INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)`
  ).bind(sid, user.id, t + maxAge, t).run();

  const headers = new Headers({ Location: `${siteUrl(env, url)}/#board` });
  headers.append("Set-Cookie", cookie(SESSION_COOKIE, sid, maxAge));
  headers.append("Set-Cookie", cookie(STATE_COOKIE, "", 0));
  return new Response(null, { status: 302, headers });
}

function redirectHome(env, url, reason) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: `${siteUrl(env, url)}/?error=${reason}#board`,
      "Set-Cookie": cookie(STATE_COOKIE, "", 0)
    }
  });
}

/* ---------- ログイン状態 ---------- */
async function handleMe(request, env) {
  return json({ user: await currentUser(request, env) });
}

async function handleLogout(request, env) {
  const sid = readCookie(request, SESSION_COOKIE);
  if (sid) await env.DB.prepare(`DELETE FROM sessions WHERE id = ?`).bind(sid).run();
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "Set-Cookie": cookie(SESSION_COOKIE, "", 0)
    }
  });
}

/* ---------- 投稿一覧 ---------- */
async function listPosts(request, env, url) {
  const before = parseInt(url.searchParams.get("before") || "0", 10);
  const limit  = Math.min(parseInt(url.searchParams.get("limit") || "30", 10), 50);
  const me     = await currentUser(request, env);

  const sql = `
    SELECT p.id, p.body, p.created_at, u.name, u.avatar, u.id AS user_id
      FROM posts p JOIN users u ON u.id = p.user_id
     WHERE p.deleted = 0 ${before ? "AND p.id < ?" : ""}
     ORDER BY p.id DESC LIMIT ?`;
  const stmt = before
    ? env.DB.prepare(sql).bind(before, limit)
    : env.DB.prepare(sql).bind(limit);

  const { results } = await stmt.all();
  return json({
    posts: results.map(r => ({
      id: r.id, body: r.body, createdAt: r.created_at,
      name: r.name, avatar: r.avatar,
      mine: !!me && me.id === r.user_id
    })),
    canModerate: !!me && me.role === "admin"
  });
}

/* ---------- 投稿 ---------- */
async function createPost(request, env) {
  const me = await currentUser(request, env);
  if (!me) return json({ error: "ログインが必要です" }, 401);

  const { body } = await request.json().catch(() => ({}));
  const text = (body || "").trim();
  if (!text) return json({ error: "本文を入力してください" }, 400);
  if (text.length > POST_MAX_LEN) return json({ error: `${POST_MAX_LEN}文字以内で入力してください` }, 400);

  const last = await env.DB.prepare(
    `SELECT created_at FROM posts WHERE user_id = ? ORDER BY id DESC LIMIT 1`
  ).bind(me.id).first();
  if (last && now() - last.created_at < POST_INTERVAL) {
    return json({ error: "続けて投稿するには少し時間をおいてください" }, 429);
  }

  await env.DB.prepare(
    `INSERT INTO posts (user_id, body, created_at) VALUES (?, ?, ?)`
  ).bind(me.id, text, now()).run();

  return json({ ok: true });
}

/* ---------- 削除（自分の投稿 or 管理者） ---------- */
async function deletePost(id, request, env) {
  const me = await currentUser(request, env);
  if (!me) return json({ error: "ログインが必要です" }, 401);

  const post = await env.DB.prepare(`SELECT user_id FROM posts WHERE id = ?`).bind(id).first();
  if (!post) return json({ error: "投稿が見つかりません" }, 404);
  if (post.user_id !== me.id && me.role !== "admin") return json({ error: "権限がありません" }, 403);

  await env.DB.prepare(`UPDATE posts SET deleted = 1 WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

/* ---------- 通報 ---------- */
async function createReport(request, env) {
  const me = await currentUser(request, env);
  if (!me) return json({ error: "ログインが必要です" }, 401);

  const { postId, reason } = await request.json().catch(() => ({}));
  if (!postId) return json({ error: "対象が指定されていません" }, 400);

  await env.DB.prepare(
    `INSERT OR IGNORE INTO reports (post_id, user_id, reason, created_at) VALUES (?, ?, ?, ?)`
  ).bind(postId, me.id, (reason || "").slice(0, 200), now()).run();

  return json({ ok: true });
}
