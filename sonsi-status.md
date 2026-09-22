# sonsi-status

Sonsi 非公式ファンサイト（sonsi-fan.site）の現状と経緯の記録。
チャットを引き継ぐときは、このファイルを渡せば前提がそろう。

- 作成：2026-09-21（0→1 の完了時点）
- 更新ルール：仕様変更・機能追加・設定変更・トラブル対応があったら、該当章を書き換え、末尾の「変更履歴」に1行追記する
- 注意：GitHubリポジトリは Public。**シークレット（OAuthのシークレット等）は絶対に書かない**

---

## 1. プロジェクト概要

| 項目 | 内容 |
|---|---|
| 対象 | ラッパー Sonsi（2004年生まれ、鹿児島県鹿屋市出身） |
| 性質 | ファンが個人で運営する非公式サイト。本人・事務所・レーベルとは無関係 |
| URL | https://sonsi-fan.site |
| 掲示板 | https://sonsi-fan.site/board |
| 運営者 | ボンバイエ（連絡先 bomayekeirin@gmail.com ※規約・ポリシーに掲載済み） |
| ベンチマーク | https://popyours.jp/goldenagetour（黒背景・白文字のミニマル構成） |
| リポジトリ | GitHub `sonsi-fan`（Public） |

---

## 2. 運用ルール（必ず守る）

1. **全ファイルをリポジトリのルート直下に置く**。フォルダは作らない
2. **1ファイル単位で差し替えられる構成**を保つ
3. **更新はスマホのGitHubウェブUIから**行う。アップロード＝自動デプロイ
4. **画像の拡張子は `.jpeg` に統一**（`.jpg` との不一致で表示されない事故があった）
5. **Cloudflareダッシュボードのコードエディタで保存しない**。Git連携が壊れ、静的配信の設定が消える
6. 成果物はダウンロード用のファイルカードで受け渡す
7. `compatibility_date` に**未来の日付を入れない**（デプロイが失敗する）

---

## 3. インフラ構成

### ドメイン・DNS
- お名前.comで取得 → ネームサーバーを Cloudflare に移管済み
- 移管時に残っていたお名前.comの A レコード（150.95.255.38）は削除済み
- お名前.com由来の MX / NS / TXT レコードが残っている（未使用。害はないので放置中）

### Cloudflare
- **Pages ではなく Worker**（Workers Builds による Git 連携）
- Worker 名：`sonsi-fan`
- `/api/*` だけを `worker.js` が処理し、それ以外は静的ファイルとして配信
- 設定は `wrangler.jsonc` が正。ダッシュボードで追加したバインディングは使わない

| バインディング | 種類 | 内容 |
|---|---|---|
| `ASSETS` | 静的ファイル | リポジトリ直下（`.assetsignore` で除外指定） |
| `DB` | D1 | データベース名 `sonsi` / ID `79e2a445-0ea3-40c6-926c-b98d7b710606` |
| `MEDIA` | R2 | バケット `sonsi-media`（掲示板の管理者画像用。有効化にカード登録が必要だった） |

### 環境変数（Cloudflare → sonsi-fan → 設定 → 変数とシークレット）
すべて「シークレット」として登録済み。**値はここに書かない。**

| 名前 | 用途 |
|---|---|
| `GOOGLE_CLIENT_ID` | Googleログイン |
| `GOOGLE_CLIENT_SECRET` | Googleログイン |
| `SITE_URL` | `https://sonsi-fan.site`（末尾スラッシュなし） |

環境変数を変えたら再デプロイが必要（デプロイタブ → 最新の「…」→ 再試行）。

### Google
- **OAuth**（Google Auth Platform）：アプリ名 Sonsi FAN SITE、公開ステータスは本番環境
  - 承認済みドメイン：`sonsi-fan.site`
  - リダイレクトURI：`https://sonsi-fan.site/api/callback/google`
  - プライバシーポリシー：`/privacy.html` ／ 利用規約：`/terms.html`
- **Search Console**：ドメインプロパティで登録済み。`https://sonsi-fan.site/sitemap.xml` 送信済み、インデックス登録リクエスト済み
  - 「代替ページ（適切な canonical タグあり）」の通知は想定どおり（`/board.html` → `/board` など）。対応不要

---

## 4. ファイル構成（すべてルート直下）

