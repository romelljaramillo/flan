<?php

namespace App\Helpers\List;

use App\Helpers\List\Type\ColumnType;

class ListFields
{
    protected $fields;
    protected $inputType;

    public function add(string $key, ColumnType | string $inputType, $options = [])
    {
        $this->inputType = new $inputType();
        $this->inputType->setOption('key', $key);

        if (!empty($options)) {
            foreach ($options as $key => $value) {
                $this->inputType->setOption($key, $value);
            }
        }

        $this->fields[] = $this->inputType->getFiel();
    }

    public function getFields()
    {
        return $this->fields;
    }
}
