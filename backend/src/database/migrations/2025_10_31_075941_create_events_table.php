<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('イベントタイトル');
            $table->text('description')->nullable()->comment('イベント内容・詳細説明');
            $table->dateTime('start_datetime')->comment('開始日時');
            $table->dateTime('end_datetime')->comment('終了日時');
            $table->string('address')->comment('開催場所住所');
            $table->string('site_address')->nullable()->comment('公式サイトURL');
            $table->string('genre')->nullable()->comment('イベントジャンル（例：フェス、マルシェなど）');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};