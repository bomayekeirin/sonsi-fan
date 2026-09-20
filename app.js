/* ============================================================
   ICONS
   ============================================================ */
const ICONS = {
  ig:'<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.71-2.13 1.38C1.34 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.71 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.71-1.46-1.38-2.13C21.32 1.34 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z"/><path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/><circle cx="18.41" cy="5.59" r="1.44"/>',
  x :'<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.67l7.73-8.84L1.25 2.25h6.82l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.11z"/>',
  yt:'<path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12z"/>',
  tt:'<path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.7a5.68 5.68 0 0 0-.77-.05 5.66 5.66 0 1 0 5.66 5.66V8.99a7.35 7.35 0 0 0 4.29 1.37V7.27a4.29 4.29 0 0 1-3.21-1.45z"/>',
  sp:'<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.28a.75.75 0 0 1-1.03.25c-2.82-1.72-6.36-2.11-10.54-1.16a.75.75 0 1 1-.33-1.46c4.57-1.05 8.49-.6 11.65 1.34.35.22.46.68.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.79c4.36-1.32 9.78-.68 13.49 1.6.44.27.58.85.32 1.28zm.13-3.4C15.25 8.31 8.9 8.1 5.2 9.22a1.12 1.12 0 1 1-.65-2.15c4.25-1.29 11.26-1.04 15.7 1.59a1.12 1.12 0 0 1-1.14 1.94z"/>',
  am:'<path d="M17.5 2.2 8.3 4.1c-.5.1-.8.5-.8 1v9.6a3.2 3.2 0 0 0-1.3-.3c-1.6 0-2.9 1.1-2.9 2.5S4.6 19.4 6.2 19.4s2.9-1.1 2.9-2.5V8.5l7.4-1.5v6.1a3.2 3.2 0 0 0-1.3-.3c-1.6 0-2.9 1.1-2.9 2.5s1.3 2.5 2.9 2.5 2.9-1.1 2.9-2.5V3.2c0-.7-.6-1.2-1.3-1z"/>'
};
const svg = k => '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'+ICONS[k]+'</svg>';
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// 日付表示の共通フォーマット
const fmtDate = iso => {
  const [y,m,d] = iso.split('-');
  return `${y}.${m}.${d}`;
};

/* ============================================================
   RENDER
   ============================================================ */
// SNS（メニュー・フッター）
const snsHtml = SNS.map(s =>
  `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${esc(s.name)}">${svg(s.icon)}</a>`).join('');
menuSns.innerHTML = snsHtml;
footSns.innerHTML = snsHtml;
const headSns = document.getElementById('headSns');
if (headSns) headSns.innerHTML = snsHtml;

// UPDATES（Instagram / TikTok を日付順に混ぜて表示）
//  各社の埋め込み専用URLを直接iframeで読む。公式スクリプトは使わないので、
//  高さをこちらで固定でき、読み込みタイミングにも左右されない。
const igRail = document.getElementById('igRail');
if (igRail && typeof SOCIAL_POSTS !== 'undefined') {
  const posts = [...SOCIAL_POSTS].sort((a,b) => (b.date || '').localeCompare(a.date || ''));

  // 投稿の種類ごとの横幅。カードの高さは共通なので、この幅で中身の収まりが決まる
  const WIDTH = { ttVideo: 268, igReel: 236, igPost: 304 };

  const embedOf = p => {
    if (p.type === 'tt') {
      const id = (p.url.match(/video\/(\d+)/) || [])[1] || '';
      return { src: `https://www.tiktok.com/embed/v2/${id}`, w: p.w || WIDTH.ttVideo };
    }
    const code = (p.url.match(/\/(?:p|reel|tv)\/([\w-]+)/) || [])[1] || '';
    const isReel = /\/reel\//.test(p.url);
    return {
      src: `https://www.instagram.com/p/${code}/embed`,
      w: p.w || (isReel ? WIDTH.igReel : WIDTH.igPost)
    };
  };

  if (!posts.length) {
    igRail.innerHTML = '<p class="upd__empty">投稿を準備中です。</p>';
  } else {
    const dayAgo = Date.now() - 86400000;
    igRail.innerHTML = posts.map(p => {
      const isNew = p.date && new Date(p.date + 'T00:00:00').getTime() >= dayAgo;
      const e = embedOf(p);
      return `
      <div class="upd__slide" style="width:${e.w}px">
        <div class="upd__meta">
          ${svg(p.type === 'tt' ? 'tt' : 'ig')}
          <span class="upd__date">${p.date ? fmtDate(p.date) : ''}</span>
          ${isNew ? '<span class="upd__new">NEW</span>' : ''}
        </div>
        <div class="upd__window">
          <iframe src="${e.src}" loading="lazy" scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowfullscreen title="投稿"></iframe>
        </div>
      </div>`;
    }).join('');
  }
}

// NEWS
newsList.innerHTML = NEWS.map(n => {
  const inner = `
    <div class="news__meta">
      <span class="news__date">${esc(n.date)}</span>
      <span class="news__cat">${esc(n.cat)}</span>
    </div>
    <p class="news__title">${esc(n.title)}</p>`;
  return n.url
    ? `<a class="news__item" href="${n.url}" target="_blank" rel="noopener">${inner}</a>`
    : `<div class="news__item">${inner}</div>`;
}).join('');

