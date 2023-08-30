<?php

namespace App\Http\Controllers\Admin;

use App\Models\Site;
use Illuminate\Http\Request;
use App\Helpers\Form\FormFields;
use App\Helpers\Form\Type\NumberType;
use App\Helpers\Form\Type\SelectType;
use App\Helpers\Form\Type\TextType;
use App\Helpers\Form\Type\CheckboxType;
use App\Helpers\List\ListFields;
use App\Helpers\List\Type\DateTimeColumn;
use App\Helpers\List\Type\NumberColumn;
use App\Helpers\List\Type\TextColumn;
use App\Helpers\List\Type\BooleanColumn;
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

        $this->fields = new FormFields();
        $this->fields->add('id', NumberType::class, ['primarykey' => true]);
        $this->fields->add('name', TextType::class, ['label' => 'Nombre', 'required' => true]);
        $this->fields->add('color', TextType::class, ['label' => 'color']);
        $this->fields->add('site_group_id', SelectType::class, ['label' => 'Site Group',
        'options' => $optionsSiteGroup]);
        $this->fields->add('active', CheckboxType::class, ['label' => 'Estado']);
        $fields = $this->fields->getFields();

        return parent::getFieldsForm();
    }

    /**
     * Devuelve los campos que se van a renderizar en las columnas de la tabla
     *
     * @return json
     */
    public function getFieldsList()
    {
        $this->fields = new ListFields();
        $this->fields->add('id', NumberColumn::class);
        $this->fields->add('name', TextColumn::class, ['label' => 'Nombre']);
        $this->fields->add('site_group_id', TextColumn::class, ['label' => 'Formato de fecha (completo)']);
        $this->fields->add('active', BooleanColumn::class, ['label' => 'Estado']);
        $this->fields->add('created_at', DateTimeColumn::class, ['label' => 'Creado']);
        $this->fields->add('updated_at', DateTimeColumn::class, ['label' => 'Actualizado']);

        return parent::getFieldsList();
    }
}
