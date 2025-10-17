# OutingSuggestionApp

LaravelとDockerを使用したAPIアプリケーション

## 初回セットアップ手順

### 1. リポジトリをクローン
```bash
git clone https://github.com/vantan-production/OutingSuggestionApp.git
cd OutingSuggestionApp
```

### 2. Dockerコンテナを起動
```bash
docker-compose up -d
```

初回は5〜15分程度かかります。

### 3. コンテナの起動確認
```bash
docker-compose ps
```

全てのコンテナが `Up` になっていることを確認：

### 4. 依存関係をインストール
```bash
docker-compose exec app composer install
```

### 5. 環境変数ファイルを設定
```bash
# .env.exampleをコピー
cp src/.env.example src/.env
```

### 6. アプリケーションキーを生成
```bash
docker-compose exec app php artisan key:generate
```

### 7. データベースマイグレーション
```bash
docker-compose exec app php artisan migrate
```

### 8. Laravelサーバーを起動
```bash
docker-compose exec app php artisan serve --host=0.0.0.0 --port=8000
```

停止したい場合は `Ctrl+C` を押してください。

### 9. ブラウザでアクセス

- **Laravel**: http://localhost:8000
- **phpMyAdmin**: http://localhost:8080
  - サーバー: `db`
  - ユーザー名: `root`
  - パスワード: `root`

Laravelのウェルカム画面が表示されれば成功です！

---

## 日常的な作業フロー

### 作業開始時
```bash
# 1. 最新のコードを取得
git pull origin main

# 2. Dockerコンテナを起動
docker-compose up -d

# 3. Laravelサーバーを起動
docker-compose exec app php artisan serve --host=0.0.0.0 --port=8000
```

### 作業中

別のターミナルウィンドウを開いて作業してください。Laravelサーバーは起動したままにしておきます。

### 作業終了時
```bash
# 1. Laravelサーバーを停止（サーバー起動中のターミナルで Ctrl+C）

# 2. Dockerコンテナを停止
docker-compose down
```

---

## よく使うコマンド

### Dockerコマンド
```bash
# コンテナの状態確認
docker-compose ps

# コンテナのログ確認
docker-compose logs app
docker-compose logs db

# コンテナ内に入る
docker-compose exec app bash
docker-compose exec db bash

# コンテナを再起動
docker-compose restart

# コンテナを停止
docker-compose down

# コンテナを停止してイメージも削除
docker-compose down --rmi all --volumes
```

### データベース操作
```bash
# MySQLに接続
docker-compose exec db mysql -u laravel -plaravel laravel

# または、phpMyAdminを使用
# ブラウザで http://localhost:8080 にアクセス
```
---

## 開発ガイドライン

開発時のブランチ戦略、コミットメッセージ規則などは、[CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

---

## 使用技術

- **PHP**: 8.2
- **Laravel**: 10.x
- **MySQL**: 8.0
- **Docker**: latest
- **Docker Compose**: latest
- **phpMyAdmin**: latest
