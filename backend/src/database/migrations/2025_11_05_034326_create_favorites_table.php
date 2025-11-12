<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->comment('ユーザーID');
            $table->string('favoritable_id')->comment('お気に入り対象のID（店舗またはイベント）');
            $table->string('favoritable_type')->comment('お気に入り対象のタイプ（ShopまたはEvent）');
            $table->timestamps();
            
            // 同じユーザーが同じ対象を複数回お気に入りできないように
            $table->unique(['user_id', 'favoritable_id', 'favoritable_type'], 'user_favoritable_unique');
            
            // インデックス
            $table->index(['favoritable_id', 'favoritable_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};