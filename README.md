# Sonsi FAN SITE（非公式）

https://sonsi-fan.site

## 構成（すべてルート直下・同階層）

| ファイル | 役割 | 触る頻度 |
|---|---|---|
| `index.html` | ページの骨組み・meta情報 | 低 |
| `style.css` | 見た目すべて | 中 |
| `content.js` | NEWS / MUSIC / LIVE / Q&A / SNSリンクのデータ | **高** |
| `app.js` | 描画とメニュー・モーダル等の動作 | 低 |
| `sonsi-logo.png` | ロゴ（白・背景透過） | 低 |
| `ogp.png` | SNSシェア画像 1200x630 | 低 |
| `favicon.png` | ブラウザのタブアイコン | 低 |
| `apple-touch-icon.png` | ホーム画面アイコン | 低 |

1ファイルだけ差し替えれば、その部分だけ更新されます。
文言・情報の追加はほぼ `content.js` だけで完結します。

## content.js の書き方

```js
const NEWS = [
  {date:"2026.09.10", cat:"RELEASE", title:"タイトル", url:"#"},
];
```
- 上にある項目ほど先頭に表示されます
- `cat` は RELEASE / LIVE / MEDIA / SITE
- `LIVE` を `[]`（空）にすると「情報はありません」と表示されます
- 末尾のカンマ、括弧の閉じ忘れに注意（1文字ミスでセクションが空になります）

## 画像を差し替えるとき

画像枠はすべて「（仮）」表示です。`index.html` 内の該当divを
`<img src="ファイル名.jpg" alt="">` に置き換えてください。

- KEY VISUAL … `.hero__kv`
- ARTIST PHOTO … `.about__img`
- ARTWORK … `.disc__art`
- VIDEO … `#video` 内にYouTube埋め込みのサンプルをコメントで記載
- IG … `.ig__cell`

## キャッシュ対策

`style.css` `app.js` `content.js` を更新しても画面が変わらないときは、
`index.html` の読み込み部分の `?v=1` を `?v=2` `?v=3` と増やしてください。

```html
<link rel="stylesheet" href="style.css?v=2">
<script src="content.js?v=2"></script>
```

## 未設定のリンク

- Discord招待リンク（index.html の COMMUNITY セクション）
- Xコミュニティ（同上）
- 各SNSの実URL（content.js の `SNS`）

## 注意

非公式ファンサイトです。アーティスト写真・ジャケット・歌詞・音源は、
許諾が取れたものか各サービスの公式埋め込み機能のみを使用してください。
