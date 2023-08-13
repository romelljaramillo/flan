<?php

namespace App\Helpers\Form\Type;

use App\Helpers\Form\Type\TextType;

class CheckboxType extends TextType
{
    protected $type = 'checkbox';
    protected $options = [];

    public function getFiel()
    {
        $fields = parent::getFiel();
        $fields['options'] = $this->options;
        return $fields;
    }
}
