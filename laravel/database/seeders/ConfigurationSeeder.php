<?php

namespace Database\Seeders;

use App\Models\Configuration;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Configuration::create(
            [
                'name' => 'RJ_LANG_DEFAULT',
                'value' => '1',
            ]
        );
        Configuration::create(
            [
                'name' => 'RJ_CURRENCY_DEFAULT',
                'value' => '1',
            ]
        );
        Configuration::create(
            [
                'name' => 'RJ_COUNTRY_DEFAULT',
                'value' => '6',
            ]
        );
        Configuration::create(
            [
                'name' => 'RJ_INSTALL_VERSION',
                'value' => '1.0',
            ]
        );
        Configuration::create(
            [
                'name' => 'RJ_INSTALL_AUTO',
                'value' => '0',
            ]
        );
        Configuration::create(
            [
                'name' => 'RJ_SITE_ENABLE',
                'value' => '1',
            ]
        );
        Configuration::create(
            [
                'name' => 'RJ_SITE_NAME',
                'value' => 'Flan',
            ]
        );
        Configuration::create(
            [
                'name' => 'RJ_SITE_EMAIL',
                'value' => 'example@gmail.com',
            ]
        );
        Configuration::create(
            [
                'name' => 'RJ_SITE_ADDR1',
                'value' => 'Address line 1',
            ]
        );
        Configuration::create(
            [
                'name' => 'RJ_SHOP_ENABLE',
                'value' => '1',
            ]
        );
    }
}
