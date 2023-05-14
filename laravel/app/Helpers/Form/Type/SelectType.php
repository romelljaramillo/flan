<?php

namespace App\Helpers\Form\Type;

use App\Helpers\Form\Type\TextType;

class SelectType extends TextType
{
    protected $type = 'select';
    protected $multiple = false;

    protected $options = [];

    public function getFiel()
    {
        $fields = parent::getFiel();
        $fields['options'] = $this->options;
        $fields['multiple'] = $this->multiple;
        return $fields;
    }
}
