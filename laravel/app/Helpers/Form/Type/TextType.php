<?php

namespace App\Helpers\Form\Type;

use App\Helpers\Form\Type\InputType;

class TextType implements InputType
{
    /**
     * Identificador y name del input
     *
     * @var [type]
     */
    protected $key;

    /**
     * Nombre visible del input
     *
     * @var [type]
     */
    protected $label = '';

    /**
     * Type del campo
     *
     * @var string
     */
    protected $type = 'text';

    /**
     * Diseño del campo
     *
     * @var string
     */
    protected $controlType = 'text';

    /**
     * Alineación del input
     *
     * @var string
     */
    protected $class = '';

    /**
     * Si el campo es obligatorio
     *
     * @var boolean
     */
    protected $required = false;

    /**
     * Orden de aparición en el formulario
     *
     * @var integer
     */
    protected $order = 1;

    /**
     * Si el campo identificador
     *
     * @var boolean
     */
    protected $primarykey = false;

    /**
     * valor por defecto
     *
     * @var boolean
     */
    protected $defaultValue = '';

    /**
     * placeholder
     *
     * @var string
     */
    protected $placeholder = '';

    public function __construct()
    {
        $this->controlType = $this->type;
    }

    public function setOption(String $key, $value)
    {
        if (property_exists($this, $key)) {
            $this->$key = $value;
        }
    }

    public function getFiel()
    {
        return [
            'key' => $this->key,
            'label' => $this->label,
            'type' => $this->type,
            'controlType' => $this->controlType,
            'class' => $this->class,
            'required' => $this->required,
            'order' => $this->order,
            'primarykey' => $this->primarykey,
            'defaultValue' => $this->defaultValue,
            'placeholder' => $this->placeholder,
        ];
    }
}
