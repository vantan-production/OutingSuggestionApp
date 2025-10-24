<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use Illuminate\Routing\Controller;

Route::get('/', [UserController::class, 'index']) ->name('top');