<?php

namespace App\Helpers\Form\Type;

use App\Helpers\Form\Type\TextType;

class RadioType extends TextType
{
    protected $type = 'radio';
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

    public function getFiel()
    {
        $fields = parent::getFiel();
        $fields['options'] = $this->options;
        return $fields;
    }
}
