<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
                return $this->sendError('Unauthorised.', ['error' => $validateUser->errors()], 401);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return $this->sendError(
                    'Unauthorised.',
                    ['error' => 'Email o Contraseña no coincide con nuestro registro.'],
                    401
                );
            }

            /** @var User $user */
            $user = Auth::user();
            if ($user->active) {
                $success['token'] = $user->createToken('API TOKEN')->plainTextToken;
                $success['name'] = $user->name;
                $success['email'] = $user->email;
            } else {
                $error = "usuario no activo";
                $errorMessages = "usuario no activo";
                return $this->sendError($error, $errorMessages, 403);
            }

            return $this->sendResponse($success, 'User login successfully.');

        } catch (\Throwable$th) {
            return $this->sendError('500 Internal Server Error.', ['error' => $th->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        Auth::user();
        $request->user()->tokens()->delete();
        $success['logout'] = true;
        return $this->sendResponse($success, 'User logout successfully.');
    }

    public function checkToken(Request $request)
    {
        $success['checkToken'] = true;
        $success['user'] = UserResource::make(Auth::user());
        return $this->sendResponse($success, 'User successfully.');
    }

    public function hasPermissionsByEntity(Request $request)
    {
        if (!isset($request->entity)) {
            return false;
        }

        /** @var User $user */
        $user = Auth::user();

        $success = [
            'create' => $user->can(env('PREF_PERMISSION_ADMIN') . $request->entity . env('SUF_PERMISION_CRUD_C')),
            'read' => $user->can(env('PREF_PERMISSION_ADMIN') . $request->entity . env('SUF_PERMISION_CRUD_R')),
            'update' => $user->can(env('PREF_PERMISSION_ADMIN') . $request->entity . env('SUF_PERMISION_CRUD_U')),
            'delete' => $user->can(env('PREF_PERMISSION_ADMIN') . $request->entity . env('SUF_PERMISION_CRUD_D')),
        ];

        return $this->sendResponse($success, 'User successfully.');
    }
}
