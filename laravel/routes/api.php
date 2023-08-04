<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ConfigurationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ImagesController;
use App\Http\Controllers\Admin\LangController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SearchController;
use App\Http\Controllers\Admin\SiteController;
use App\Http\Controllers\Admin\SiteGroupController;
use App\Http\Controllers\Admin\SiteUrlController;
use App\Http\Controllers\Admin\UserController;
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

Route::get('/', function () {

    return response()->json(['message' => 'API v1.0'], 200);
});

Route::name(env('PREF_PERMISSION_ADMIN'))->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::get('/img/{path}', [ImagesController::class, 'show'])
    ->where('path', '.*')
    ->name('image');

    Route::middleware('auth:sanctum')->group(function () {
        // Auth
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/check-token', [AuthController::class, 'checkToken'])->name('check-token');
        Route::post('/hasrole', [AuthController::class, 'hasRole'])->name('hasrole');
        Route::post('/check-permissions', [AuthController::class, 'checkPermission'])->name('check-permissions');

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Search
        Route::get('/optionsearch', [SearchController::class, 'getOptionsSearch'])->name('optionsearch');

        // Users
        Route::get('/users/fieldsform', [UserController::class, 'getFormFields'])->name('users.fieldsform');
        Route::get('/users/fieldslist', [UserController::class, 'getListFields'])->name('users.fieldslist');
        Route::apiResource('/users', UserController::class);

        // Roles
        Route::get('/roles/fieldsform', [RoleController::class, 'getFormFields'])->name('roles.fieldsform');
        Route::get('/roles/fieldslist', [RoleController::class, 'getListFields'])->name('roles.fieldslist');
        Route::apiResource('/roles', RoleController::class);

        // Permissions
        Route::get('/permissions/fieldsform', [PermissionController::class, 'getFormFields'])->name('permissions.fieldsform');
        Route::get('/permissions/fieldslist', [PermissionController::class, 'getListFields'])->name('permissions.fieldslist');
        Route::apiResource('/permissions', PermissionController::class);

        // langs
        Route::get('/langs/fieldsform', [LangController::class, 'getFormFields'])->name('langs.fieldsform');
        Route::get('/langs/fieldslist', [LangController::class, 'getListFields'])->name('langs.fieldslist');
        Route::apiResource('/langs', LangController::class);

        // Sites
        Route::get('/sites/fieldsform', [SiteController::class, 'getFormFields'])->name('sites.fieldsform');
        Route::get('/sites/fieldslist', [SiteController::class, 'getListFields'])->name('sites.fieldslist');
        Route::apiResource('/sites', SiteController::class);

        // SiteGroups
        Route::apiResource('/sitegroups', SiteGroupController::class);

        // SiteUrls
        Route::apiResource('/siteurls', SiteUrlController::class);

        // Configurations
        Route::apiResource('/configurations', ConfigurationController::class);
    });
});


