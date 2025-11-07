<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('店舗名');
            $table->string('address')->comment('住所');
            $table->json('opening_hours')->nullable()->comment('営業時間（曜日別のJSONデータ）');
            $table->boolean('open_today')->default(false)->comment('本日営業しているか');
            $table->string('image_url')->nullable()->comment('店舗画像のURL');
            $table->string('genre')->nullable()->comment('店舗ジャンル（例：カフェ、レストランなど）');
            $table->float('rating')->nullable()->comment('評価（例:4.5）');
            $table->decimal('lat', 10, 7)->comment('店舗の緯度');
            $table->decimal('lon', 10, 7)->comment('店舗の経度');
            $table->string('source_api')->nullable()->comment('取得元API名（例:Google Places）');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};