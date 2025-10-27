<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

// テスト用のシンプルなAPI
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// 天気API
Route::get('/weather', [WeatherController::class, 'getWeather']);
