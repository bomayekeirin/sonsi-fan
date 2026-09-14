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
  {name:"TITLE 01", sub:"Single / 2026", body:"リリース情報の本文が入ります（仮）。収録曲、プロデューサー、リリース日などを記載します。", links:[{label:"Spotify",url:"#"},{label:"Apple Music",url:"#"},{label:"YouTube",url:"#"}]},
  {name:"TITLE 02", sub:"EP / 2025",     body:"リリース情報の本文が入ります（仮）。", links:[{label:"Spotify",url:"#"},{label:"Apple Music",url:"#"}]},
  {name:"TITLE 03", sub:"Single / 2025", body:"リリース情報の本文が入ります（仮）。", links:[{label:"Spotify",url:"#"}]},
  {name:"TITLE 04", sub:"Single / 2024", body:"リリース情報の本文が入ります（仮）。", links:[{label:"SoundCloud",url:"#"}]}
];

const LIVE = [
  {date:"2026.10.18", venue:"会場名（仮）", city:"TOKYO", url:"#"},
  {date:"2026.11.03", venue:"会場名（仮）", city:"OSAKA", url:"#"}
];

const QA = [
  {q:"このサイトは公式サイトですか？", a:"いいえ。ファンが個人で運営している非公式サイトです。Sonsi本人および関係各所とは一切関係がありません。"},
  {q:"掲載されている情報はどこからのものですか？", a:"公式SNSや各配信サービスなど、公開されている情報をまとめています。最新かつ正確な情報は各公式アカウントをご確認ください。"},
  {q:"情報の間違いを見つけました。", a:"お手数ですが、Xのコミュニティまたはお問い合わせ先までご連絡ください。確認のうえ修正します。"},
  {q:"サイトに情報や写真を掲載してほしい。", a:"権利者の許諾が確認できるもののみ掲載しています。素材の提供やご要望はご連絡ください。"},
  {q:"コミュニティには誰でも参加できますか？", a:"どなたでも参加できます。他のファンが安心して話せる場にするため、参加時のルールに同意いただいています。"}
];
