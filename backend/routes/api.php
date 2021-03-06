<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CustomerAuthController;
use App\Http\Controllers\API\CityController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\TechnicianController;

use App\Models\Technician;

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

Route::post('/login', [CustomerAuthController::class,'login']);
Route::get('/logout', [CustomerAuthController::class,'logout']);

Route::get('/cities', [CityController::class,'index']);
Route::get('/categories', [CategoryController::class,'index']);

Route::get('/technicians', [TechnicianController::class,'index']);
Route::post('/technicians/search', [TechnicianController::class,'search']);
Route::get('/technicians/{technician}', [TechnicianController::class,'show']);