// MUSIC
discGrid.innerHTML = MUSIC.map((m,i) => `
  <button class="disc__card" data-i="${i}">
    <div class="disc__art">${m.art
      ? `<img src="${esc(m.art)}" alt="${esc(m.name)}">`
      : `ARTWORK（仮）`}
      ${m.badge ? `<span class="disc__badge">${esc(m.badge)}</span>` : ''}
    </div>
    <p class="disc__name">${esc(m.name)}${
      m.release ? `<span class="disc__release">${esc(m.release)}</span>` : ''}</p>
    <p class="disc__sub">${esc(m.sub)}</p>
  </button>`).join('');

// VIDEO
const videoList = document.getElementById('videoList');
if (videoList && typeof VIDEOS !== 'undefined') {
  // 公開日の新しい順に並べ替える（日付が無いものは末尾）
  const sorted = [...VIDEOS].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  videoList.innerHTML = sorted.map(v => `
    <article class="vid" data-id="${esc(v.id)}">
      <button class="vid__thumb" aria-label="${esc(v.title || '動画')}を再生">
        <img src="https://i.ytimg.com/vi/${esc(v.id)}/maxresdefault.jpg"
             onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg'"
             alt="" loading="lazy">
        <span class="vid__play" aria-hidden="true"></span>
      </button>
      <div class="vid__meta">
        ${v.title ? `<p class="vid__title">${esc(v.title)}</p>` : ''}
        ${v.date ? `<p class="vid__date">${fmtDate(v.date)}</p>` : ''}
        <a class="vid__ext" href="https://youtu.be/${esc(v.id)}" target="_blank" rel="noopener">YouTubeで見る</a>
      </div>
    </article>`).join('');

  // サムネイルを押した時点でプレイヤーに差し替える（初期表示を軽くするため）
  videoList.addEventListener('click', e => {
    const btn = e.target.closest('.vid__thumb');
    if (!btn) return;
    const card = btn.closest('.vid');
    const id = card.dataset.id;
    const frame = document.createElement('div');
    frame.className = 'vid__player';
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0"
      title="YouTube" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>`;
    btn.replaceWith(frame);
  });
}

// LIVE（日付で自動的に UPCOMING / PAST に振り分け、それぞれ並べ替える）
const liveCard = (l, past) => `
  <article class="lv${past ? ' is-past' : ''}">
    ${l.img ? `<div class="lv__img"><img src="${esc(l.img)}" alt="" loading="lazy"></div>` : ''}
    <div class="lv__body">
      <p class="lv__date">${fmtDate(l.date)}${past ? '<span class="lv__end">終了</span>' : ''}</p>
      <p class="lv__title">${esc(l.title)}</p>
      <p class="lv__venue">${esc(l.venue)}<span class="lv__city">${esc(l.city)}</span></p>
      ${l.note ? `<p class="lv__note">${esc(l.note)}</p>` : ''}
      ${l.url ? `<a class="lv__link" href="${l.url}" target="_blank" rel="noopener">チケット・詳細</a>` : ''}
    </div>
  </article>`;

const today = new Date().toISOString().slice(0,10);
const upcoming = LIVE.filter(l => l.date >= today).sort((a,b) => a.date < b.date ? -1 : 1);
const past     = LIVE.filter(l => l.date <  today).sort((a,b) => a.date > b.date ? -1 : 1);

liveList.innerHTML = `
  <div class="lv__group">
    <p class="lv__head">UPCOMING<span>今後の予定</span></p>
    ${upcoming.length
      ? upcoming.map(l => liveCard(l, false)).join('')
      : '<p class="live__empty">現在、公開されている出演予定はありません。</p>'}
  </div>
  ${past.length ? `
  <div class="lv__group">
    <p class="lv__head">PAST<span>終了した公演</span></p>
    ${past.map(l => liveCard(l, true)).join('')}
  </div>` : ''}`;

// MEDIA
mediaGrid.innerHTML = SNS.map(s => `
  <a class="media__card" href="${s.url}" target="_blank" rel="noopener">
    ${svg(s.icon)}
    <div>
      <p class="media__name">${esc(s.name)}</p>
      <p class="media__handle">${esc(s.handle)}</p>
    </div>
  </a>`).join('');


// Q&A
qaList.innerHTML = QA.map((item,i) => `
  <div class="qa__item">
    <button class="qa__q" aria-expanded="false" aria-controls="qa-a-${i}">${esc(item.q)}</button>
    <div class="qa__a" id="qa-a-${i}"><p>${esc(item.a)}</p></div>
  </div>`).join('');

/* ============================================================
   BEHAVIOR
   ============================================================ */
// スプラッシュ → メイン画面への段階的な移行
//  1. 大ロゴをしばらく見せる
//  2. ゆっくりフェードアウトし、ヘッダーと黒い背景だけが残る
//  3. 少し置いてから、ヒーローのロゴ・タグライン・キービジュアルが同時に浮かび上がる
document.body.classList.add('is-loading');
window.addEventListener('load', () => {
  setTimeout(() => {
    splash.classList.add('is-out');                 // フェードアウト 1.0秒
    document.body.classList.remove('is-locked');
    setTimeout(() => {
      splash.remove();
      document.body.classList.remove('is-loading'); // ヒーローが浮かび上がる
    }, 1000);
  }, 1200);
});

// メニュー
const toggleMenu = open => {
  menu.classList.toggle('is-open', open);
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  document.body.classList.toggle('is-locked', open);
};
burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('is-open')));
menu.querySelectorAll('.menu__nav a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// ヒーロー背面の帯を、ヘッダー直下からキービジュアルの少し下までに合わせる
const heroBg = document.getElementById('heroBg');
const heroKv = document.querySelector('.hero__kv');
const fitHeroBg = () => {
  if (!heroBg || !heroKv) return;
  const hero = heroBg.parentElement.getBoundingClientRect();
  const kv = heroKv.getBoundingClientRect();
  const top = parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue('--head-h')) || 56;
  heroBg.style.height = Math.max(0, (kv.bottom - hero.top) - top + 22) + 'px';
};
fitHeroBg();
window.addEventListener('resize', fitHeroBg);
window.addEventListener('load', fitHeroBg);
if (heroKv) {
  const kvImg = heroKv.querySelector('img');
  if (kvImg) kvImg.addEventListener('load', fitHeroBg);
}

// ヘッダー背景 / スティッキーCTA
const heroLogo = document.querySelector('.hero__logo');
const onScroll = () => {
  const y = window.scrollY;
  head.classList.toggle('is-solid', y > 40);
  cta.classList.toggle('is-show', y > window.innerHeight * .8);
  // ヒーローの大ロゴが画面上端より上に出たらヘッダーをロゴ表示に切り替える。
  // 境界でのちらつきを防ぐため、切り替えと戻りに余白（ヒステリシス）を持たせる
  if (heroLogo) {
    const bottom = heroLogo.getBoundingClientRect().bottom;
    const shown = document.body.classList.contains('logo-in-head');
    if (!shown && bottom <= -48) document.body.classList.add('logo-in-head');
    else if (shown && bottom >= 24) document.body.classList.remove('logo-in-head');
  }
};
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

// Q&A アコーディオン
qaList.addEventListener('click', e => {
  const btn = e.target.closest('.qa__q');
  if(!btn) return;
  const item = btn.parentElement;
  const panel = btn.nextElementSibling;
  const open = item.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', open);
  panel.style.maxHeight = open ? panel.scrollHeight + 'px' : 0;
});

// MUSIC モーダル
const openModal = i => {
  const m = MUSIC[i];
  modalArt.innerHTML = (m.art
    ? `<img src="${esc(m.art)}" alt="${esc(m.name)}">`
    : 'ARTWORK（仮）')
    + (m.badge ? `<span class="disc__badge">${esc(m.badge)}</span>` : '');
  modalName.innerHTML = esc(m.name)
    + (m.release ? `<span class="disc__release">${esc(m.release)}</span>` : '');
  modalSub.textContent = m.sub;

  const tracks = (m.tracks || []).length
    ? `<ol class="tracklist">${m.tracks.map(t => `<li>${esc(t)}</li>`).join('')}</ol>`
    : '';
  modalBody.innerHTML = (m.note ? `<p class="modal__note">${esc(m.note)}</p>` : '') + tracks;

  const inner = l => l.logo
    ? `<img class="svc__logo" src="${esc(l.logo)}" alt="${esc(l.label)}">`
    : `<span class="svc__name">${esc(l.label)}</span>`;

  modalLinks.innerHTML = `
    <p class="modal__linkhead">${m.soon ? '配信予定' : '配信中'}</p>
    <div class="svc">${(m.links || []).map(l => (m.soon || !l.url)
      ? `<span class="svc__card is-soon" aria-disabled="true"
           aria-label="${esc(l.label)}（配信開始までお待ちください）">${inner(l)}</span>`
      : `<a class="svc__card" href="${l.url}" target="_blank" rel="noopener"
           aria-label="${esc(l.label)}で聴く">${inner(l)}</a>`).join('')}</div>
    ${m.soon ? '<p class="svc__soonnote">配信開始後にリンクが有効になります。</p>' : ''}
    ${m.embed ? `<div class="svc__embed">
      <iframe src="${esc(m.embed)}" width="300" height="600" loading="lazy"
        title="${esc(m.name)} の試聴・配信リンク"></iframe>
    </div>` : ''}`;
  modal.classList.add('is-open');
  document.body.classList.add('is-locked');
  modalClose.focus();
};
const closeModal = () => {
  modal.classList.remove('is-open');
  document.body.classList.remove('is-locked');
};
discGrid.addEventListener('click', e => {
  const card = e.target.closest('.disc__card');
  if(card) openModal(+card.dataset.i);
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => {
  if(e.key !== 'Escape') return;
  closeModal();
  if(menu.classList.contains('is-open')) toggleMenu(false);
});
