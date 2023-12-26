<?php

namespace App\Helpers\List;

use App\Helpers\List\Type\BooleanColumn;
use App\Helpers\List\Type\DateTimeColumn;
use App\Helpers\List\Type\ImageColumn;
use App\Helpers\List\Type\NumberColumn;
use App\Helpers\List\Type\TextColumn;

class ColumnManager
{
    public function booleanColumn()
    {
        return new BooleanColumn();
    }

    public function textColumn()
    {
        return new TextColumn();
    }

    public function numberColumn()
    {
        return new NumberColumn();
    }

    public function imageColumn()
    {
        return new ImageColumn();
    }

    public function dateTimeColumn()
    {
        return new DateTimeColumn();
    }
}