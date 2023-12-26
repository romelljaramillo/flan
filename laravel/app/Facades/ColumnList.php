<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;
use App\Helpers\List\ColumnManager;

class ColumnList extends Facade
{
    protected static function getFacadeAccessor() 
    { 
        return ColumnManager::class;
    }
}
