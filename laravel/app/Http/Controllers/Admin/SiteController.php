<?php

namespace App\Http\Controllers\Admin;

use App\Models\Site;
use Illuminate\Http\Request;
use App\Helpers\Form\HelperForm;
use App\Facades\FieldForm;

use App\Helpers\List\HelperList;
use App\Facades\ColumnList;

use App\Http\Requests\Site\SiteStoreRequest;
use App\Http\Requests\Site\SiteUpdateRequest;
use App\Http\Resources\Site\SiteCollection;
use App\Http\Resources\Site\SiteResource;
use App\Helpers\ApiResponse;
use App\Models\SiteGroup;

class SiteController extends AdminController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->setFilter($request);

        $sites = ($this->filterFields) ?
        Site::filterAdvance($this->filterFields)->orderBy($this->column, $this->orderBy)->paginate($this->perPage) :
        Site::filter($this->filter)->orderBy($this->column, $this->orderBy)->paginate($this->perPage);

        return SiteCollection::make($sites);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\SiteStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SiteStoreRequest $request)
    {
        if ($request->validated()) {
            $site = Site::create([
                'site_group_id' => $request->site_group_id,
                'name' => $request->name,
                'color' => $request->color,
                'category_id' => $request->category_id,
                'theme_name' => $request->theme_name,
                'active' => $request->active,
            ]);
        }

        return SiteResource::make($site);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function show(Site $site)
    {
        return SiteResource::make($site);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\SiteUpdateRequest  $request
     * @param  \App\Models\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function update(SiteUpdateRequest $request, Site $site)
    {
        $site->update($request->validated());
        return SiteResource::make($site);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function destroy(Site $site)
    {
        $data = $site;
        $site->delete();
        return ApiResponse::success($data, 'Eliminado');
    }

    /**
     * Devuelve los campos que se van a renderizar en el formulario
     *
     * @return json
     */
    public function getFieldsForm()
    {
        $siteGroups = SiteGroup::get();
        $optionsSiteGroup = [];
        foreach ($siteGroups as $value) {
            $optionsSiteGroup[] = ['id' => $value->id, 'value' => $value->name];
        }

        $this->fields = new HelperForm();
        $this->fields->add('id', FieldForm::number(), ['primarykey' => true]);
        $this->fields->add('name', FieldForm::text(), ['label' => 'Nombre', 'required' => true]);
        $this->fields->add('color', FieldForm::text(), ['label' => 'color']);
        $this->fields->add('site_group_id', FieldForm::select(), ['label' => 'Site Group',
        'options' => $optionsSiteGroup]);
        $this->fields->add('active', FieldForm::checkbox(), ['label' => 'Estado']);

        return parent::getFieldsForm();
    }

    /**
     * Devuelve los campos que se van a renderizar en las columnas de la tabla
     *
     * @return json
     */
    public function getFieldsList()
    {
        $this->fields = new HelperList();
        $this->fields->add('id', ColumnList::number());
        $this->fields->add('name', ColumnList::text(), ['label' => 'Nombre']);
        $this->fields->add('site_group_id', ColumnList::text(), ['label' => 'Formato de fecha (completo)']);
        $this->fields->add('active', ColumnList::boolean(), ['label' => 'Estado']);
        $this->fields->add('created_at', ColumnList::datetime(), ['label' => 'Creado']);
        $this->fields->add('updated_at', ColumnList::datetime(), ['label' => 'Actualizado']);

        return parent::getFieldsList();
    }
}
