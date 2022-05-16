<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
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


// Route::get('/{any?}', 'HomeController@index')->where('any', '.*');
$request = Request();

if (!$request->is('api/*')) {
    if($request->is('admin/*')){
        Route::get('/{any?}', [
            function (Request $request) {
                return view('admin');
            }
        ])->where('any', '.*');
    } else {
        Route::get('/{any?}', [
            function (Request $request) {
                return view('front');
            }
        ])->where('any', '.*');
    }
}

// Route::get('/', function () {
//     return view('welcome');
// });

// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
