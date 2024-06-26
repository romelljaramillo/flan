<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RolePermissionSeeder::class,
            SiteSeeder::class,
            LangSeeder::class,
            ConfigurationSeeder::class,
            CurrencySeeder::class
        ]);
        
        User::factory()->create([
            'first_name' => 'Romell',
            'last_name' => 'Jaramillo',
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'active' => true
        ])->assignRole('superadmin', 'admin');

        User::factory(50)->create();
    }
}
