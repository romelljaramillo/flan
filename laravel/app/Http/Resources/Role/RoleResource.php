<?php

namespace App\Http\Resources\Role;

use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $permissions = $this->resource->permissions->mapWithKeys(function ($item, $key) {
            $permi[$key] = ['id' => $item['id'], 'name' => $item['description']];
            return $permi;
        });

        return [
            'type' => 'roles',
            'id' => (string) $this->resource->id,
            'attribute' => [
                'id' => (string) $this->resource->id,
                'name' => $this->resource->name,
                'guard_name' => $this->resource->guard_name,
                'permissions' => $permissions,
                'created_at' => $this->resource->created_at,
                'updated_at' => $this->resource->updated_at,
            ],
            'links' => [
                'self' => route('admin.roles.show', $this->resource),
            ],
        ];
    }
}
