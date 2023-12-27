<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;
use App\Helpers\Form\FieldManager;

class FieldForm extends Facade
{
    protected static function getFacadeAccessor() 
    { 
        return FieldManager::class;
    }
}
