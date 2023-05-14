<?php

namespace App\Helpers\Form\Type;

use App\Helpers\Form\Type\TextType;

class ImageType extends TextType
{
    protected $type = 'file';

    public function __construct()
    {
        $this->controlType = 'image';
    }
}
