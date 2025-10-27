<?php

use Illuminate\Support\Facades\Route;

// テスト用のシンプルなAPI
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// 外部API経由のデータ取得（後で実装）
// Route::get('/external-data', [ExternalApiController::class, 'fetchData']);
