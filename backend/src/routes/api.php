<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WeatherController;
use App\Http\Controllers\PlacesController;
use App\Http\Controllers\RecommendController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/sign-up', [AuthController::class, 'signUp']);
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
});

// 天気情報取得
Route::get('/weather', [WeatherController::class, 'getWeather']);

// 店舗情報取得
Route::get('/places/nearby', [PlacesController::class, 'searchNearby']);    // 近くの店舗
Route::get('/places/details', [PlacesController::class, 'getPlaceDetails']);    // 店舗詳細

// デフォルト座標取得
Route::get('/places/default-location', [PlacesController::class, 'getDefaultLocation']);

// おすすめ店舗取得
Route::get('/recommend', [RecommendController::class, 'getRecommendations']);