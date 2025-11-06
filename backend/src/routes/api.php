<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// テスト用のシンプルなAPI
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// 天気API
Route::post('/login', [AuthController::class, 'Login']);
