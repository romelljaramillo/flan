<?php

namespace App\Helpers\Form\Type;

use App\Helpers\Form\Type\TextType;

class CheckboxMultiType extends TextType
{
    protected $type = 'checkbox';
    protected $multiple = false;
    protected $controlType = 'checkbox-multi';

    protected $options = [];

    public function __construct()
    {
        $this->controlType = 'checkbox-multi';
    }

    public function getFiel()
    {
        $fields = parent::getFiel();
        $fields['options'] = $this->options;
        // $fields['multiple'] = $this->multiple;
        return $fields;
    }
}
