<?php

namespace App\Helpers\List\Type;

use App\Helpers\List\Type\TextColumn;

class DateTimeColumn extends TextColumn
{
    protected $type = 'datetime';
    protected $search = false;

    /**
     * Opciones de busqueda avanzada
     *
     * @var array
     */
    protected $optionsSearch = [];
}
