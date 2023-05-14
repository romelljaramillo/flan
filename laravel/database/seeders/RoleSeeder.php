<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::create(['name' => 'superadmin']);
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'usuario']);
        Role::create(['name' => 'administracion']);
        Role::create(['name' => 'gestion']);
        Role::create(['name' => 'rrhh']);
        Role::create(['name' => 'marketing']);

        $permissions = [
            ['name' => 'admin_dashboard_read', 'description' => 'dashboard admin'],
            ['name' => 'admin_roles_read', 'description' => 'listar roles'],
            ['name' => 'admin_roles_create', 'description' => 'crear roles'],
            ['name' => 'admin_roles_update', 'description' => 'editar roles'],
            ['name' => 'admin_roles_delete', 'description' => 'eliminar roles'],
            ['name' => 'admin_users_read', 'description' => 'listar usuarios'],
            ['name' => 'admin_users_create', 'description' => 'crear usuario'],
            ['name' => 'admin_users_update', 'description' => 'editar usuario'],
            ['name' => 'admin_users_delete', 'description' => 'eliminar usuario'],
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission['name'],
                'description' => $permission['description'],
            ]
            )->syncRoles([$role]);
        }
    }
}
