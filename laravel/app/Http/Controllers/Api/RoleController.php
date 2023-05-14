<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Helpers\Form\FormFields;
use App\Helpers\Form\Type\NumberType;
use App\Helpers\Form\Type\SelectType;
use App\Helpers\Form\Type\TextType;
use App\Helpers\List\ListFields;
use App\Helpers\List\Type\DateTimeColumn;
use App\Helpers\List\Type\NumberColumn;
use App\Helpers\List\Type\TextColumn;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Http\Resources\Role\RoleCollection;
use App\Http\Resources\Role\RoleResource;
use Spatie\Permission\Models\Permission;

class RoleController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = (isset($request->perPage)) ? (int) $request->perPage : 10;
        $orderBy = (isset($request->orderBy)) ? $request->orderBy : 'DESC';
        $column = (isset($request->column)) ? $request->column : 'id';
        $filter = (isset($request->filter)) ? $request->filter : '';

        if ($request->filters) {
            $filters = explode("|", $request->filters);

            foreach ($filters as $values) {
                $fields[] = explode(";", $values);
            }

            $roles = Role::filterAdvance($fields)->orderBy($column, $orderBy)->paginate($perPage);
            return RoleCollection::make($roles);
        }

        $roles = Role::filter($filter)->orderBy($column, $orderBy)->paginate($perPage);

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
        return $this->sendResponse($data, 'Eliminado');
    }

    /**
     * Devuelve los campos que se van a renderizar en el formulario
     *
     * @return void
     */
    public function getFormFields()
    {
        $permissions = Permission::get();
        $optionsPermissions = [];
        foreach ($permissions as $value) {
            $optionsPermissions[] = ['id' => $value->id, 'value' => $value->description];
        }

        $this->fields = new FormFields();
        $this->fields->add('id', NumberType::class, ['primarykey' => true]);
        $this->fields->add('name', TextType::class, ['label' => 'Nombre', 'required' => true]);
        $this->fields->add('permissions', SelectType::class, ['label' => 'Permissions',
            'multiple' => true, 'options' => $optionsPermissions]);
        $fields = $this->fields->getFields();

        return $this->sendResponse(['fields' => $fields], 'Fields form users');
    }

    /**
     * Devuelve los campos que se van a renderizar en las columnas de la tabla
     *
     * @return void
     */
    public function getListFields()
    {
        $this->fields = new ListFields();
        $this->fields->add('id', NumberColumn::class);
        $this->fields->add('name', TextColumn::class, ['label' => 'Nombre']);
        $this->fields->add('guard_name', TextColumn::class, ['label' => 'Guard']);
        $this->fields->add('created_at', DateTimeColumn::class, ['label' => 'Creado']);
        $this->fields->add('updated_at', DateTimeColumn::class, ['label' => 'Actualizado']);

        $fields = $this->fields->getFields();

        return $this->sendResponse(['fields' => $fields], 'Fields list roles');
    }
}
