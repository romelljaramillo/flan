<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    protected $diskAvatar = 'avatar';
    protected $diskImages = 'images';
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $roles = '';
        
        /** @var User $user */
        $user = Auth::user();

        if ($user->hasRole('superadmin')) {
            $roles = $this->resource->roles->mapWithKeys(function ($item, $key) {
                $permi[$key] = ['id' => $item['id'], 'value' => $item['name']];
                return $permi;
            });
        }
        
        return [
            'type' => 'users',
            'id' => (string) $this->resource->id,
            'attribute' => [
                'id' => (string) $this->resource->id,
                'fullname' => $this->resource->fullname,
                'first_name' => $this->resource->first_name,
                'last_name' => $this->resource->last_name,
                'name' => $this->resource->name,
                'email' => $this->resource->email,
                'email_verified' => $this->resource->email_verified_at,
                'two_factor_confirmed' => $this->resource->two_factor_confirmed_at,
                'current_team_id' => $this->resource->current_team_id,
                'avatar' => $this->getAvatarAttribute($this->resource->avatar),
                'active' => $this->resource->active,
                'roles' => $roles,
                'created_at' => $this->resource->created_at,
                'updated_at' => $this->resource->updated_at,
                'deleted_at' => $this->resource->deleted_at,
            ],
            'links' => [
                'self' => route('admin.users.show', $this->resource),
            ],
        ];
    }

    /**
     * Obtiene la url del avatar del usuario
     *
     * @return string
     */
    public function getAvatarAttribute($avatar): string
    {
        if (!$avatar || !Storage::disk($this->diskAvatar)->exists($avatar)) {
            return Storage::disk($this->diskImages)->url('avatar.png');
        } 

        return Storage::disk($this->diskAvatar)->url($avatar);
    }
}
