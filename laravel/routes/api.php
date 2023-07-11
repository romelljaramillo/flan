<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ImagesController;
use App\Http\Controllers\Admin\LangController;
use App\Http\Controllers\Admin\SearchController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SiteController;
use App\Http\Controllers\Admin\SiteGroupController;
Use App\Http\Controllers\Admin\SiteUrlController;

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

    // Roles
    Route::get('/roles/fieldsform', [RoleController::class, 'getFormFields'])
    ->middleware('permission:admin_roles_create|admin_roles_update');

    Route::get('/roles/fieldslist', [RoleController::class, 'getListFields'])
    ->middleware('permission:admin_roles_read');
    
    Route::apiResource('/roles', RoleController::class)
    ->middleware('permission:admin_roles_read|admin_roles_create|admin_roles_update|admin_roles_delete');

    // langs
    Route::apiResource('/langs', LangController::class);

    // Sites
    Route::apiResource('/sites', SiteController::class);

    // SiteGroups
    Route::apiResource('/sitegroups', SiteGroupController::class);

    // SiteUrls
    Route::apiResource('/siteurls', SiteUrlController::class);
});

Route::get('/img/{path}', [ImagesController::class, 'show'])
    ->where('path', '.*')
    ->name('image');
