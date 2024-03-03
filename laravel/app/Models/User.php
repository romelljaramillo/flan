<?php

namespace App\Models;

use App\Traits\FilterAdvanceTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Jetstream\HasTeams;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens,
    HasFactory,
    HasProfilePhoto,
    HasRoles,
    HasTeams,
    Notifiable,
    TwoFactorAuthenticatable,
    SoftDeletes,
    FilterAdvanceTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'name',
        'email',
        'password',
        'profile_avatar',
        'active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Disk avatars storage
     *
     * @var string
     */
    protected $diskAvatar = 'avatar';
    protected $diskImages = 'images';

    /**
     * Check if the user is an admin.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->hasRole('superadmin');
    }

    /**
     * Check if the user is an admin.
     *
     * @return bool
     */
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where($field ?? 'id', $value)->withTrashed()->firstOrFail();
    }

    /**
     * Devuelve el nombre completo del usuario
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * Setea el password del usuario
     *
     * @param string $password
     * @return void
     */
    public function setPasswordAttribute($password)
    {
        if ($password) {
            $this->attributes['password'] = Hash::needsRehash($password) ? Hash::make($password) : $password;
        }
    }

    /**
     * Obtiene la url del avatar del usuario
     *
     * @return string
     */
    public function getAvatarAttribute(): string
    {
        if (!$this->profile_avatar || !Storage::disk($this->diskAvatar)->exists($this->profile_avatar)) {
            return Storage::disk($this->diskImages)->url('avatar.png');
        } 

        return Storage::disk($this->diskAvatar)->url($this->profile_avatar);
    }

    /**
     * Devuelve si el usuario es demo
     *
     * @return boolean
     */
    public function isDemoUser()
    {
        return $this->email === 'admin2@example.com';
    }
}
