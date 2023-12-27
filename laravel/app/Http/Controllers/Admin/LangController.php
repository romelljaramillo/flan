<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Form\HelperForm;
use App\Facades\FieldForm;

use App\Helpers\List\HelperList;
use App\Facades\ColumnList;

use App\Http\Requests\Lang\LangStoreRequest;
use App\Http\Requests\Lang\LangUpdateRequest;
use App\Http\Resources\Lang\LangCollection;
use App\Http\Resources\Lang\LangResource;
use App\Models\Lang;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse;


class LangController extends AdminController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->setFilter($request);

        $langs = ($this->filterFields) ?
        Lang::filterAdvance($this->filterFields)->orderBy($this->column, $this->orderBy)->paginate($this->perPage) :
        Lang::filter($this->filter)->orderBy($this->column, $this->orderBy)->paginate($this->perPage);

        return LangCollection::make($langs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\LangStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LangStoreRequest $request)
    {
        if ($request->validated()) {
            $lang = Lang::create([
                'name' => $request->name,
                'active' => $request->active,
                'iso_code' => $request->iso_code,
                'language_code' => $request->language_code,
                'locale' => $request->locale,
                'date_format_lite' => $request->date_format_lite,
                'date_format_full' => $request->date_format_full,
                'is_rtl' => $request->is_rtl,
            ]);

            // Asociar el idioma con las tiendas
            $lang->sites()->attach($request->sites);
        }

        return LangResource::make($lang);
    }

    /**LangStoreRequest
     * Display the specified resource.
     *
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\Response
     */
    public function show(Lang $lang)
    {
        return LangResource::make($lang);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\LangUpdateRequest  $request
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\ResponseLangStoreRequest
     */
    public function update(LangUpdateRequest $request, Lang $lang)
    {
        $lang->update($request->validated());
        return LangResource::make($lang);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lang $lang)
    {
        $data = $lang;

        if ($lang->sites()->exists()) {
            $lang->sites()->detach();
            $lang->delete();
        } else {
            $lang->forceDelete();
        }

        return ApiResponse::success($data, 'Eliminado');
    }

    /**
     * Devuelve los campos que se van a renderizar en el formulario
     *
     * @return void
     */
    public function getFieldsForm()
    {
        $this->fields = new HelperForm();
        $this->fields->add('id', FieldForm::number(), ['primarykey' => true]);
        $this->fields->add('name', FieldForm::text(), ['label' => 'Nombre', 'required' => true]);
        $this->fields->add('iso_code', FieldForm::text(), ['label' => 'Código ISO', 'required' => true]);
        $this->fields->add('language_code', FieldForm::text(), ['label' => 'Código del idioma', 'required' => true]);
        $this->fields->add('date_format_lite', FieldForm::text(), ['label' => 'Formato de fecha', 'required' => true]);
        $this->fields->add('date_format_full', FieldForm::text(), ['label' => 'Formato de fecha (completo)', 'required' => true]);
        $this->fields->add('locale', FieldForm::text(), ['label' => 'locale', 'required' => true]);
        $this->fields->add('is_rtl', FieldForm::checkbox(), ['label' => 'Idioma RTL']);
        $this->fields->add('active', FieldForm::checkbox(), ['label' => 'Estado']);

        return parent::getFieldsForm();
    }

    /**
     * Devuelve los campos que se van a renderizar en las columnas de la tabla
     *
     * @return void
     */
    public function getFieldsList()
    {
        $this->fields = new HelperList();
        $this->fields->add('id', ColumnList::number());
        $this->fields->add('name', ColumnList::text(), ['label' => 'Nombre']);
        $this->fields->add('iso_code', ColumnList::text(), ['label' => 'Código ISO']);
        $this->fields->add('language_code', ColumnList::text(), ['label' => 'Código del idioma']);
        $this->fields->add('date_format_lite', ColumnList::text(), ['label' => 'Formato de fecha']);
        $this->fields->add('date_format_full', ColumnList::text(), ['label' => 'Formato de fecha (completo)']);
        $this->fields->add('active', ColumnList::boolean(), ['label' => 'Estado']);
        $this->fields->add('created_at', ColumnList::datetime(), ['label' => 'Creado']);
        $this->fields->add('updated_at', ColumnList::datetime(), ['label' => 'Actualizado']);

        return parent::getFieldsList();
    }
}
