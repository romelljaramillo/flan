<?php

namespace Database\Seeders;

use App\Models\SiteGroup;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SiteGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SiteGroup::create([
            'name' => 'default',
            'color' => '',
            'share_customer' => 0,
            'share_order' => 0,
            'share_stock' => 0,
            'active' => 1,
        ]);
    }
}
