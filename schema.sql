-- Sonsi FAN SITE 掲示板用スキーマ
-- Cloudflare ダッシュボード > D1 > 該当DB > Console にこの内容を貼って実行

CREATE TABLE IF NOT EXISTS users (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  provider     TEXT    NOT NULL,          -- 'discord' | 'google'
  provider_id  TEXT    NOT NULL,          -- 各サービス側のユーザーID
  name         TEXT    NOT NULL,          -- サイト内表示名
  avatar       TEXT,                      -- アイコンURL（無ければNULL）
  role         TEXT    NOT NULL DEFAULT 'user',   -- 'user' | 'admin'
  banned       INTEGER NOT NULL DEFAULT 0,
  created_at   INTEGER NOT NULL,
  UNIQUE (provider, provider_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id          TEXT    PRIMARY KEY,        -- ランダム64文字
  user_id     INTEGER NOT NULL,
  expires_at  INTEGER NOT NULL,
  created_at  INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS posts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL,
  body        TEXT    NOT NULL,
  deleted     INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);

CREATE TABLE IF NOT EXISTS reports (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id     INTEGER NOT NULL,
  user_id     INTEGER NOT NULL,
  reason      TEXT,
  created_at  INTEGER NOT NULL,
  UNIQUE (post_id, user_id)
);

-- 自分を管理者にする（初回ログイン後に、自分のidを確認してから実行）
-- SELECT id, provider, name FROM users;
-- UPDATE users SET role = 'admin' WHERE id = 1;

-- 通報の多い投稿を確認する
-- SELECT p.id, p.body, COUNT(r.id) AS n FROM posts p
--   JOIN reports r ON r.post_id = p.id
--   WHERE p.deleted = 0 GROUP BY p.id ORDER BY n DESC;
