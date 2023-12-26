<?php

namespace App\Helpers\List\Type;

use App\Helpers\List\ColumnType;
use App\Http\Controllers\Admin\SearchController;

class TextColumn implements ColumnType
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
    protected $label;

    /**
     * Type del campo
     *
     * @var string
     */
    protected $type = 'text';

    /**
     * class css input
     *
     * @var string
     */
    protected $class = '';

    /**
     * Alineación del input
     *
     * @var string
     */
    protected $align = 'left';

    /**
     * Si queremos que el input sea ordenable DESC | ASC
     *
     * @var boolean
     */
    protected $orderby = true;

    /**
     * Si queremos que se utilice el input para la
     * busqueda rapida
     *
     * @var boolean
     */
    protected $search = false;

    /**
     * Si queremos que se utilice el input para la
     * busqueda rapida
     *
     * @var boolean
     */
    protected $searchAdvance = true;

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
     * Opciones de busqueda avanzada
     *
     * @var array
     */
    protected $optionsSearch = [
        "minorOrEqual" => false,
        "majorOrEqual" => false,
        "minor" => false,
        "major" => false,
        "between" => false,
        "notBetween" => false,
    ];

    public function setOption(String $key, $value)
    {
        if (property_exists($this, $key)) {
            if ($key == 'optionsSearch') {
                $this->$key = $this->getOptionsSearch($value);
                return;
            }
            $this->$key = $value;
        }
    }

    private function getOptionsSearch(array $optionsSearch)
    {
        if (!empty($optionsSearch)) {
            foreach ($optionsSearch as $key => $value) {
                if (SearchController::SearchController($key) && is_bool($value)) {
                    if ($value) {
                        unset($this->optionsSearch[$key]);
                    } else {
                        $this->optionsSearch[$key] = $value;
                    }
                }
            }
        }

        return $this->optionsSearch;
    }

    public function getFiel()
    {
        return [
            'key' => $this->key,
            'label' => ($this->label) ? $this->label : $this->key,
            'type' => $this->type,
            'class' => $this->class,
            'align' => $this->align,
            'orderby' => $this->orderby,
            'search' => $this->search,
            'searchAdvance' => $this->searchAdvance,
            'required' => $this->required,
            'order' => $this->order,
            'optionsSearch' => $this->optionsSearch,
        ];
    }
}