### ページ
| ファイル | 役割 |
|---|---|
| `index.html` | トップページ。セクションの骨組み、meta、凹み文字用のSVGフィルター |
| `board.html` | 掲示板の単独ページ（`/board` で開く）。タイトル「Sonsiファン掲示板」 |
| `privacy.html` | プライバシーポリシー（2026-09-16制定） |
| `terms.html` | 利用規約（2026-09-16制定） |

### スクリプト・スタイル
| ファイル | 役割 | 触る頻度 |
|---|---|---|
| `content.js` | 掲載データすべて（SNS / NEWS / MUSIC / LIVE / Q&A / VIDEOS / SOCIAL_POSTS） | **高** |
| `app.js` | トップページの描画と動作 | 低 |
| `board.js` | 掲示板のフロント。ホームの簡易表示（3件）と `/board` のフル版を両対応 | 低 |
| `style.css` | 全スタイル | 中 |
| `worker.js` | API本体（`/api/*`） | 低 |

### 設定・データベース
| ファイル | 役割 |
|---|---|
| `wrangler.jsonc` | Worker 設定（名前、互換日、アセット、D1、R2） |
| `.assetsignore` | 公開しないファイルの指定（`.git`、`worker.js`、設定、手順書など） |
| `schema.sql` | D1 の初期テーブル定義 |
| `migrate-01.sql` | 追加列（表示名・固定・画像）。実行済み |
| `robots.txt` / `sitemap.xml` / `site.webmanifest` | 検索エンジン・ホーム画面追加用 |
| `sonsi-status.md` | このファイル |

### 画像
| ファイル | 用途 |
|---|---|
| `sonsi-logo.png` | ロゴ（白・透過） |
| `kv-main.jpeg` / `artist-main.jpeg` | キービジュアル / ABOUT |
| `bg-skull.png` | ヒーロー背景のドクロ柄タイル（1280×768、逆さドクロ混在版） |
| `jk-fusuma.jpeg` / `jk-nisemono.jpeg` / `jk-bbaspice.jpeg` | ジャケット |
| `live-xx.jpeg` / `live-playground.jpeg` / `live-circus.jpeg` / `live-honmono.jpeg` | LIVEのフライヤー |
| `ogp.jpeg` | トップのシェア画像（1200×630） |
| `ogp-board.jpeg` | 掲示板のシェア画像（1200×630） |
| `favicon.png` / `apple-touch-icon.png` / `icon-192.png` / `icon-512.png` | アイコン（黒地にSonsiロゴ＋unofficial fansite） |
| `svc-*.png` | 配信サービスのロゴ（spotify / applemusic / linemusic / amazon / ytmusic） |

### 使われていない（残置）
- `ogp.png`（旧シェア画像。`ogp.jpeg` に置き換え済み）
- `README.md` / `SETUP-auth.md`（初期の手順書。内容が古い。**このファイルが正**）

---

## 5. サイト構成

### トップページのセクション順（メニューも同順）
**ABOUT → MUSIC → LIVE → VIDEO → NEWS → BOARD → UPDATES → MEDIA → Q&A**

- COMMUNITY セクションは削除済み（Discord招待・Xコミュニティの導線は無し）
- MEDIA 下部の Instagram 仮6枠は削除済み
- BOARD は最新3件のみ表示＋「掲示板をひらく」ボタン。メニューの BOARD と下部固定の「掲示板を見る」は `/board` へ
- 下部固定ボタン：「最新はInstagram」「掲示板を見る」

### フッター
免責文（3段落）、プライバシーポリシー・利用規約へのリンク、`sonsi-fan.site / UNOFFICIAL`

---

## 6. デザイン仕様

### テーマカラー（2026-09-21 決定）
**白・黒・ライトグリーンの3色**。緑は差し色として「新着」「注目」に絞って使う。

```css
--bg:#000;
--fg:#fff;
--accent:#8dff3a;          /* ライトグリーン */
--accent-rgb:141,255,58;   /* 発光など半透明用 rgba(var(--accent-rgb), .5) */
```
緑は必ず変数経由で使う（直書きしない）。

### フォント
- 英字見出し：Anton
- 日本語：Noto Sans JP（本文 500、見出し的要素 700）
- 作品タイトルは本文フォント 700

### ローディングとヘッダー
- 大ロゴ表示 1.2s → 0.9s でフェードアウト → 2.2s でドクロ背景がゆっくり出現 → 2.5s でロゴ・タグ・KVが出現 → 4.5s 頃に完成
- ヘッダー初期は「⚠️ 非公式ファンサイト」を左寄せ。ヒーローの大ロゴ下端が画面上端を 48px 超えたらロゴへ切替（戻りは 24px）
- ヒーロー背面のドクロ柄：opacity .3、52s で横スライド。`background-size:auto 200px` と `bgDrift -333px` は必ずセットで変える

