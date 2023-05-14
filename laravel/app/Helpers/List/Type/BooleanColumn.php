<?php

namespace App\Helpers\List\Type;

use App\Helpers\List\Type\TextColumn;

class BooleanColumn extends TextColumn
{
    protected $type = 'boolean';

    /**
     * Opciones de busqueda avanzada
     *
     * @var array
     */
    protected $optionsSearch = [
        "minorOrEqual" => false,
        "majorOrEqual" => false,
        "minor" => false,
        "major" => false,
        "between" => false,
        "notBetween" => false,
        "in" => false,
        "notIn" => false,
    ];
}
