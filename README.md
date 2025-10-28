# Lala-Next

おでかけ提案アプリ（Next.js + Laravel フルスタック）

## 初回セットアップ手順

### 1. リポジトリをクローン
```bash
git clone https://github.com/your-org/Lala-Next.git
cd Lala-Next
```

### 2. 依存関係をインストール

#### フロントエンド（Next.js）の依存関係

```bash
docker compose  run back bash
php artisan migrate
No
npm install
exit
```

#### バックエンド（Laravel）の依存関係
```bash
docker compose run front bash install
composer install
exit
```

### 3. Dockerコンテナを起動
```bash
docker compose up -d
```

初回は5〜15分程度かかります。

### 4. コンテナの起動確認
```bash
docker compose ps
```

全てのコンテナが `Up` になっていることを確認

### 5. ブラウザでアクセス

- **Next.js (Frontend)**: http://localhost:3007
- **Laravel (Backend)**: http://localhost:8007

Next.jsのウェルカム画面が表示されれば成功です！

---

## 日常的な作業フロー

### 作業開始時
```bash
# Dockerコンテナを起動
docker compose up -d
```

### 作業終了時
```bash
# Dockerコンテナを停止
docker compose down
```

---

## よく使うコマンド

### ビルドコマンド
```bash
# 特定のサービスのみビルド
docker compose build front
docker compose build back

# キャッシュなしでビルド
docker compose build --no-cache

# 特定のサービスのみ起動
docker compose up front
docker compose up back
```

---

## 開発ガイドライン

### ブランチ戦略
- `main`: 本番環境
- `dev`: 開発環境
- `feature/*`: 機能開発ブランチ

### コミットメッセージ
```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加
chore: その他の変更
```

---

## トラブルシューティング

### 依存関係の問題が発生した場合
```bash
# フロントエンドの依存関係を再インストール
cd frontend/src
rm -rf node_modules package-lock.json
npm install
cd ../..

# バックエンドの依存関係を再インストール
cd backend/src
rm -rf vendor composer.lock
composer install
cd ../..
```

### コンテナが起動しない場合
```bash
# 完全なクリーンアップ
docker compose down
docker system prune -f
docker compose up -d
```

### ポートが使用中の場合
```bash
# 使用中のポートを確認
lsof -i :3007
lsof -i :8007
```

## 使用技術

- **Frontend**: Next.js 15.5.6, React 19.1.0, TypeScript
- **Backend**: Laravel (PHP 8.4)
- **Container**: Docker, Docker Compose
- **Database**: MySQL (必要に応じて追加)

---

## チーム開発

### コードレビュー
- プルリクエストを作成する前に、ローカルで動作確認
- フロントエンドとバックエンドの連携を確認
- 必要に応じてテストを追加

---
