<?php

namespace App\Http\Middleware;

use App\Helpers\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $roleOrPermission = null, $guard = null)
    {
        $message = 'User does not have the right permissions.';

        /** @var User $user */
        $authGuard = Auth::guard($guard);
        if ($authGuard->guest()) {
            return ApiResponse::error($message, 'Unauthorized', 403);
        }

        /** @var User $user */
        $user = $authGuard->user();

        $routeName = $request->route()->getName();

        if (!$roleOrPermission) {
            $roleOrPermission = $routeName;
        }

        $rolesOrPermissions = is_array($roleOrPermission)
        ? $roleOrPermission
        : explode('|', $roleOrPermission);
        
        if (!$user->hasAnyRole($rolesOrPermissions) && !$user->hasAnyPermission($rolesOrPermissions)) {
            $routeParameters = $request->route()->parameters();
            if (isset($routeParameters['user'])) {
                if ($user->id !== $routeParameters['user']->id) {
                    return ApiResponse::error($message, 'Unauthorized', 403);
                }
            } else {
                return ApiResponse::error($message, 'Unauthorized', 403);
            }
        }
       
        return $next($request);
    }
}
