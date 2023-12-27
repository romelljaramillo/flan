<?php

namespace App\Helpers\Form;

use App\Helpers\Form\InputType;

class HelperForm
{
    protected $fields;
    protected $inputType;

    public function add(string $key, InputType | string $inputType, $options = [])
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
