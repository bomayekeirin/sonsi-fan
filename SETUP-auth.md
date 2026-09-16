# 掲示板セットアップ手順（Worker版）

sonsi-fan は Pages ではなく **Worker** として動いています。
この手順どおりに進めれば、掲示板が使えるようになります。

## 0. アップロードするファイル

| ファイル | 扱い | 置き場所 |
|---|---|---|
| `wrangler.jsonc` | 新規。Workerの設定 | ルート直下 |
| `worker.js` | 新規。API本体 | ルート直下 |
| `.assetsignore` | 新規。公開しないファイルの指定 | ルート直下 |
| `board.js` | 新規。掲示板の画面側 | ルート直下 |
| `schema.sql` | 新規。D1に貼り付ける用 | ルート直下 |
| `index.html` / `style.css` | 差し替え | ルート直下 |

`functions/` フォルダを作っていた場合は削除してください。Worker形式では使いません。

GitHubで先頭がドットのファイル（`.assetsignore`）を作るには、
Add file → Create new file でファイル名に `.assetsignore` と入力します。

**注意**：`wrangler.jsonc` の `database_id` は手順1のあとに書き換えます。
先にアップロードするとデプロイが失敗するので、手順1〜2を済ませてからにしてください。

## 1. D1データベースを作る

1. Cloudflare → ストレージとデータベース → D1 → 作成
2. 名前は `sonsi`
3. 作成後の画面に表示される **データベースID** を控える
4. そのDBの「コンソール」に `schema.sql` の中身を貼って実行

## 2. wrangler.jsonc を書き換える

`"database_id": "ここにD1のデータベースIDを貼る"` の部分を、
手順1で控えたIDに置き換えてからアップロードしてください。

## 3. Googleのクライアントを作る

1. Google Cloud Console → APIとサービス → OAuth同意画面
   - User Type: 外部 / 公開
   - スコープの追加は不要（openid, profile のみ使用）
2. 認証情報 → OAuthクライアントID → ウェブアプリケーション
   - 承認済みのJavaScript生成元: `https://sonsi-fan.site`
   - 承認済みのリダイレクトURI: `https://sonsi-fan.site/api/callback/google`
3. クライアントIDとシークレットを控える

## 4. （後回し）LINEログインを足すとき

LINE Developersでプロバイダーとチャネルを作り、コールバックURLに
`https://sonsi-fan.site/api/callback/line` を登録します。
worker.js の `PROVIDERS` にLINEの定義を足せば、同じ仕組みで動きます。
Googleで問題なく回るようになってから着手してください。

## 5. 環境変数を登録する

Cloudflare → Workers & Pages → sonsi-fan → 設定 → 変数とシークレット
**すべて「シークレット」として登録**してください。

| 名前 | 値 |
|---|---|
| `GOOGLE_CLIENT_ID` | 手順3のID |
| `GOOGLE_CLIENT_SECRET` | 手順3のSecret |
| `SITE_URL` | `https://sonsi-fan.site` |

登録後、デプロイ一覧から再デプロイしてください。環境変数は再デプロイで反映されます。

## 6. 自分を管理者にする

1. サイトで一度ログインする
2. D1のコンソールで `SELECT id, provider, name FROM users;`
3. 自分のidを確認して `UPDATE users SET role = 'admin' WHERE id = 1;`

管理者は全員の投稿を削除できるようになります。

## 動作の仕組み

- `/api/` で始まるリクエストだけ `worker.js` が処理し、それ以外は通常のファイルを返す
- ログインはGoogleに飛ばし、戻ってきたらセッションIDをCookieで発行
- CookieはHttpOnly・Secure・SameSite=Laxなので、JSから盗めず、他サイトからの投稿もできない
- 閲覧は誰でも可。投稿・削除・通報はログイン必須
- 連投は30秒に1回、本文は500文字まで
- 削除は論理削除なので、D1側から復元できる

## つまずきやすい点

- **デプロイが失敗する**：`wrangler.jsonc` の `database_id` が未設定
- **redirect_uri_mismatch**：登録URLと1文字でも違うと出る。httpsか、末尾スラッシュの有無を確認
- **ログイン後に戻ってこない**：`SITE_URL` の設定漏れ、または末尾スラッシュ
- **500エラー**：D1バインディングの名前が `DB` になっているか確認
- **環境変数を変えたのに直らない**：再デプロイが必要

## 運用の注意

投稿は誰でも読めます。荒れたときの削除は運営者の責任です。
通報機能はありますが通知は飛ばないので、D1のコンソールで定期的に確認してください。

```sql
SELECT p.id, p.body, COUNT(r.id) AS n FROM posts p
  JOIN reports r ON r.post_id = p.id
  WHERE p.deleted = 0 GROUP BY p.id ORDER BY n DESC;
```
