<?php

namespace App\Http\Requests\SiteGroup;

use Illuminate\Foundation\Http\FormRequest;

class SiteGroupStoreRequest extends FormRequest
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
            'name' => 'required|string|max:64',
            'color' => 'required|string|max:50',
            'share_customer' => 'required|boolean',
            'share_order' => 'required|boolean',
            'share_stock' => 'required|boolean',
            'active' => 'required|boolean',
        ];
    }
}
