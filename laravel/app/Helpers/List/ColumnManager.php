<?php

namespace App\Helpers\List;

use App\Helpers\List\Type\BooleanColumn;
use App\Helpers\List\Type\DateTimeColumn;
use App\Helpers\List\Type\ImageColumn;
use App\Helpers\List\Type\NumberColumn;
use App\Helpers\List\Type\TextColumn;

class ColumnManager
{
    public function boolean()
    {
        return new BooleanColumn();
    }

    public function text()
    {
        return new TextColumn();
    }

    public function number()
    {
        return new NumberColumn();
    }

    public function image()
    {
        return new ImageColumn();
    }

    public function dateTime()
    {
        return new DateTimeColumn();
    }
}