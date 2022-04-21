<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['as' => 'api.'], function () {

    Route::post('/register', 'Api\AuthController@register')->name('api.register');

    Route::post('/login', 'Api\AuthController@login')->name('api.login');

    Route::resource('category', Api\CategoryController::class);
    Route::get('/category/table', 'Api\CategoryController@table')->name('category.table');
    Route::get('/category-list', 'Api\CategoryController@list')->name('category.list');
    Route::post('/category/categoryupdate', 'Api\CategoryController@categoryupdate')->name('category.categoryupdate');


    Route::resource('post', Api\PostController::class);
    Route::get('/post/table', 'Api\PostController@table')->name('api.post.table');
    Route::post('/post/postupdate', 'Api\PostController@postupdate')->name('api.post.postupdate');


});
