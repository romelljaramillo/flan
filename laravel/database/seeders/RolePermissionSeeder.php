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
                $procesados = [];

                foreach ($names as $name) {
                    if(!in_array($name['name'], $procesados)){
                        Permission::create([
                            'name' => $name['name'],
                            'description' => $name['description'],
                        ])->syncRoles([$role]); 
                    }

                    $procesados[] = $name['name'];
                }

            } else {
                $role = Role::create(['name' => $nameRole]);
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

                $description = str_replace('.', ' ', $name);
                $namesController[] = [
                    'name' => $name,
                    'description' => $description
                ];
            }
        }

        return $namesController;
    }
}
