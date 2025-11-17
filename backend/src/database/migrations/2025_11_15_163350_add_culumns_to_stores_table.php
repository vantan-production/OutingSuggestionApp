<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('stores', function (Blueprint $table) {
            // place_id を追加（name の前に配置）
            $table->string('place_id')->unique()->after('id')->comment('Google Places API の店舗ID');

            // image_url を削除して images に変更（複数取得）
            $table->dropColumn('image_url');
            $table->json('images')->nullable()->after('open_today')->comment('店舗画像のURL配列');

            // genre を JSON に変更（複数取得）
            $table->dropColumn('genre');
            $table->json('genre')->nullable()->after('images')->comment('店舗ジャンル配列');

            // lon の精度を修正
            $table->decimal('lon', 11, 7)->change()->comment('店舗の経度');
        });
    }

    public function down(): void
    {
        Schema::table('stores', function (Blueprint $table) {
            // ロールバック時に元に戻す
            $table->dropColumn('place_id');

            $table->dropColumn('images');
            $table->string('image_url')->nullable();

            $table->dropColumn('genre');
            $table->string('genre')->nullable();

            $table->decimal('lon', 10, 7)->change();
        });
    }
};
