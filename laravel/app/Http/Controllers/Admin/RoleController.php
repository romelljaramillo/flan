<?php

namespace App\Http\Controllers\Admin;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use App\Helpers\Form\FormFields;
use App\Helpers\Form\Type\NumberType;
use App\Helpers\Form\Type\CheckboxType;
use App\Helpers\Form\Type\TextType;

use App\Helpers\List\HelperList;
use App\Facades\ColumnList;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Requests\Role\RoleStoreRequest;
use App\Http\Requests\Role\RoleUpdateRequest;
use App\Http\Resources\Role\RoleCollection;
use App\Http\Resources\Role\RoleResource;
use App\Helpers\ApiResponse;

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
    public function store(RoleStoreRequest $request)
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
    public function update(RoleUpdateRequest $request, Role $role)
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

        $this->fields = new FormFields();
        $this->fields->add('id', NumberType::class, ['primarykey' => true]);
        $this->fields->add('name', TextType::class, ['label' => 'Nombre', 'required' => true]);
        $this->fields->add('permissions', CheckboxType::class, ['label' => 'Permissions',
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
        $this->fields->add('id', ColumnList::NumberColumn());
        $this->fields->add('name', ColumnList::TextColumn(), ['label' => 'Nombre']);
        $this->fields->add('guard_name', ColumnList::TextColumn(), ['label' => 'Guard']);
        $this->fields->add('created_at', ColumnList::DateTimeColumn(), ['label' => 'Creado']);
        $this->fields->add('updated_at', ColumnList::DateTimeColumn(), ['label' => 'Actualizado']);

        return parent::getFieldsList();
    }
}
