<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use App\Helpers\Form\FormFields;
use App\Helpers\Form\Type\CheckboxType;
use App\Helpers\Form\Type\SwitchType;
use App\Helpers\Form\Type\RadioType;
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
use App\Http\Controllers\Admin\AdminController;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse;

class UserController extends AdminController
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->setFilter($request);

        $users = ($this->filterFields) ?
            User::filterAdvance($this->filterFields)->orderBy($this->column, $this->orderBy)->paginate($this->perPage) :
            User::filter($this->filter)->orderBy($this->column, $this->orderBy)->paginate($this->perPage);

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
        $request->active = $request->active === 'true'? 1: 0;

        $validatedData = $request->validated();

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $filename = $this->saveImage($image);
            $validatedData['profile_photo_path'] = $filename;
        }

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
        return ApiResponse::success($data, 'Eliminado');
    }

    public function restore(User $user)
    {
        return ApiResponse::success($user, 'Eliminado');
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
            $optionsRoles[] = ['id' => $value->id, 'name' => $value->name];
        }

        $this->fields = new FormFields();
        $this->fields->add('id', NumberType::class, ['primarykey' => true]);
        $this->fields->add('name', TextType::class, ['label' => 'Nombre usuario', 'required' => true]);
        $this->fields->add('first_name', TextType::class, ['label' => 'Nombre', 'required' => true]);
        $this->fields->add('last_name', TextType::class, ['label' => 'Apellidos', 'required' => true]);
        $this->fields->add('email', EmailType::class, ['label' => 'Email', 'required' => true]);
        $this->fields->add('password', PasswordType::class, ['label' => 'Contraseña']);
        $this->fields->add('active', CheckboxType::class, ['label' => 'Activar']);

        /** @var User $user */
        $user = Auth::user();

        if ($user->hasRole(['superadmin'])) {
            $this->fields->add('roles', SelectType::class, [
                'label' => 'Roles',
                'multiple' => true, 
                'options' => $optionsRoles
            ]);
        }
        
        $this->fields->add('photo', ImageType::class, ['label' => 'Imagen Avatar']);

        return parent::getFormFields();

        $fields = $this->fields->getFields();

        return ApiResponse::success(['fields' => $fields], 'Fields form users');
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
        $this->fields->add('name', TextColumn::class, ['label' => 'Usuario']);
        // $this->fields->add('fullname', TextColumn::class, ['label' => 'Full name', 'orderby' => false]);
        $this->fields->add('first_name', TextColumn::class, ['label' => 'Nombre']);
        $this->fields->add('last_name', TextColumn::class, ['label' => 'Apellidos']);
        $this->fields->add('email', TextColumn::class, ['label' => 'Email']);
        $this->fields->add('active', BooleanColumn::class, ['label' => 'Activo']);
        $this->fields->add('created_at', DateTimeColumn::class, ['label' => 'Create']);

        return parent::getListFields();

        $fields = $this->fields->getFields();

        return ApiResponse::success(['fields' => $fields], 'Fields list users');
    }
}
