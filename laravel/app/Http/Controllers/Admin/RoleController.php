<?php

namespace App\Http\Controllers\Admin;

use App\Facades\ColumnList;
use App\Facades\FieldForm;
use App\Helpers\ApiResponse;
use App\Helpers\Form\HelperForm;
use App\Helpers\List\HelperList;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Http\Resources\Role\RoleCollection;
use App\Http\Resources\Role\RoleResource;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends AdminController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->setFilter($request);

        $roles = ($this->filterFields) ?
        Role::filterAdvance($this->filterFields)->orderBy($this->column, $this->orderBy)->paginate($this->perPage) :
        Role::filter($this->filter)->orderBy($this->column, $this->orderBy)->paginate($this->perPage);

        return RoleCollection::make($roles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRoleRequest $request)
    {
        if ($request->validated()) {
            $role = Role::create([
                'name' => $request->name,
                'guard_name' => 'web',
            ]);

            $permissions = explode(',', $request->permissions);
            $permissions = Permission::whereIn('id', $permissions)->pluck('id', 'id');
            $role->syncPermissions($permissions);
        }

        return RoleResource::make($role);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        return RoleResource::make($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatRoleRequest  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $role->update($request->validated());
        $permissions = explode(',', $request->permissions);
        $permissions = Permission::whereIn('id', $permissions)->pluck('id', 'id');
        $role->syncPermissions($permissions);

        return RoleResource::make($role);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $data = $role;
        $role->delete();
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
        $this->fields->add('name', FieldForm::text(), ['label' => 'Nombre', 'required' => true]);
        $this->fields->add('permissions', FieldForm::checkbox(), ['label' => 'Permissions',
            'options' => $optionsPermissions, 'multiple' => true]);

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
        $this->fields->add('guard_name', ColumnList::text(), ['label' => 'Guard']);
        $this->fields->add('created_at', ColumnList::datetime(), ['label' => 'Creado']);
        $this->fields->add('updated_at', ColumnList::datetime(), ['label' => 'Actualizado']);

        return parent::getFieldsList();
    }
}
