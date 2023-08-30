<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Helpers\ApiResponse;

class AuthController extends AdminController
{

    /**
     * Login The User
     * @param Request $request
     * @return user_token
     */
    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required',
                ]
            );

            if ($validateUser->fails()) {
                return ApiResponse::error('Unauthorised.', ['error' => $validateUser->errors()], 401);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return ApiResponse::error(
                    'Unauthorised.',
                    ['error' => 'Email o Contraseña no coincide con nuestro registro.'],
                    401
                );
            }

            /** @var User $user */
            $user = Auth::user();
            if ($user->active) {
                $data = [
                    'token' => $user->createToken('API TOKEN')->plainTextToken,
                    'user' => $user->name,
                    'email' => $user->email,
                ];

            } else {
                $error = "usuario no activo";
                $errorMessages = "usuario no activo";
                return ApiResponse::error($error, $errorMessages, 403);
            }

            return ApiResponse::success($data, 'User login successfully.');

        } catch (\Throwable$th) {
            return ApiResponse::error('500 Internal Server Error.', ['error' => $th->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        $user->tokens()->delete();

        return ApiResponse::success([
            'logout' => true,
        ], 'User logout successfully.');
    }

    public function checkToken(Request $request)
    {
        return ApiResponse::success([
            'checkToken' => true,
            'user' => UserResource::make(Auth::user()),
        ], 'User successfully.');
    }

    public function checkPermission(Request $request)
    {
        $permission = $request->input('permission');

        $permissionName = env('PREF_PERMISSION_ADMIN') . $permission;

        /** @var User $user */
        $user = Auth::user();

        if ($user->can($permissionName)) {
            return response()->json(['can' => true]);
        }
    
        return response()->json(['can' => false]);
    }
}
