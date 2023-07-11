<?php

namespace App\Http\Requests\SiteGroup;

use Illuminate\Foundation\Http\FormRequest;

class SiteGroupUpdateRequest extends FormRequest
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
            'name' => 'string|max:64',
            'color' => 'string|max:50',
            'share_customer' => 'boolean',
            'share_order' => 'boolean',
            'share_stock' => 'boolean',
            'active' => 'boolean',
        ];
    }
}
