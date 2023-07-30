<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\AdminController;
use App\Helpers\ApiResponse;

class SearchController extends AdminController
{
    private $options = [];

    /*
    "optionsSearch" => [
    "minor" => equal,       // "Igual" = "=",
    "notEqual" => true,     // "Distinto de" = "<>",
    "minor" => true,        // "Menor que" = "<",
    "major" => true,        // "Mayor que" = ">",
    "minorOrEqual" => true, // "Menor o igual que" = "<=",
    "majorOrEqual" => true, // "Mayor o igual que" = ">=",
    "between" => true,      // "Entre" = "BETWEEN",
    "notBetween" => true,   // "No Entre" = "NOT BETWEEN",
    "like" => true,         // "Contiene" = "LIKE",
    "in" => true,           // "Alguno de estos" => "IN"
    "notIn" => true         // "No Alguno de estos" => "NOT IN"
    ],
     */
    public function getOptionsSearch()
    {
        $this->options = self::getOptions();

        foreach ($this->options as $value) {
            $response[] = array_diff_key($value, array_flip(["operator"]));
        }

        return ApiResponse::success($response, 'OK');
    }

    public static function getOptions()
    {
        return [
            ["option" => "equal", 'description' => "Igual", "operator" => "="],
            ["option" => "notEqual", 'description' => "Distinto de", "operator" => "!="],
            ["option" => "minor", 'description' => "Menor que", "operator" => "<"],
            ["option" => "major", 'description' => "Mayor que", "operator" => ">"],
            ["option" => "minorOrEqual", 'description' => "Menor o igual que", "operator" => "<="],
            ["option" => "majorOrEqual", 'description' => "Mayor o igual que", "operator" => ">="],
            ["option" => "between", 'description' => "Entre", "operator" => "BETWEEN"],
            ["option" => "notBetween", 'description' => "No Entre", "operator" => "NOTBETWEEN"],
            ["option" => "like", 'description' => "Contiene", "operator" => "LIKE"],
            ["option" => "in", 'description' => "Alguno de estos", "operator" => "IN"],
            ["option" => "notIn", 'description' => "No Alguno de estos", "operator" => "NOTIN"],
        ];
    }

    /**
     * Valida si la opción esta en el array de opciones de busqueda
     *
     * @param String $option
     * @return boolean
     */
    public static function SearchController(String $option)
    {
        $arrayOptions = self::getOptions();

        if (array_search($option, array_column($arrayOptions, 'option')) !== false) {
            return true;
        }

        return false;
    }
}
