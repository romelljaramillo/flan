<?php

namespace App\Helpers\Form;

interface InputType
{
    public function getFiel();
    public function setOption(String $key, $value);
}
