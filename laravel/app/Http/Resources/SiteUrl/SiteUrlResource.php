<?php

namespace App\Http\Resources\SiteUrl;

use Illuminate\Http\Resources\Json\JsonResource;

class SiteUrlResource extends JsonResource
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
            'type' => 'siteurls',
            'id' => (string) $this->resource->id,
            'attribute' => [
                'id' => (string) $this->resource->id,
                'site_id' => (string) $this->resource->site_id,
                'domain' => $this->resource->domain,
                'domain_ssl' => $this->resource->domain_ssl,
                'physical_uri' => $this->resource->physical_uri,
                'virtual_uri' => $this->resource->virtual_uri,
                'active' => $this->resource->active,
                'created_at' => $this->resource->created_at,
                'updated_at' => $this->resource->updated_at,
                'deleted_at' => $this->resource->deleted_at,
            ],
            'links' => [
                'self' => route('siteurls.show', $this->resource),
            ],
        ];
    }
}
