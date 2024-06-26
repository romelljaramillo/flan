<?php

namespace App\Http\Resources\Lang;

use Illuminate\Http\Resources\Json\JsonResource;

class LangResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $sites = $this->resource->sites->mapWithKeys(function ($item, $key) {
            $site[$key] = ['id' => $item['id'], 'value' => $item['name']];
            return $site;
        });
        
        return [
            'type' => 'langs',
            'id' => (string) $this->resource->id,
            'attribute' => [
                'id' => (string) $this->resource->id,
                'name' => $this->resource->name,
                'image' => $this->resource->image,
                'active' => $this->resource->active,
                'iso_code' => $this->resource->iso_code,
                'language_code' => $this->resource->language_code,
                'locale' => $this->resource->locale,
                'date_format_lite' => $this->resource->date_format_lite,
                'date_format_full' => $this->resource->date_format_full,
                'is_rtl' => $this->resource->is_rtl,
                'sites' => $sites ?? '',
                'created_at' => $this->resource->created_at,
                'updated_at' => $this->resource->updated_at,
            ],
            'links' => [
                'self' => route('admin.langs.show', $this->resource),
            ],
        ];
    }
}
