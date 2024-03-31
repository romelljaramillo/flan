<?php

namespace Database\Seeders;


use App\Models\Lang;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Site;

class LangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lang1 = Lang::create([
            'name' => 'English',
            'image' => 'uk.png',
            'active' => 1,
            'iso_code' => 'en',
            'language_code' => 'en-US',
            'locale' => 'en_US',
            'date_format_lite' => 'm/d/Y',
            'date_format_full' => 'm/d/Y H:i:s',
            'is_rtl' => 0,
        ]);

        $lang2 = Lang::create([
            'name' => 'Spanish',
            'image' => 'es.png',
            'active' => 1,
            'iso_code' => 'es',
            'language_code' => 'es-ES',
            'locale' => 'es_ES',
            'date_format_lite' => 'd/m/Y',
            'date_format_full' => 'd/m/Y H:i:s',
            'is_rtl' => 0,
        ]);

        $lang3 = Lang::create([
            'name' => 'French',
            'image' => 'fr.png',
            'active' => 1,
            'iso_code' => 'fr',
            'language_code' => 'fr-FR',
            'locale' => 'fr_FR',
            'date_format_lite' => 'd/m/Y',
            'date_format_full' => 'd/m/Y H:i:s',
            'is_rtl' => 0,
        ]);

        $sites = Site::all();

        foreach ($sites as $site) {
            $lang1->sites()->attach($site->id);
            $lang2->sites()->attach($site->id);
            $lang3->sites()->attach($site->id);
        }
    }
}
