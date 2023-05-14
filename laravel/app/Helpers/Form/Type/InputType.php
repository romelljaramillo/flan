<?php

namespace App\Helpers\Form\Type;

interface InputType
{
    public function getFiel();
    public function setOption(String $key, $value);
}
