<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // topページで使います
    return view('index');
});
Route::get('/ai-research', function () {
    // ai-researchページで使います
    return view('ai-research');
});
Route::get('/ai-research-category', function () {
    // ai-research-categoryページで使います
    return view('ai-research-category');
});
Route::get('/search-list', function () {
    // search-listページで使います
});
Route::get('/detail', function () {
    // detailページで使います
    return view('detail');
});
Route::get('/favorite-list', function () {
    // favorite-listページで使います
    return view('favorite');
});
Route::get('/login', function () {
    // loginページで使います
    return view('login');
});
Route::get('/signup', function () {
    // signupページで使います
    return view('signup');
});
Route::get('/profile', function () {
    // profileページで使います
    return view('profile');
});