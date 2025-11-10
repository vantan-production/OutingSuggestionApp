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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy']);
    Route::get('/favorites/check/{placeId}', [FavoriteController::class, 'check']);
});

// 天気情報取得
Route::get('/weather', [WeatherController::class, 'getWeather']);

// 店舗情報取得
Route::get('/places/nearby', [PlacesController::class, 'searchNearby']);

// おすすめ店舗取得
Route::get('/recommend', [RecommendController::class, 'getRecommendations']);
