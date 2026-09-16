/* ============================================================
   CONTENT ── ここを書き換えるだけで各セクションが更新されます
   ============================================================ */
const SNS = [
  {name:"Instagram",   handle:"@ta_sonsi",       url:"https://www.instagram.com/ta_sonsi",  icon:"ig"},
  {name:"X",           handle:"@takenakasonsi__", url:"https://x.com/takenakasonsi__",      icon:"x"},
  {name:"TikTok",      handle:"@sonsi1230",      url:"https://www.tiktok.com/@sonsi1230",   icon:"tt"},
  {name:"YouTube",     handle:"@takenakasonsi",  url:"https://youtube.com/@takenakasonsi",  icon:"yt"},
  {name:"Spotify",     handle:"Sonsi",           url:"https://open.spotify.com/intl-ja/artist/6YoXFM2OoA3Bn1SUeFnf7r", icon:"sp"},
  {name:"Apple Music", handle:"Sonsi",           url:"https://music.apple.com/jp/artist/sonsi/1872630257", icon:"am"}
];

/* ニュース（上にあるものほど新しい順で表示されます）
   cat … RELEASE / LIVE / VIDEO / MEDIA / 出演 / SITE
   url … 記事のURL。空にするとリンクなしで表示されます */
const NEWS = [
  {date:"2026.08.28", cat:"出演", title:"「CIRCUS × CIRCUS ODAIBA」追加出演者が発表。Sonsiを含む全17組のラインナップが確定", url:"https://news.yahoo.co.jp/articles/53b6913d8955b5255f5fa7f4dfcbef7eded7e8e1"},
  {date:"2026.08.26", cat:"出演", title:"「SPOOKY PUMPKIN 2026」出演アーティスト第2弾が発表。Sonsiを含む全74組が出そろう", url:"https://news.yahoo.co.jp/articles/1d3d0db3968497cf41b56206f5ee40786d2e8833"},
  {date:"2026.07.29", cat:"RELEASE", title:"Sonsi & STUTS「BBA Spice」配信リリース。「RAPSTAR 2025」で披露された楽曲に2ndバースを追加", url:"https://kai-you.net/article/96109"},
  {date:"2026.06.16", cat:"VIDEO",   title:"「Koshy Freestyle feat. Watson」ミュージックビデオ公開", url:"https://natalie.mu/music/news/676445"},
  {date:"2026.06.12", cat:"LIVE",    title:"単独公演「ホンモノ」東京公演の完売を受け、地元・鹿児島での追加公演が決定", url:"https://natalie.mu/music/news/675954"},
  {date:"2026.05.13", cat:"RELEASE", title:"1stアルバム「ニセモノ」のリリースと、初の単独公演「ホンモノ」開催を発表", url:"https://natalie.mu/music/news/671754"},
  {date:"2026.01.16", cat:"MEDIA",   title:"Koshyとアルバムを制作中であることを明かす", url:"https://natalie.mu/music/news/656489"}
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
      {label:"Apple Music", logo:"svc-applemusic.png", url:"https://music.apple.com/jp/album/6772952116?ls=1&app=music&at=1l3vpUI&ct=LFV_6db0b3fb0503b63a69816a7a60b706b2&itscg=30440&itsct=catchall_p1&lId=215947485&cId=none&sr=1&src=Linkfire"},
      {label:"Spotify", logo:"svc-spotify.png", url:"https://open.spotify.com/album/5W2uqjQruJyKWFfsnGMZ6h"},
      {label:"LINE MUSIC", logo:"svc-linemusic.png", url:"https://music.line.me/webapp/album/mb00000000055d276d"},
      {label:"Amazon Music", logo:"svc-amazon.png", url:"http://music.amazon.co.jp/albums/B0H2VRV2N7?tag=lf_wmj-22&ie=UTF8&linkCode=as2&ascsubtag=6db0b3fb0503b63a69816a7a60b706b2&ref=dmm_acq_soc_jp_u_lfire_lp_x_6db0b3fb0503b63a69816a7a60b706b2"},
      {label:"YouTube Music", logo:"svc-ytmusic.png", url:"https://music.youtube.com/playlist?list=OLAK5uy_lPCmy-rJm5NIZxG745rVjS04jPlU-f4Bw&src=Linkfire&lId=0fb7c053-5f44-4f94-94c4-00997d7603ad&cId=d3d58fd7-4c47-11e6-9fd0-066c3e7a8751"}
    ]
  },
  {
    name: "BBA Spice",
    sub: "Single / 2026.07.29 — Sonsi & STUTS",
    art: "jk-bbaspice.jpeg",
    note: "「RAPSTAR 2025」で話題を呼んだ楽曲のスペシャルバージョン。",
    tracks: ["BBA Spice"],
    links: [
      {label:"Apple Music", logo:"svc-applemusic.png", url:"https://www.tunecore.co.jp/to/apple_music/1860477"},
      {label:"Spotify", logo:"svc-spotify.png", url:"https://www.tunecore.co.jp/to/spotify/1860477"},
      {label:"YouTube Music", logo:"svc-ytmusic.png", url:"https://www.tunecore.co.jp/to/youtube_music_key/1860477"},
      {label:"LINE MUSIC", logo:"svc-linemusic.png", url:"https://www.tunecore.co.jp/to/line/1860477"}
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
  {q:"サイトに情報や写真を掲載してほしい。", a:"権利者の許諾が確認できるもののみ掲載しています。素材の提供やご要望はご連絡ください。"}
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

/* 本人の投稿（InstagramとTikTokを混ぜて、日付の新しい順に自動で並びます）
   type … "ig"（Instagram）か "tt"（TikTok）
   url  … 投稿ページのURL。?stkn= や ?is_from= などのパラメータは消してOK
   date … "YYYY-MM-DD"。24時間以内ならNEWバッジが点滅します */
const SOCIAL_POSTS = [
  {type:"tt", url:"https://www.tiktok.com/@sonsi1230/video/7667598144275795208", date:"2026-07-29"},
  {type:"ig", url:"https://www.instagram.com/reel/DbV0EWIPaKU/", date:"2026-07-29"},
  {type:"ig", url:"https://www.instagram.com/p/DbLA2ZIgFCx/", date:"2026-07-24"},
  {type:"ig", url:"https://www.instagram.com/reel/DaxW_3-ADHg/", date:"2026-07-14"},
  {type:"ig", url:"https://www.instagram.com/reel/DaC4ivPgCTD/", date:"2026-06-26"},
  {type:"ig", url:"https://www.instagram.com/p/DZpIbzoFLQS/", date:"2026-06-16"},
  {type:"ig", url:"https://www.instagram.com/p/DZe1oFegjjI/", date:"2026-06-12"},
  {type:"ig", url:"https://www.instagram.com/reel/DZcQPV2gO9L/", date:"2026-06-11"},
  {type:"ig", url:"https://www.instagram.com/reel/DZXpFZXPv5B/", date:"2026-06-10"},
  {type:"ig", url:"https://www.instagram.com/p/DYRzy8VPVKX/", date:"2026-05-13"},
  {type:"ig", url:"https://www.instagram.com/p/DYRxgnbAKaT/", date:"2026-05-13"},
  {type:"ig", url:"https://www.instagram.com/reel/DXjfgMSktxm/", date:"2026-04-25"},
  {type:"ig", url:"https://www.instagram.com/reel/DXbZ-yODn35/", date:"2026-04-22"},
  {type:"ig", url:"https://www.instagram.com/p/DXZenV6D2QA/", date:"2026-04-22"},
  {type:"ig", url:"https://www.instagram.com/reel/DWlgUG9j5nN/", date:"2026-04-01"},
  {type:"ig", url:"https://www.instagram.com/p/DWi6EGYj1IV/", date:"2026-03-31"},
  {type:"ig", url:"https://www.instagram.com/reel/DU7W4Ghj8Mp/", date:"2026-02-19"},
  {type:"ig", url:"https://www.instagram.com/p/DUUuSR8D04p/", date:"2026-02-04"},
  {type:"ig", url:"https://www.instagram.com/p/DUUuNJFD0gD/", date:"2026-02-04"},
  {type:"tt", url:"https://www.tiktok.com/@sonsi1230/video/7662323931554123015", date:"2026-07-14"},
  {type:"tt", url:"https://www.tiktok.com/@sonsi1230/video/7655729957427039506", date:"2026-06-27"},
  {type:"tt", url:"https://www.tiktok.com/@sonsi1230/video/7651932940774968594", date:"2026-06-17"},
  {type:"tt", url:"https://www.tiktok.com/@sonsi1230/video/7650075834933366023", date:"2026-06-11"},
  {type:"tt", url:"https://www.tiktok.com/@sonsi1230/video/7649411765582777607", date:"2026-06-10"},
  {type:"tt", url:"https://www.tiktok.com/@sonsi1230/video/7648222122237594887", date:"2026-06-06"},
];
