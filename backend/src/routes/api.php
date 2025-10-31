<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;
use App\Http\Controllers\PlacesController;
use App\Http\Controllers\RecommendController;

// テスト用のシンプルなAPI
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// 天気情報取得
Route::get('/weather', [WeatherController::class, 'getWeather']);

// 店舗情報取得
// 一覧
Route::get('/places/nearby', [PlacesController::class, 'searchNearby']);

// おすすめ店舗取得
Route::get('/recommend', [RecommendController::class, 'getRecommendations']);
