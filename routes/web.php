<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin.dashboard', function () {
        if (Auth::user()->role === 'admin') {
            return Inertia::render('admin/Dashboard'); // Assuming your admin dashboard is located in resources/js/pages/admin/Dashboard.jsx
        }
    })->name('admin.dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/agent.dashboard', function () {
        if (Auth::user()->role === 'agent') {
            return Inertia::render('agent/Dashboard'); 
        }
    })->name('agent.dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
