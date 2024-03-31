<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;
use App\Models\Site;
use App\Models\Lang;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currency1 = Currency::create([
            'iso_code' => 'USD',
            'numeric_iso_code' => '840',
            'precision' => 2,
            'conversion_rate' => 1.000000,
            'deleted' => 0,
            'active' => 1,
            'unofficial' => 0,
            'modified' => 0,
        ]);

        $currency2 = Currency::create([
            'iso_code' => 'EUR',
            'numeric_iso_code' => '978',
            'precision' => 2,
            'conversion_rate' => 1.000000,
            'deleted' => 0,
            'active' => 1,
            'unofficial' => 0,
            'modified' => 0,
        ]);

        // Obtener todos los sitios y todos los idiomas
        $sites = Site::all();
        $langs = Lang::all();

        // Asociar las monedas con todos los sitios
        foreach ($sites as $site) {
            $currency1->sites()->attach($site->id);
            $currency2->sites()->attach($site->id);
        }

        // Asociar las monedas con todos los idiomas
        foreach ($langs as $lang) {
            $currency1->langs()->attach($lang->id, [
                'name' => 'Dóllar',
                'symbol' => '$', 
            ]);
            $currency2->langs()->attach($lang->id, [
                'name' => 'Euro',
                'symbol' => '€', 
            ]);
        }
    }
}
