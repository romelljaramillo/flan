<?php

namespace Database\Seeders;

use App\Models\Site;
use App\Models\SiteUrl;
use App\Models\SiteGroup;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $siteGroup = SiteGroup::create([
            'name' => 'default',
            'color' => '#ff0000',
            'share_customer' => 0,
            'share_order' => 0,
            'share_stock' => 0,
            'active' => 1,
        ]);

        // Crea tiendas de ejemplo
        $site1 = Site::create([
            'site_group_id' => $siteGroup->id,
            'name' => 'site1',
            'color' => '#ff0000',
            'category_id' => 1,
            'theme_name' => 'Default',
            'active' => 1,
        ]);

        $site2 = Site::create([
            'site_group_id' => $siteGroup->id,
            'name' => 'site2',
            'color' => '#ff00ff',
            'category_id' => 1,
            'theme_name' => 'Default',
            'active' => 1,
        ]);

         // Crea y asigna un SiteUrl a cada Site
        SiteUrl::create([
            'site_id' => $site1->id,
            'domain' => 'localhost', 
            'domain_ssl' => 'localhost',
            'physical_uri' => '/',
            'virtual_uri' => '/',
            'main' => 1, 
            'active' => 1, 
        ]);

        SiteUrl::create([
            'site_id' => $site2->id,
            'domain' => 'localhost', 
            'domain_ssl' => 'localhost',
            'physical_uri' => '/',
            'virtual_uri' => '/site2\/',
            'main' => 1, 
            'active' => 1, 
        ]);
    }
}