### NEWバッジ（MUSICのジャケット）
- 位置：ジャケット左上の角に半分乗る（top/left -11px）。ジャケット枠は `overflow:visible`
- 背景 `--accent`、角丸 3px、文字 Anton 14px・字間 .2em
- 1.6s 周期で点滅。発光は控えめ（最大 18px）
- 文字色も連動：バッジが明るいとき `#555`、暗いとき `#000`
- 文字の凹みは SVG フィルター `#badgeInset`（`index.html` 内）で表現。CSS の `text-shadow` では凹みにならない
- `content.js` の MUSIC に `badge:"NEW"` で表示

### NEWS の NEW 表示
- 日付の左に文字のみの NEW（`--accent`、1.6s 点滅）
- **公開から7日以内に自動表示**（`app.js` の `NEWS_NEW_DAYS`）。`isNew:true` で手動表示も可

### その他
- 配信前の作品：`soon:true` で配信リンクをグレーアウト・押下不可、見出しは「配信予定」
- 発売予定の赤字：`release:"9/23配信開始"`（#ff4242）
- 大ロゴとKV画像に黒の drop-shadow。「UNOFFICIAL FAN SITE」は黒箱を背面に配置
- MUSIC のジャケットは `.disc__card` を flex 化して上揃え
- Google ログインボタンは Google 公式マークアップ（ダークテーマ `.gsi-material-button`）。**ブランドガイドライン準拠のため変更不可**

---

## 7. 掲載データ（content.js）の現状

| データ | 件数・内容 |
|---|---|
| SNS | Instagram @ta_sonsi / X @takenakasonsi__ / TikTok @sonsi1230 / YouTube @takenakasonsi / Spotify / Apple Music |
| MUSIC | FUSUMA（EP、配信前）/ ニセモノ（1st Album 2026.06.10、全8曲）/ BBA Spice（Single 2026.07.29、Sonsi & STUTS） |
| LIVE | 2026-11-26 〈XX〉BABYWOODROSE / Sonsi（WWW X）/ 2026-10-04 PLAYGROUND（北九州）/ 2026-09-23 CIRCUS × CIRCUS ODAIBA / 2026-07-08 単独公演『ホンモノ』（終了） |
| NEWS | 10件（最新 2026.09.20 FUSUMA） |
| VIDEOS | YouTube 9本（日付降順に自動ソート） |
| SOCIAL_POSTS | Instagram 18件 + TikTok 7件（日付順に混合） |
| Q&A | 4項目 |

### データの書き方

**NEWS**（**配列の順に表示される。日付で自動ソートされないので、日付順の位置に挿入する**。タグは RELEASE / LIVE / VIDEO / MEDIA / 出演 / SITE）
```js
{date:"2026.09.20", cat:"出演", title:"見出し", url:"https://..."},
```
- `url` を空にするとリンクなしで表示
- フェス出演は「出演」タグ。ラインナップに名前が載っているだけの記事でも、コンテンツ確保のため掲載する方針
- Yahoo!ニュースのURLは配信期間後に消える。可能なら配信元（ナタリー等）のURLを使う
- 終了済みイベントの記事は載せない

**LIVE**（日付で UPCOMING / PAST に自動振り分け）
```js
{date:"2026-10-04", title:"イベント名", venue:"会場", city:"FUKUOKA",
 note:"開場 15:30 / 開演 16:00", img:"live-xxx.jpeg", url:"https://..."},
```

**MUSIC**
```js
{name:"作品名", sub:"EP / 2026.09.23", art:"jk-xxx.jpeg",
 badge:"NEW", release:"9/23配信開始", soon:true,
 embed:"https://linkco.re/embed/xxxx",
 tracks:["曲1","曲2"],
 links:[{label:"Spotify", logo:"svc-spotify.png", url:"https://..."}, ...]}
```

