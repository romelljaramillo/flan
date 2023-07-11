<?php

namespace App\Http\Requests\SiteUrl;

use Illuminate\Foundation\Http\FormRequest;

class SiteUrlStoreRequest extends FormRequest
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
            'site_id' => 'required|integer',
            'domain' => 'required|string|max:150|unique:site_urls',
            'domain_ssl' => 'required|string|max:150|unique:site_urls',
            'physical_uri' => 'required|string|max:64',
            'virtual_uri' => 'required|string|max:64',
            'main' => 'required|boolean',
            'active' => 'required|boolean',
        ];
    }
}
