<?php

namespace App\Helpers\Form\Type;

use App\Helpers\Form\Type\TextType;

class FileType extends TextType
{
    protected $type = 'file';
    protected $controlType = 'file';
}
