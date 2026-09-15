/* ============================================================
   CONTENT ── ここを書き換えるだけで各セクションが更新されます
   ============================================================ */
const SNS = [
  {name:"Instagram", handle:"@sonsi", url:"https://www.instagram.com/", icon:"ig"},
  {name:"X",         handle:"@sonsi", url:"https://x.com/",             icon:"x"},
  {name:"YouTube",   handle:"Sonsi",  url:"https://www.youtube.com/",   icon:"yt"},
  {name:"TikTok",    handle:"@sonsi", url:"https://www.tiktok.com/",    icon:"tt"},
  {name:"Spotify",   handle:"Sonsi",  url:"https://open.spotify.com/",  icon:"sp"},
  {name:"Apple Music", handle:"Sonsi",url:"https://music.apple.com/",   icon:"am"}
];

const NEWS = [
  {date:"2026.09.10", cat:"RELEASE", title:"新曲「（タイトル未定）」配信開始（仮）", url:"#"},
  {date:"2026.09.02", cat:"LIVE",    title:"ライブ出演情報を公開しました（仮）", url:"#"},
  {date:"2026.08.24", cat:"MEDIA",   title:"インタビュー記事が公開（仮）", url:"#"},
  {date:"2026.08.11", cat:"SITE",    title:"非公式ファンサイトを公開しました（仮）", url:"#"}
];

const MUSIC = [
  {
    name: "ニセモノ",
    sub: "1st Album / 2026.06.10",
    art: "jk-nisemono.jpeg",
    note: "全曲Koshyプロデュース。STUTS、Watsonが参加した全8曲。",
    tracks: [
      "BBA in da House",
      "Koshy Freestyle (feat. Watson)",
      "ニセモノ",
      "OYJ",
      "思い通り",
      "もったいないじゃん",
      "KANOYA",
      "OYJ (Remix) (feat. Watson)"
    ],
    links: [
      {label:"Apple Music",   url:"https://music.apple.com/jp/album/6772952116?ls=1&app=music&at=1l3vpUI&ct=LFV_6db0b3fb0503b63a69816a7a60b706b2&itscg=30440&itsct=catchall_p1&lId=215947485&cId=none&sr=1&src=Linkfire"},
      {label:"Spotify",       url:"https://open.spotify.com/album/5W2uqjQruJyKWFfsnGMZ6h"},
      {label:"LINE MUSIC",    url:"https://music.line.me/webapp/album/mb00000000055d276d"},
      {label:"Amazon Music",  url:"http://music.amazon.co.jp/albums/B0H2VRV2N7?tag=lf_wmj-22&ie=UTF8&linkCode=as2&ascsubtag=6db0b3fb0503b63a69816a7a60b706b2&ref=dmm_acq_soc_jp_u_lfire_lp_x_6db0b3fb0503b63a69816a7a60b706b2"},
      {label:"YouTube Music", url:"https://music.youtube.com/playlist?list=OLAK5uy_lPCmy-rJm5NIZxG745rVjS04jPlU-f4Bw&src=Linkfire&lId=0fb7c053-5f44-4f94-94c4-00997d7603ad&cId=d3d58fd7-4c47-11e6-9fd0-066c3e7a8751"}
    ]
  },
  {
    name: "BBA Spice",
    sub: "Single / 2026.07.29 — Sonsi & STUTS",
    art: "jk-bbaspice.jpeg",
    note: "「RAPSTAR 2025」で話題を呼んだ楽曲のスペシャルバージョン。",
    tracks: ["BBA Spice"],
    links: [
      {label:"Apple Music",   url:"https://www.tunecore.co.jp/to/apple_music/1860477"},
      {label:"Spotify",       url:"https://www.tunecore.co.jp/to/spotify/1860477"},
      {label:"YouTube Music", url:"https://www.tunecore.co.jp/to/youtube_music_key/1860477"},
      {label:"LINE MUSIC",    url:"https://www.tunecore.co.jp/to/line/1860477"}
    ]
  }
];

/* ライブ・出演情報
   date … "YYYY-MM-DD"（この日付を過ぎると自動でPASTへ移動します）
   img  … フライヤー画像。不要なら空文字
   url  … チケットや詳細ページ。不要なら空文字 */
const LIVE = [
  {
    date:"2026-09-23",
    title:"CIRCUS × CIRCUS ODAIBA",
    venue:"お台場青海地区P区画",
    city:"TOKYO",
    note:"開場・開演 10:00",
    img:"",
    url:"https://eplus.jp/sf/detail/2950550004-P0030012P021001?P1=0175"
  },
  {
    date:"2026-07-08",
    title:"Sonsi 単独公演『ホンモノ』",
    venue:"Spotify O-EAST",
    city:"TOKYO",
    note:"",
    img:"live-honmono.jpeg",
    url:""
  }
];

const QA = [
  {q:"このサイトは公式サイトですか？", a:"いいえ。ファンが個人で運営している非公式サイトです。Sonsi本人および関係各所とは一切関係がありません。"},
  {q:"掲載されている情報はどこからのものですか？", a:"公式SNSや各配信サービスなど、公開されている情報をまとめています。最新かつ正確な情報は各公式アカウントをご確認ください。"},
  {q:"情報の間違いを見つけました。", a:"お手数ですが、Xのコミュニティまたはお問い合わせ先までご連絡ください。確認のうえ修正します。"},
  {q:"サイトに情報や写真を掲載してほしい。", a:"権利者の許諾が確認できるもののみ掲載しています。素材の提供やご要望はご連絡ください。"},
  {q:"コミュニティには誰でも参加できますか？", a:"どなたでも参加できます。他のファンが安心して話せる場にするため、参加時のルールに同意いただいています。"}
];

/* 動画
   id    … YouTubeのURL末尾。https://youtu.be/XXXX の XXXX 部分
   title … 表示タイトル
   date  … "YYYY-MM-DD"。この日付で自動的に新しい順へ並びます */
const VIDEOS = [
  {id:"_DTzIilcqxc", title:"Sonsi - 思い通り (Official Video)", date:"2026-07-14"},
  {id:"lEAXRI-PtEA", title:"Sonsi, Watson - Koshy Freestyle (Official Video)", date:"2026-06-16"},
  {id:"HiSAuO-KW-4", title:"Sonsi - KANOYA (Official Video)", date:"2026-06-11"},
  {id:"Tmkhsiysva8", title:"Watson, Sonsi - Real Love (Live at 日本武道館)", date:"2026-04-28"},
  {id:"bQ2q8xxE79E", title:"Watson, Sonsi - Real Love (Official Video)", date:"2026-04-22"},
  {id:"v0LIoEpZc38", title:"Sonsi - もったいないじゃん (Official Video)", date:"2026-04-01"},
  {id:"P5gMCLOTekg", title:"Sonsi - OYJ (Official Video)", date:"2026-02-18"},
  {id:"DznBr5sBEF0", title:"【Sonsi】RAPSTAR 2025 FINALS｜「BBA Spice」ライブパフォーマンス", date:"2025-12-18"},
  {id:"Qv_SjeEEww8", title:"Sonsi【地元密着・新曲披露】RAPSTAR 2025【HOOD STAGE】", date:"2025-11-01"}
];
