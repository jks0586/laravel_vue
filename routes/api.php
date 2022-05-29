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

    // Route::get('/front/posts', 'Api\PostController@posts')->name('category.frontposts');
    Route::get('/category-list', 'Api\CategoryController@list')->name('category.list');
    Route::get('/post-detail/{post_id}', 'Api\PostController@postdetail')->name('post.detail');
    Route::post('/posts', 'Api\PostController@posts')->name('category.posts');

    Route::group(['middleware' => ['auth:api']], function () {
        Route::get('/users-list', 'Api\AuthController@list')->name('api.users.list');
        Route::get('/user/{user}', 'Api\AuthController@get')->name('api.user.get');
        Route::post('/user', 'Api\AuthController@post')->name('api.user.post');
        Route::delete('/user/{user}', 'Api\AuthController@destroy')->name('api.user.destroy');

        Route::resource('category', Api\CategoryController::class);
        Route::get('/category/table', 'Api\CategoryController@table')->name('category.table');

        Route::post('/category/categoryupdate', 'Api\CategoryController@categoryupdate')->name('category.categoryupdate');

        Route::resource('post', Api\PostController::class);
        Route::get('/post/table', 'Api\PostController@table')->name('api.post.table');

        Route::post('/post/postupdate', 'Api\PostController@postupdate')->name('api.post.postupdate');

        Route::resource('comment', Api\CommentController::class);
        Route::post('/comment/commentupdate', 'Api\CommentController@commentupdate')->name('api.comment.commentupdate');

    });

});
