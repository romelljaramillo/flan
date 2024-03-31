<?php

namespace App\Http\Requests\Site;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteRequest extends FormRequest
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
            'site_group_id' => 'sometimes|required|integer',
            'name' => 'sometimes|required|string|max:64',
            'color' => 'sometimes|required|string|max:50',
            'category_id' => 'sometimes|required|integer',
            'theme_name' => 'sometimes|required|string|max:255',
            'active' => 'sometimes|required|boolean',
        ];
    }
}
