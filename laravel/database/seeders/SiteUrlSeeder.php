<?php

namespace Database\Seeders;

use App\Models\Site;
use App\Models\SiteUrl;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiteUrlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Obtén todos los sites existentes
        $sites = Site::all();

        // Crea y asigna un SiteUrl a cada Site
        foreach ($sites as $site) {
            SiteUrl::create([
                'site_id' => $site->id,
                'domain' => 'example.com', // Ajusta el dominio según tus necesidades
                'domain_ssl' => 'example.com', // Ajusta el dominio SSL según tus necesidades
                'physical_uri' => '/',
                'virtual_uri' => '/',
                'main' => 1, // Ajusta según tus necesidades
                'active' => 1, // Ajusta según tus necesidades
            ]);
        }
    }
}
