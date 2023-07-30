<?php

namespace App\Http\Middleware;

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
    public function handle(Request $request, Closure $next)
    {
        /** @var User $user */
        $user = Auth::user(); // obtener el usuario actual

        $routeName = $request->route()->getName(); // obtener el nombre de la ruta

        // Para rutas de recursos, Laravel usa el formato 'resource.action'.
        // Podrías crear permisos que sigan esta convención.
        if ($user->can($routeName)) { // verificar si el usuario tiene el permiso
            return $next($request);
        }

        // Si el usuario no tiene el permiso, puedes redirigirlo,
        // devolver un error 403, lanzar una excepción, etc.
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