**SOCIAL_POSTS**（公式スクリプトは使わず、埋め込み専用URLを直接iframe）
```js
{type:"ig", url:"https://www.instagram.com/p/コード/", date:"2026-07-24"},
{type:"tt", url:"https://www.tiktok.com/@sonsi1230/video/動画ID", date:"2026-07-29"},
```
- カード高さ 430px 固定、幅は種類別（IG写真 304 / IGリール 236 / TikTok 268）。`w:280` で個別指定可
- TikTok は短縮リンク（vt.tiktok.com）では動画IDが取れない。**ウェブ版の「埋め込みコードをコピー」から `data-video-id` を拾う**
- 24時間以内の投稿は NEW バッジ

---

## 8. 掲示板

### 仕様
- 閲覧は誰でも、投稿は **Google ログイン必須**（Discord のコードは残置、UIからは削除）
- ログインのたびにアカウント選択画面を出す（`prompt=select_account`）
- **表示名**：初回ログイン時に入力必須（20文字以内）。決めるまで投稿不可。「表示名を変更」でいつでも変更可
- 本文 500 文字まで、連投は 30 秒に1回（管理者は対象外）
- 削除は論理削除（D1 から復元可）、通報機能あり（通知は飛ばない）
- **先頭固定**：管理者のみ。固定投稿は左に白線＋「固定」バッジ、常に最上部。ホームの3件にも入る
- **画像添付**：管理者のみ。jpg / png / webp / gif、5MB、1投稿1枚。R2 に保存し `/api/img/{key}` で配信
- 動画添付は非対応（リスク判断により見送り）
- 投稿本文は HTML を無効化して表示。**埋め込みコードは掲示板に貼れない**（安全のための仕様）
- セッション：HttpOnly / Secure / SameSite=Lax の Cookie、30日

### API（worker.js）
| メソッド | パス | 内容 |
|---|---|---|
| GET | `/api/me` | ログイン状態 |
| GET | `/api/login/google` | ログイン開始 |
| GET | `/api/callback/google` | ログイン戻り先 |
| POST | `/api/logout` | ログアウト |
| POST | `/api/profile` | 表示名の設定 |
| GET / POST | `/api/posts` | 投稿一覧 / 投稿 |
| DELETE | `/api/posts/:id` | 削除 |
| POST | `/api/posts/:id/pin` | 固定の切替（管理者） |
| POST | `/api/reports` | 通報 |
| POST | `/api/upload` | 画像アップロード（管理者） |
| GET | `/api/img/:key` | 画像配信 |

### テーブル
- `users`：id, provider, provider_id, name, display_name, avatar, role, banned, created_at
- `sessions`：id, user_id, expires_at, created_at
- `posts`：id, user_id, body, deleted, created_at, pinned, image
- `reports`：id, post_id, user_id, reason, created_at

### 管理用SQL（D1 のコンソール）
D1 のコンソールは**複数文をまとめて実行できないことがある。1文ずつ実行する。**

```sql
-- 管理者の設定（id=1 が運営者。設定済み）
UPDATE users SET role = 'admin' WHERE id = 1;

-- ユーザー一覧
SELECT id, provider, name, display_name, role FROM users;

-- 通報の多い投稿
SELECT p.id, p.body, COUNT(r.id) AS n FROM posts p
  JOIN reports r ON r.post_id = p.id
  WHERE p.deleted = 0 GROUP BY p.id ORDER BY n DESC;

-- 列の確認
SELECT name FROM pragma_table_info('posts');
```

---

## 9. 過去のトラブルと教訓

| 症状 | 原因 | 対処・教訓 |
|---|---|---|
| APIが動かない | 当初 Pages Functions 形式（`functions/`）で書いていたが、実体は Worker だった | `worker.js` + `wrangler.jsonc` 形式に作り直し |
| デプロイ失敗 | `compatibility_date` が未来日付 | 過去の日付にする（現在 `2026-09-14`） |
| `.git` の中身が公開されていた | `.assetsignore` の書き漏れ | `.git` `.wrangler` 等を除外に追加 |
| カスタムドメインを追加できない | お名前.com由来の A レコードが残っていた | ルートの A レコードを削除 |
| サイトマップ送信が無効 | ドメインプロパティでは相対パス不可 | 完全なURLで送信 |
| ダッシュボードで `env.ASSETS` エラー | コードエディタのプレビューではアセットが渡らない | 本番は正常。エディタは使わない |
| `no such table: users` | `schema.sql` 未実行 | D1 コンソールで実行 |
| ログイン後に元の画面へ戻される／投稿が読めない | `migrate-01.sql` の列追加が未反映（複数文の一括実行が失敗） | ALTER を1文ずつ実行 |
| ログアウト後も同じGoogleアカウントで入ってしまう | Google 側のログイン状態が残るため | `prompt=select_account` を追加 |
| 画像が表示されない | `.jpg` と `.jpeg` の不一致 | 拡張子を `.jpeg` に統一 |
| UPDATES の埋め込みが崩れる | 公式スクリプトの再処理不全と高さ実測の不安定さ | 埋め込み専用URLを直接iframe、高さ固定 |

