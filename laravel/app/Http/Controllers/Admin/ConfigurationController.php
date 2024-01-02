<?php

namespace App\Http\Controllers\Admin;

use App\Models\Configuration;
use Illuminate\Http\Request;
use App\Http\Requests\Configuration\ConfigurationStoreRequest;
use App\Http\Requests\Configuration\ConfigurationUpdateRequest;
use App\Facades\FieldForm;
use App\Helpers\Form\HelperForm;
use App\Helpers\ApiResponse;

class ConfigurationController extends AdminController
{
    public function index(Request $request)
    {
        $configurations = Configuration::with('langs')->get();
        return response()->json($configurations);
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $value = $request->input('value');
        $configuration = Configuration::create($request->all());
        return response()->json($configuration, 201);
    }

    public function show($id)
    {
        $config = Configuration::getByParams('RJ_LANG_DEFAULT');
        $configuration = Configuration::with('langs')->find($id);
        return response()->json($configuration);
    }

    public function update(Request $request, $id)
    {
        $configuration = Configuration::find($id);
        $configuration->update($request->all());
        return response()->json($configuration);
    }

    public function destroy($id)
    {
        $configuration = Configuration::find($id);
        $configuration->delete();
        return response()->json(null, 204);
    }

    /**
     * Devuelve los campos que se van a renderizar en el formulario
     *
     * @return void
     */
    public function getFieldsForm()
    {
        $this->fields = new HelperForm();;
        $this->fields->add('RJ_SSL_ENABLED', FieldForm::checkbox(), ['label' => 'Activar SSL en todas las páginas']);
        $this->fields->add('RJ_DISPLAY_MANUFACTURERS', FieldForm::checkbox(), ['label' => 'Mostrar marcas']);
        $this->fields->add('RJ_BLOCK_BESTSELLERS_DISPLAY', FieldForm::checkbox(), ['label' => 'Mostrar los productos más vendidos']);

        return parent::getFieldsForm();
    }
}
