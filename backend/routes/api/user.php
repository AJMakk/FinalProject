<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use App\http\Controllers\API\CustomerAuthController;


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
Route::post('user/register', [CustomerAuthController::class,'register']);

Route::post('user/appointments/create',[AppointmentsController::class, 'store']);
Route::post('user/appointments',[AppointmentsController::class, 'index']);


Route::post('user/login',[LoginController::class, 'userLogin'])->name('userLogin');

Route::group( ['prefix' => 'user','middleware' => ['auth:user-api','scopes:user'] ],function(){
   // authenticated staff routes here
    Route::post('requestappointment',[AppointmentsController::class, 'store']);
    Route::post('deleteappointment',[AppointmentsController::class, 'destroy']);
    Route::put('editappointment',[AppointmentsController::class, 'update']);
    Route::post('previousappointments',[AppointmentsController::class, 'previousAppointments']);



    Route::post('profile',[ProfileController::class, 'userProfile']);

    Route::post('sendmessage', [MessageController::class, 'userStore']);
    Route::post('allmessages', [MessageController::class, 'getOneToOneMessages']);


});
