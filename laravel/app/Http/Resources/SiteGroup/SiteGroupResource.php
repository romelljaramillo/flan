<?php

namespace App\Http\Resources\SiteGroup;

use Illuminate\Http\Resources\Json\JsonResource;

class SiteGroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'type' => 'sitegroups',
            'id' => (string) $this->resource->id,
            'attribute' => [
                'id' => $this->resource->id,
                'name' => $this->resource->name,
                'color' => $this->resource->color,
                'share_customer' => $this->resource->share_customer,
                'share_order' => $this->resource->share_order,
                'share_stock' => $this->resource->share_stock,
                'active' => $this->resource->active,
                'created_at' => $this->resource->created_at,
                'updated_at' => $this->resource->updated_at,
                'deleted_at' => $this->resource->deleted_at,
            ],
            'links' => [
                'self' => route('sitegroups.show', $this->resource),
            ],
        ];
    }
}
