<?php

namespace App\Helpers\List\Type;

interface ColumnType
{
    public function getFiel();
    public function setOption(String $key, $value);
}
