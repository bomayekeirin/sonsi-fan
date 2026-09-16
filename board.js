/* ============================================================
   BOARD ── ファン掲示板（ログイン必須）
   APIは /api/* （functions/api/[[path]].js）が処理します
   ============================================================ */
(() => {
  const root = document.getElementById("board");
  if (!root) return;

  const auth   = document.getElementById("boardAuth");
  const form   = document.getElementById("boardForm");
  const input  = document.getElementById("boardInput");
  const submit = document.getElementById("boardSubmit");
  const count  = document.getElementById("boardCount");
  const list   = document.getElementById("boardList");
  const notice = document.getElementById("boardNotice");
  const MAX = 500;

  let me = null;
  let canModerate = false;

  const api = async (path, options = {}) => {
    const res = await fetch(path, {
      credentials: "same-origin",
      headers: options.body ? { "content-type": "application/json" } : undefined,
      ...options
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "通信に失敗しました");
    return data;
  };

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

  const ago = ts => {
    const d = Math.floor(Date.now() / 1000) - ts;
    if (d < 60)    return "たった今";
    if (d < 3600)  return `${Math.floor(d / 60)}分前`;
    if (d < 86400) return `${Math.floor(d / 3600)}時間前`;
    if (d < 604800) return `${Math.floor(d / 86400)}日前`;
    return new Date(ts * 1000).toLocaleDateString("ja-JP");
  };

  const say = (msg, isError = false) => {
    notice.textContent = msg || "";
    notice.classList.toggle("is-error", isError);
  };

  /* ---------- 表示の切り替え ---------- */
  const renderAuth = () => {
    if (me) {
      auth.innerHTML = `
        <div class="board__me">
          ${me.avatar ? `<img src="${esc(me.avatar)}" alt="">` : `<span class="board__noavatar"></span>`}
          <span class="board__myname">${esc(me.name)}</span>
          <button class="board__logout" id="boardLogout">ログアウト</button>
        </div>`;
      document.getElementById("boardLogout").addEventListener("click", logout);
      form.hidden = false;
    } else {
      auth.innerHTML = `
        <p class="board__lead">書き込みにはログインが必要です。閲覧は誰でもできます。</p>
        <div class="board__login">
          <a class="btn btn--fill" href="/api/login/google">Googleでログイン</a>
        </div>`;
      form.hidden = true;
    }
  };

  const renderPosts = posts => {
    if (!posts.length) {
      list.innerHTML = `<p class="board__empty">まだ投稿がありません。最初のひとことをどうぞ。</p>`;
      return;
    }
    list.innerHTML = posts.map(p => `
      <article class="post" data-id="${p.id}">
        <div class="post__head">
          ${p.avatar ? `<img class="post__avatar" src="${esc(p.avatar)}" alt="">` : `<span class="post__avatar"></span>`}
          <span class="post__name">${esc(p.name)}</span>
          <time class="post__time">${ago(p.createdAt)}</time>
        </div>
        <p class="post__body">${esc(p.body)}</p>
        <div class="post__acts">
          ${p.mine || canModerate ? `<button data-act="delete">削除</button>` : ""}
          ${!p.mine && me ? `<button data-act="report">通報</button>` : ""}
        </div>
      </article>`).join("");
  };

  /* ---------- 通信 ---------- */
  const loadMe = async () => {
    try { me = (await api("/api/me")).user; }
    catch { me = null; }
    renderAuth();
  };

  const loadPosts = async () => {
    try {
      const data = await api("/api/posts");
      canModerate = data.canModerate;
      renderPosts(data.posts);
    } catch (e) {
      list.innerHTML = `<p class="board__empty">投稿を読み込めませんでした。時間をおいて再読み込みしてください。</p>`;
    }
  };

  const logout = async () => {
    await api("/api/logout", { method: "POST" }).catch(() => {});
    me = null;
    renderAuth();
    loadPosts();
  };

  /* ---------- 投稿 ---------- */
  input.addEventListener("input", () => {
    count.textContent = `${input.value.length} / ${MAX}`;
    count.classList.toggle("is-over", input.value.length > MAX);
  });

  submit.addEventListener("click", async () => {
    const body = input.value.trim();
    if (!body) { say("本文を入力してください", true); return; }
    if (body.length > MAX) { say(`${MAX}文字以内で入力してください`, true); return; }

    submit.disabled = true;
    say("送信中…");
    try {
      await api("/api/posts", { method: "POST", body: JSON.stringify({ body }) });
      input.value = "";
      count.textContent = `0 / ${MAX}`;
      say("");
      await loadPosts();
    } catch (e) {
      say(e.message, true);
    } finally {
      submit.disabled = false;
    }
  });

  /* ---------- 削除・通報 ---------- */
  list.addEventListener("click", async e => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const id = btn.closest(".post").dataset.id;

    if (btn.dataset.act === "delete") {
      if (!confirm("この投稿を削除します。元に戻せません。")) return;
      try { await api(`/api/posts/${id}`, { method: "DELETE" }); await loadPosts(); }
      catch (err) { say(err.message, true); }
    }

    if (btn.dataset.act === "report") {
      const reason = prompt("通報の理由を入力してください（任意）");
      if (reason === null) return;
      try {
        await api("/api/reports", { method: "POST", body: JSON.stringify({ postId: +id, reason }) });
        say("通報を受け付けました。確認します。");
      } catch (err) { say(err.message, true); }
    }
  });

  /* ---------- 起動 ---------- */
  const params = new URLSearchParams(location.search);
  if (params.get("error") === "auth_failed") say("ログインに失敗しました。もう一度お試しください。", true);
  if (params.get("error") === "banned")      say("このアカウントは利用が制限されています。", true);

  loadMe().then(loadPosts);
})();
