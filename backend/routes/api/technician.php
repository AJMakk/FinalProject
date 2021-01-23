<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\ProfileController;



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

Route::post('technician/login',[LoginController::class, 'technicianLogin'])->name('technicianLogin');
Route::post('technician/apply',[RegisterController::class, 'technicianApply'])->name('technicianApply');

Route::group( ['prefix' => 'technician','middleware' => ['auth:technician-api','scopes:technician'] ],function(){
   // authenticated technician routes here
   Route::post('appointments/approve',[AppointmentsController::class, 'approve']);
   Route::post('appointments',[AppointmentsController::class, 'index']);
   Route::post('profile',[ProfileController::class, 'technicianProfile']);


});
