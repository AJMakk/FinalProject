<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CustomerAuthController;
use App\Http\Controllers\API\CityController;
use App\Http\Controllers\API\CategoryController;



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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [CustomerAuthController::class,'register']);
Route::post('/login', [CustomerAuthController::class,'login']);
Route::get('/logout', [CustomerAuthController::class,'logout']);

Route::get('/cities', [CityController::class,'index']);
Route::get('/categories', [CategoryController::class,'index']);

/* Route::apiResource('/cities', CityController::class)->middleware('auth:api');
 */
