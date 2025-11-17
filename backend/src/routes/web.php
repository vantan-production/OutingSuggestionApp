<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\StoreController;
use Illuminate\Routing\Controller;
use App\Http\Controllers\AuthController;
use Illuminate\Container\Attributes\Auth;

Route::get('/top', [UserController::class, 'index']) ->name('top');

Route::get('/stores/{id}', [StoreController::class, 'show'])->name('store_detail');

// ログイン
Route::get('/login', [AuthController::class, 'LoginForm']) ->name('login');
Route::post('/login', [AuthController::class, 'Login']) ->name('login.submit');

// 新規登録
Route::get('/sign_in', [AuthController::class, 'RegisterForm']) ->name('sign_in');
Route::post('/sign_in', [AuthController::class, 'Register']) ->name('sign_in.submit');

// ログアウト処理
Route::post('/logout', [AuthController::class, 'Logout'])->name('logout');
