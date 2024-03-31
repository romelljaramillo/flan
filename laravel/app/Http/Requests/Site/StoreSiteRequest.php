<?php

namespace App\Http\Requests\Site;

use Illuminate\Foundation\Http\FormRequest;

class StoreSiteRequest extends FormRequest
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
            'site_group_id' => 'required|integer',
            'name' => 'required|string|max:64',
            'color' => 'required|string|max:50',
            'category_id' => 'required|integer',
            'theme_name' => 'required|string|max:255',
            'active' => 'required|boolean',
        ];
    }
}
