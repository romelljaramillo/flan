<?php

namespace Database\Seeders;

use App\Http\Controllers\Controller;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;
use Illuminate\Filesystem\Filesystem;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name' => 'superadmin']);

        $nameRoles = [
            'admin',
            'usuario',
            'administracion',
            'gestion',
            'rrhh',
            'marketing'
        ];

        foreach ($nameRoles as $nameRole) {
            if($nameRole == 'admin'){
                $role = Role::create(['name' => $nameRole]);

                $names = $this->getRoutesNameDescription();
                
                foreach ($names as $name) {
                    Permission::create([
                        'name' => $name['name'],
                        'description' => $name['description'],
                    ])->syncRoles([$role]);
                }

            } else {
                $role = Role::create(['name' => $nameRole]);
                // $role->syncPermissions([
                //     'admin_dashboard_read',
                //     'admin_users_read',
                //     'admin_users_update',
                // ]);
            }
        }

    }

    protected function getRoutesNameDescription() {
        $routes = Route::getRoutes();
        $namesController = [];
        foreach ($routes as $route) {
            if ($route->getActionName()) {
                $action = $route->getAction();
                if(!isset($action['controller'])) continue;
                $name = $route->getName() ?? $route->uri();
                $method = isset($action['uses']) ? explode('@', $action['uses'])[1] : null;
                
                switch ($method) {
                    case 'index':
                        $name = str_replace($method, 'read', $name);
                        break;
                    case 'store':
                        $name = str_replace($method, 'create', $name);
                        break;
                    case 'update':
                        $name = str_replace($method, 'update', $name);
                        break;
                    case 'destroy':
                        $name = str_replace($method, 'delete', $name);
                        break;
                    default:
                        $name = $name . '.read';
                        break;
                }

                $description = str_replace('.', ' ', $name);
                $namesController[] = [
                    'name' => $name,
                    'description' => $description
                ];
            }
        }

        return $namesController;
    }

    /* protected function permissionController() : void {
        $nameControllers = $this->getNameControllers();

        foreach ($nameControllers as $nameController) {
            $descriptionController = $this->splitCamelCase($nameController);

            foreach (['CREATE', 'READ', 'UPDATE', 'DELETE'] as $action) {
                $namePermission = strtoupper($nameController) . '_' . strtoupper($action);
                $descriptionPermission = $descriptionController . ' ' . $action;

                Permission::create([
                    'name' => $namePermission,
                    'description' => $descriptionPermission,
                ]
                )->syncRoles([$role]);
            }

        }
    }

    public function getNameControllers() {
        // Obtener una instancia del componente Filesystem
        $filesystem = new Filesystem();

        // Directorio donde se encuentran los controladores
        $controllersDirectory = app_path('Http/Controllers');

        // Obtener todos los archivos en el directorio de controladores
        $controllerFiles = $filesystem->allFiles($controllersDirectory);

        // Recorrer los archivos y obtener los nombres de los controladores sin la extensión .php
        $controllerNames = [];
        foreach ($controllerFiles as $file) {
            if ($file->getExtension() === 'php') {
                $controllerName = $file->getBasename('.php');
                if ($controllerName === 'Controller' || $controllerName === 'AdminController') {
                    continue;
                }
                $controllerName = str_replace('Controller', '', $controllerName);
                $controllerDirectory = basename(dirname($file->getPathname()));
                $controllerData[] = [
                    'name' => $controllerName,
                    'directory' => $controllerDirectory,
                ];
            }
        }

        return $controllerData;
    }

    public function splitCamelCase($input)
    {
        $regex = '/(?<!\b)(?=[A-Z])/'; // Expresión regular para encontrar las mayúsculas
        $words = preg_split($regex, $input);
        return implode(' ', $words);
    } */
}
