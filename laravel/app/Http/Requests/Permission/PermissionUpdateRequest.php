<?php

namespace App\Http\Requests\Permission;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PermissionUpdateRequest extends FormRequest
{
    /**
     * Determine if the role is authorized to make this request.
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
            'name' => ['required', 'string', 'max:125', Rule::unique('permissions')->ignore($this->permission->id)],
            'description' => ['required', Rule::unique('permissions')->ignore($this->permission->id)]
        ];
    }
}
