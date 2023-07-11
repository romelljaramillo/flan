<?php

namespace Database\Seeders;

use App\Models\Site;
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
        // Obtén un grupo de tiendas existente
        $siteGroup = SiteGroup::first();

        // Crea tiendas de ejemplo
        Site::create([
            'site_group_id' => $siteGroup->id,
            'name' => 'default',
            'color' => 'red',
            'category_id' => 1,
            'theme_name' => 'Default',
            'active' => 1,
        ]);
    }
}
