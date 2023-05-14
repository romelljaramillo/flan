<?php

namespace App\Helpers\Form\Type;

use App\Helpers\Form\Type\TextType;

class SwitchType extends TextType
{
    protected $type = 'switch';
    protected $options = [
        [
            'id' => 'active_on',
            'value' => 1,
            'label' => 'yes',
        ],
        [
            'id' => 'active_off',
            'value' => 0,
            'label' => 'no',
        ],
    ];

    public function getFiel()
    {
        $fields = parent::getFiel();
        $fields['options'] = $this->options;
        return $fields;
    }
}
