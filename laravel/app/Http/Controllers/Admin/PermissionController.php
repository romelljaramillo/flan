<?php

namespace App\Http\Controllers\Admin;

use App\Models\Permission;
use Illuminate\Http\Request;
use App\Helpers\Form\FormFields;
use App\Helpers\Form\Type\NumberType;
use App\Helpers\Form\Type\SelectType;
use App\Helpers\Form\Type\TextType;
use App\Helpers\List\ListFields;
use App\Helpers\List\Type\DateTimeColumn;
use App\Helpers\List\Type\NumberColumn;
use App\Helpers\List\Type\TextColumn;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Requests\Permission\PermissionStoreRequest;
use App\Http\Requests\Permission\PermissionUpdateRequest;
use App\Http\Resources\Permission\PermissionCollection;
use App\Http\Resources\Permission\PermissionResource;

use Illuminate\Support\Facades\Route;

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
    public function store(PermissionStoreRequest $request)
    {
        if ($request->validated()) {
            $permission = Permission::create([
                'name' => $request->name,
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
    public function update(PermissionUpdateRequest $request, Permission $permission)
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

        return $this->sendResponse(['fields' => $this->fields->getFields()], 'Fields form users');
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
        $this->fields->add('description', TextColumn::class, ['label' => 'Description']);
        $this->fields->add('guard_name', TextColumn::class, ['label' => 'Guard']);
        $this->fields->add('created_at', DateTimeColumn::class, ['label' => 'Creado']);
        $this->fields->add('updated_at', DateTimeColumn::class, ['label' => 'Actualizado']);

        $fields = $this->fields->getFields();

        return $this->sendResponse(['fields' => $fields], 'Fields list permissions');
    }


    
}
