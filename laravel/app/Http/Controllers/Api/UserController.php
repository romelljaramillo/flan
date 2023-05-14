<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Helpers\Form\FormFields;
use App\Helpers\Form\Type\CheckboxType;
use App\Helpers\Form\Type\EmailType;
use App\Helpers\Form\Type\ImageType;
use App\Helpers\Form\Type\NumberType;
use App\Helpers\Form\Type\PasswordType;
use App\Helpers\Form\Type\TextType;
use App\Helpers\Form\Type\SelectType;
use App\Helpers\List\ListFields;
use App\Helpers\List\Type\BooleanColumn;
use App\Helpers\List\Type\DateTimeColumn;
use App\Helpers\List\Type\ImageColumn;
use App\Helpers\List\Type\NumberColumn;
use App\Helpers\List\Type\TextColumn;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends ApiController
{

    public function __construct()
    {
        $this->imagesDir = 'users';
    }

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

            $users = User::filterAdvance($fields)->orderBy($column, $orderBy)->paginate($perPage);

            return UserCollection::make($users);
        }

        $users = User::filter($filter)->orderBy($column, $orderBy)->paginate($perPage);

        return UserCollection::make($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $filename = $this->saveImage($image);
            $validatedData['profile_photo_path'] = $filename;
        }

        $user = User::create($validatedData);

        $roles = explode(',', $request->roles);
        $roles = Role::whereIn('id', $roles)->pluck('id', 'id');
        $user->syncRoles($roles);
        
        return UserResource::make($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return UserResource::make($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $filename = $this->saveImage($image);
            $validatedData['profile_photo_path'] = $filename;
        }

        $user->update(['active' => (int) $request->active]);
        $user->update($validatedData);

        $roles = explode(',', $request->roles);
        $roles = Role::whereIn('id', $roles)->pluck('id', 'id');
        $user->syncRoles($roles);

        return UserResource::make($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $data = $user;
        $user->delete();
        return $this->sendResponse($data, 'Eliminado');
    }

    public function restore(User $user)
    {
        return $this->sendResponse($user, 'Eliminado');
    }

    /**
     * Devuelve los campos que se van a renderizar en el formulario
     *
     * @return void
     */
    public function getFormFields()
    {
        $roles = Role::get();
        $optionsRoles = [];
        foreach ($roles as $value) {
            $optionsRoles[] = ['id' => $value->id, 'value' => $value->name];
        }

        $this->fields = new FormFields();
        $this->fields->add('id', NumberType::class, ['primarykey' => true]);
        $this->fields->add('name', TextType::class, ['label' => 'Nombre usuario', 'required' => true]);
        $this->fields->add('first_name', TextType::class, ['label' => 'Nombre', 'required' => true]);
        $this->fields->add('last_name', TextType::class, ['label' => 'Apellidos', 'required' => true]);
        $this->fields->add('email', EmailType::class, ['label' => 'Email', 'required' => true]);
        $this->fields->add('password', PasswordType::class, ['label' => 'Contraseña']);
        $this->fields->add('active', CheckboxType::class, ['label' => 'Activar']);

        if (Auth::user()->hasRole(['superadmin'])) {
            $this->fields->add('roles', SelectType::class, ['label' => 'Roles',
            'multiple' => true, 'options' => $optionsRoles]);
        }
        
        $this->fields->add('photo', ImageType::class, ['label' => 'Imagen Avatar']);

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
        $this->fields->add('photo', ImageColumn::class, ['label' => 'Avatar']);
        $this->fields->add('name', TextColumn::class, ['label' => 'Nombre']);
        $this->fields->add('fullname', TextColumn::class, ['label' => 'Full name', 'orderby' => false]);
        $this->fields->add('email', TextColumn::class, ['label' => 'Email']);
        $this->fields->add('active', BooleanColumn::class, ['label' => 'Activo']);
        $this->fields->add('created_at', DateTimeColumn::class, ['label' => 'Create']);

        $fields = $this->fields->getFields();

        return $this->sendResponse(['fields' => $fields], 'Fields list users');
    }
}
