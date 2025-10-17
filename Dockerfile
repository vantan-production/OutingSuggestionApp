FROM php:8.2-fpm

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
  git \
  curl \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  libcurl4-openssl-dev \
  zip \
  unzip \
  && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd curl

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリを設定
WORKDIR /var/www/html

# laravelの開発サーバーを起動
CMD php artisan serve --host=0.0.0.0 --port=8000