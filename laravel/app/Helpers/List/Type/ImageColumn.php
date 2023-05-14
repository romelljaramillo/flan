<?php

namespace App\Helpers\List\Type;

use App\Helpers\List\Type\TextColumn;

class ImageColumn extends TextColumn
{
    protected $type = 'image';
    protected $orderby = false;
    protected $search = false;

}
