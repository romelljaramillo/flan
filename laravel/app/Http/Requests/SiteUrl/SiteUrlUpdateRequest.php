<?php

namespace App\Http\Requests\SiteUrl;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class SiteUrlUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'site_id' => 'sometimes|required|integer',
            'domain' => ['sometimes','required','string','max:150',Rule::unique('site_urls')->ignore($this->siteurl->id)],
            'domain_ssl' => ['sometimes','required','string','max:150',Rule::unique('site_urls')->ignore($this->siteurl->id)],
            'physical_uri' => 'sometimes|required|string|max:64',
            'virtual_uri' => 'sometimes|required|string|max:64',
            'main' => 'sometimes|required|boolean',
            'active' => 'sometimes|required|boolean',
        ];
    }
}
