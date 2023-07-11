<?php

namespace Database\Seeders;


use App\Models\Lang;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Lang::create([
            'name' => 'English',
            'active' => 1,
            'iso_code' => 'en',
            'language_code' => 'en-US',
            'locale' => 'en_US',
            'date_format_lite' => 'm/d/Y',
            'date_format_full' => 'm/d/Y H:i:s',
            'is_rtl' => 0,
        ])->sites()->attach(1);

        Lang::create([
            'name' => 'Spanish',
            'active' => 1,
            'iso_code' => 'es',
            'language_code' => 'es-ES',
            'locale' => 'es_ES',
            'date_format_lite' => 'd/m/Y',
            'date_format_full' => 'd/m/Y H:i:s',
            'is_rtl' => 0,
        ])->sites()->attach(1);
    }
}
