<?php

namespace App\Helpers\List\Type;

use App\Helpers\List\Type\TextColumn;

class NumberColumn extends TextColumn
{
    protected $type = 'number';

    /**
     * Opciones de busqueda avanzada
     *
     * @var array
     */
    protected $optionsSearch = [];
}
