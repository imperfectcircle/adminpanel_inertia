<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\ComicController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(GuestController::class)->group(function () {
    Route::get('/', 'index')->name('homepage');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('users', UserController::class);
    Route::resource('orders', OrderController::class);
    Route::resource('comics', ComicController::class);
    Route::resource('authors', AuthorController::class);
});

require __DIR__.'/auth.php';
