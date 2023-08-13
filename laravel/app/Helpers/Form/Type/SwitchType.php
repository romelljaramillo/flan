<?php

namespace App\Helpers\Form\Type;

use App\Helpers\Form\Type\TextType;

class SwitchType extends TextType
{
    protected $type = 'checkbox';
    protected $options = [
        [
            'id' => 1,
            'name' => 'yes',
        ],
        [
            'id' => 0,
            'name' => 'no',
        ],
    ];

    public function __construct()
    {
        $this->controlType = 'switch';
    }

    public function getFiel()
    {
        $fields = parent::getFiel();
        $fields['options'] = $this->options;
        return $fields;
    }
}
