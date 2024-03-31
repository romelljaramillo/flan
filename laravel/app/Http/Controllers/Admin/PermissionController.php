<?php

namespace App\Http\Controllers\Admin;

use App\Facades\ColumnList;
use App\Facades\FieldForm;
use App\Helpers\ApiResponse;
use App\Helpers\Form\HelperForm;
use App\Helpers\List\HelperList;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;
use App\Http\Resources\Permission\PermissionCollection;
use App\Http\Resources\Permission\PermissionResource;
use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends AdminController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->setFilter($request);

        $permissions = ($this->filterFields) ?
        Permission::filterAdvance($this->filterFields)->orderBy($this->column, $this->orderBy)->paginate($this->perPage) :
        Permission::filter($this->filter)->orderBy($this->column, $this->orderBy)->paginate($this->perPage);

        return PermissionCollection::make($permissions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePermissionRequest $request)
    {
        if ($request->validated()) {
            $permission = Permission::create([
                'name' => $request->name,
                'description' => $request->description,
                'guard_name' => 'web',
            ]);

            $permissions = explode(',', $request->permissions);
            $permissions = Permission::whereIn('id', $permissions)->pluck('id', 'id');
            $permission->syncPermissions($permissions);
        }

        return PermissionResource::make($permission);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission)
    {
        return PermissionResource::make($permission);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatPermissionRequest  $request
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $permission->update($request->validated());
        $permissions = explode(',', $request->permissions);
        $permissions = Permission::whereIn('id', $permissions)->pluck('id', 'id');
        $permission->syncPermissions($permissions);

        return PermissionResource::make($permission);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        $data = $permission;
        $permission->delete();
        return ApiResponse::success($data, 'Eliminado');
    }

    /**
     * Devuelve los campos que se van a renderizar en el formulario
     *
     * @return void
     */
    public function getFieldsForm()
    {
        $permissions = Permission::get();
        $optionsPermissions = [];
        foreach ($permissions as $value) {
            $optionsPermissions[] = ['id' => $value->id, 'name' => $value->description];
        }

        $this->fields = new HelperForm();
        $this->fields->add('id', FieldForm::number(), ['primarykey' => true]);
        $this->fields->add('name', FieldForm::text(), ['label' => 'Name', 'required' => true]);
        $this->fields->add('description', FieldForm::text(), ['label' => 'Description', 'required' => true]);

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
        $this->fields->add('description', ColumnList::text(), ['label' => 'Description']);
        $this->fields->add('guard_name', ColumnList::text(), ['label' => 'Guard']);
        $this->fields->add('created_at', ColumnList::datetime(), ['label' => 'Creado']);
        $this->fields->add('updated_at', ColumnList::datetime(), ['label' => 'Actualizado']);

        return parent::getFieldsList();
    }

}
