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

  // ホームでは最新数件だけを表示する（data-limit で件数を指定）
  const LIMIT   = parseInt(root.dataset.limit || "0", 10);
  const COMPACT = LIMIT > 0;

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
    if (!notice) return;
    notice.textContent = msg || "";
    notice.classList.toggle("is-error", isError);
  };

  /* ---------- 表示の切り替え ---------- */
  const renderAuth = () => {
    if (!auth || !form) return;
    if (me) {
      auth.innerHTML = `
        <div class="board__me">
          ${me.avatar ? `<img src="${esc(me.avatar)}" alt="">` : `<span class="board__noavatar"></span>`}
          <span class="board__myname">${esc(me.name)}</span>
          <button class="board__rename" id="boardRename">表示名を変更</button>
          <button class="board__logout" id="boardLogout">ログアウト</button>
        </div>
        <div class="board__name" id="boardName" ${me.needsName ? "" : "hidden"}>
          <p class="board__namelead">${me.needsName
            ? "掲示板で表示される名前を決めてください。本名を出したくない場合は、好きな名前で構いません。"
            : "新しい表示名を入力してください。"}</p>
          <div class="board__namerow">
            <input id="boardNameInput" class="board__nameinput" type="text" maxlength="20"
              placeholder="表示名（20文字以内）" value="${esc(me.displayName || "")}">
            <button id="boardNameSave" class="board__submit">決定</button>
          </div>
        </div>`;
      document.getElementById("boardLogout").addEventListener("click", logout);
      document.getElementById("boardRename").addEventListener("click", () => {
        const box = document.getElementById("boardName");
        box.hidden = !box.hidden;
      });
      document.getElementById("boardNameSave").addEventListener("click", saveName);
      form.hidden = !!me.needsName;   // 表示名を決めるまで投稿できない
    } else {
      auth.innerHTML = `
        <p class="board__lead">書き込みにはログインが必要です。閲覧は誰でもできます。</p>
        <div class="board__login">
          <button class="gsi-material-button" id="googleLogin">
            <div class="gsi-material-button-state"></div>
            <div class="gsi-material-button-content-wrapper">
              <div class="gsi-material-button-icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style="display:block">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span class="gsi-material-button-contents">Google でログイン</span>
            </div>
          </button>
        </div>`;
      document.getElementById("googleLogin").addEventListener("click", () => {
        location.href = "/api/login/google";
      });
      form.hidden = true;
    }
  };

  const renderPosts = all => {
    const posts = COMPACT ? all.slice(0, LIMIT) : all;
    if (!posts.length) {
      list.innerHTML = `<p class="board__empty">まだ投稿がありません。最初のひとことをどうぞ。</p>`;
      return;
    }
    list.innerHTML = posts.map(p => `
      <article class="post${p.pinned ? " is-pinned" : ""}" data-id="${p.id}">
        ${p.pinned ? '<span class="post__pin">固定</span>' : ""}
        <div class="post__head">
          ${p.avatar ? `<img class="post__avatar" src="${esc(p.avatar)}" alt="">` : `<span class="post__avatar"></span>`}
          <span class="post__name">${esc(p.name)}</span>
          <time class="post__time">${ago(p.createdAt)}</time>
        </div>
        ${p.body ? `<p class="post__body">${esc(p.body)}</p>` : ""}
        ${p.image ? `<a class="post__img" href="${esc(p.image)}" target="_blank" rel="noopener">
          <img src="${esc(p.image)}" alt="" loading="lazy"></a>` : ""}
        ${COMPACT ? "" : `<div class="post__acts">
          ${p.mine || canModerate ? `<button data-act="delete">削除</button>` : ""}
          ${canModerate ? `<button data-act="pin">${p.pinned ? "固定を解除" : "先頭に固定"}</button>` : ""}
          ${!p.mine && me ? `<button data-act="report">通報</button>` : ""}
        </div>`}
      </article>`).join("");
  };

  /* ---------- 通信 ---------- */
  const loadMe = async () => {
    try { me = (await api("/api/me")).user; }
    catch { me = null; }
    renderAuth();
  };

  const renderUploader = () => {
    const box = document.getElementById("boardUpload");
    if (!box) return;
    box.hidden = !canModerate;
    if (!canModerate || box.dataset.ready) return;
    box.dataset.ready = "1";
    box.innerHTML = `
      <label class="board__file">
        画像を添付
        <input type="file" id="boardFile" accept="image/png,image/jpeg,image/webp,image/gif" hidden>
      </label>
      <div id="boardPreview" class="board__preview"></div>`;
    document.getElementById("boardFile").addEventListener("change", e => {
      const f = e.target.files[0];
      const pv = document.getElementById("boardPreview");
      pv.innerHTML = f ? `<img src="${URL.createObjectURL(f)}" alt=""><span>${esc(f.name)}</span>` : "";
    });
  };

  const loadPosts = async () => {
    try {
      const data = await api("/api/posts");
      canModerate = data.canModerate;
      renderUploader();
      renderPosts(data.posts);
    } catch (e) {
      list.innerHTML = `<p class="board__empty">投稿を読み込めませんでした。時間をおいて再読み込みしてください。</p>`;
    }
  };

  const saveName = async () => {
    const el = document.getElementById("boardNameInput");
    const displayName = el.value.trim();
    if (!displayName) { say("表示名を入力してください", true); return; }
    try {
      const r = await api("/api/profile", { method: "POST", body: JSON.stringify({ displayName }) });
      me.name = r.name; me.displayName = r.name; me.needsName = false;
      renderAuth();
      say("表示名を変更しました");
      await loadPosts();
    } catch (e) { say(e.message, true); }
  };

  const logout = async () => {
    await api("/api/logout", { method: "POST" }).catch(() => {});
    me = null;
    renderAuth();
    loadPosts();
  };

  /* ---------- 投稿 ---------- */
  if (input && submit) {
  input.addEventListener("input", () => {
    count.textContent = `${input.value.length} / ${MAX}`;
    count.classList.toggle("is-over", input.value.length > MAX);
  });

  submit.addEventListener("click", async () => {
    const body = input.value.trim();
    const fileEl = document.getElementById("boardFile");
    const file = fileEl && fileEl.files[0];
    if (!body && !file) { say("本文を入力してください", true); return; }
    if (body.length > MAX) { say(`${MAX}文字以内で入力してください`, true); return; }

    submit.disabled = true;
    say("送信中…");
    try {
      let image = null;
      if (file) {
        say("画像を送信中…");
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd, credentials: "same-origin" });
        const up = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(up.error || "画像を送信できませんでした");
        image = up.key;
      }
      await api("/api/posts", { method: "POST", body: JSON.stringify({ body, image }) });
      input.value = "";
      if (fileEl) { fileEl.value = ""; const pv = document.getElementById("boardPreview"); if (pv) pv.innerHTML = ""; }
      count.textContent = `0 / ${MAX}`;
      say("");
      await loadPosts();
    } catch (e) {
      say(e.message, true);
    } finally {
      submit.disabled = false;
    }
  });
  }

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

    if (btn.dataset.act === "pin") {
      try { await api(`/api/posts/${id}/pin`, { method: "POST" }); await loadPosts(); }
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
