<?php

namespace App\Helpers\List;

interface ColumnType
{
    public function getFiel();
    public function setOption(String $key, $value);
}