### 取得できない情報源
ナタリー、Yahoo!ニュース、TikTok、YouTube はアシスタント側から直接読めない（bot拒否）。情報はスクリーンショットや埋め込みコードで受け取る。

---

## 10. 残タスク

### 期日あり
- [ ] **FUSUMA 配信開始（2026-09-23）後の切替**。各ストアのリンクを受け取ってから作業
  - `content.js` の FUSUMA から `release` と `soon` を削除し、`links` に各URLを入れる
  - `badge:"NEW"` はしばらく残すか相談して決める
  - 埋め込み（linkco.re）は向こう側で自動的に切り替わる

### 要確認
- [ ] **〈XX〉11/26 の開場・開演時刻**：フライヤーは OPEN 18:30 / START 19:30、WWW公式ページは 19:00 / 20:00 と食い違っている。現在はフライヤーの時刻で掲載中
- [ ] **〈XX〉のNEWS日付**：公式の発表日が未確認。先行受付の開始日（2026-09-18）で仮置き

### 保留
- [ ] **ABOUT のプロフィール本文**：公式プロフィール文が届くまで保留
  - ASD・ADHD の公表について：本人が番組内で公表し「自虐が俺の美学」と表現の核にしている。書く場合は属性紹介ではなく「自ら公表し表現に変えている」順序で。障害等級は記載しない

### 未着手
- [ ] LINE ログインの追加（`worker.js` の `PROVIDERS` に定義を足す。コールバックは `/api/callback/line`）
- [ ] Q&A に掲示板関連の項目を追加（例：書き込みにログインは必要か）
- [ ] NEWS の RSS 自動取得（音楽ナタリーのアーティスト別フィードを Worker で定期取得し D1 にキャッシュ。見出しと日付のみ表示）
- [ ] 別アカウントでのログイン検証（一般ユーザーとしての初回フロー、管理者からの削除ボタン表示）
- [ ] お名前.com 由来の未使用 DNS レコード（MX / NS / TXT）の整理
- [ ] 残置ファイル（`ogp.png`、`README.md`、`SETUP-auth.md`）の削除

### 検討事項
- MUSIC / LIVE / VIDEO / NEWS は JavaScript で描画しているため、Google 以外のクローラーには中身が読まれにくい。検索順位を見てから対策を判断する
- 問い合わせ先がメールアドレス公開のため迷惑メールの可能性。気になれば専用アドレスか問い合わせフォームに変更

---

## 11. 変更履歴

新しいものを上に追記する。
※ 2026-09-17 以前の日付は作成時にチャット記録から推定したもので、1日程度前後する可能性がある。

| 日付 | 内容 |
|---|---|
| 2026-09-22 | LIVE・NEWS に〈XX〉BABYWOODROSE / Sonsi（2026-11-26 WWW X）を追加 |
| 2026-09-21 | `sonsi-status.md` を作成（0→1 完了時点の記録） |
| 2026-09-21 | テーマカラーを白・黒・#8dff3a に決定。緑を CSS 変数 `--accent` に集約 |
| 2026-09-21 | NEW バッジを調整（黒文字・点滅連動の濃淡・SVG による凹み文字・角に半分乗る位置）。NEWS に NEW 表示（7日以内） |
| 2026-09-20 | EP「FUSUMA」を配信前掲載（NEW バッジ、配信リンクのグレーアウト、linkco.re 埋め込み） |
| 2026-09-17〜20 | LIVE に PLAYGROUND・CIRCUS × CIRCUS のフライヤーを追加 |
| 2026-09-17 | 掲示板を `/board` に分離。表示名・先頭固定・管理者の画像添付を追加。R2 導入 |
| 2026-09-16 | Google ログインで掲示板が稼働。プライバシーポリシー・利用規約を制定。アイコン類を更新 |
| 2026-09-15 | Worker 形式に移行し、D1 と API を稼働。独自ドメイン接続、Search Console 登録 |
| 〜2026-09-14 | サイト本体の構築（各セクション、デザイン、掲載データ） |
