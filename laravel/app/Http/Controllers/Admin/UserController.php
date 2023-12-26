<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use App\Helpers\Form\FormFields;
use App\Helpers\Form\Type\CheckboxType;
use App\Helpers\Form\Type\EmailType;
use App\Helpers\Form\Type\ImageType;
use App\Helpers\Form\Type\NumberType;
use App\Helpers\Form\Type\PasswordType;
use App\Helpers\Form\Type\TextType;
use App\Helpers\Form\Type\SelectType;

use App\Helpers\List\HelperList;
use App\Facades\ColumnList;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;


class UserController extends AdminController
{
    protected $diskAvatar = 'avatar';

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

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $filename = $this->saveAvatar($avatar);
            $validatedData['profile_avatar'] = $filename;
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

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');

            $filename = $this->saveAvatar($avatar);

            if ($user->profile_avatar) {
                $this->deleteAvatar($user->profile_avatar);
            }
            
            $validatedData['profile_avatar'] = $filename;
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
    public function getFieldsForm()
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
        
        $this->fields->add('avatar', ImageType::class, ['label' => 'Imagen Avatar']);

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
        $this->fields->add('avatar', ColumnList::ImageColumn(), ['label' => 'Avatar']);
        $this->fields->add('name', ColumnList::TextColumn(), ['label' => 'Usuario']);
        $this->fields->add('first_name', ColumnList::TextColumn(), ['label' => 'Nombre']);
        $this->fields->add('last_name', ColumnList::TextColumn(), ['label' => 'Apellidos']);
        $this->fields->add('email', ColumnList::TextColumn(), ['label' => 'Email']);
        $this->fields->add('active',ColumnList::BooleanColumn(), ['label' => 'Activo']);
        $this->fields->add('created_at', ColumnList::DateTimeColumn(), ['label' => 'Create']);

        return parent::getFieldsList();
    }

    /**
     * Guarda la imagen del avatar
     * 
     * @param string $avatar
     * @return string $path
     */
    public function saveAvatar($avatar, $width = 200, $height = 200)
    {
        
        if (!$avatar || $avatar->extension() === null) {
            return false;
        }

        $image = Image::make($avatar);

        $image->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });

        $resizedContent = $image->stream()->detach();

        $filename = time() . '.' . $avatar->extension();

        Storage::disk($this->diskAvatar)->put($filename, $resizedContent);
        
        return $filename;

    }

    /**
     * Devuelve la url de imagen del avatar
     * 
     * @param string $filename
     * @return string $path
     */
    public function getAvatar(string $filename): string
    {
        if (!Storage::disk($this->diskAvatar)->exists($filename)) {
            return Storage::disk('images')->url('avatar.png');
        } 
            
        return Storage::disk($this->diskAvatar)->url($filename);
    }

    /**
     * Elimina la imagen del avatar
     * 
     * @param string $filename
     * @return bool
     */
    public function deleteAvatar($filename): bool
    {
        return Storage::disk($this->diskAvatar)->delete($filename);
    }
}
