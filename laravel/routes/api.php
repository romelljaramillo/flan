<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ImagesController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\RoleController;

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

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/checkToken', [AuthController::class, 'checkToken']);
    Route::post('/hasRole', [AuthController::class, 'hasRole']);
    Route::post('/hasPermission', [AuthController::class, 'hasPermissionsByEntity']);

    // optener las opciones de busqueda avanzada
    Route::get('/optionsearch', [SearchController::class, 'getOptionsSearch']);
    
    // Users
    Route::get('/users/fieldsform', [UserController::class, 'getFormFields'])
    ->middleware('permission:admin_users_create|admin_users_update');

    Route::get('/users/fieldslist', [UserController::class, 'getListFields'])
    ->middleware('permission:admin_users_read');

    Route::apiResource('/users', UserController::class)
    ->middleware('permission:admin_users_read|admin_users_create|admin_users_update|admin_users_delete');


    Route::get('/roles/fieldsform', [RoleController::class, 'getFormFields'])
    ->middleware('permission:admin_roles_create|admin_roles_update');

    Route::get('/roles/fieldslist', [RoleController::class, 'getListFields'])
    ->middleware('permission:admin_roles_read');

    Route::apiResource('/roles', RoleController::class)
    ->middleware('permission:admin_roles_read|admin_roles_create|admin_roles_update|admin_roles_delete');
});

Route::get('/img/{path}', [ImagesController::class, 'show'])
    ->where('path', '.*')
    ->name('image');
