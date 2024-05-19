<?php

namespace App\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoleRequest extends FormRequest
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

    protected function prepareForValidation()
    {
        $permissions = $this->input('permissions');
        if ($permissions) {
            $this->merge(['permissions' => explode(',', $permissions)]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $activeValue = $this->input('permissions');

        return [
            'name' => ['sometimes', 'string', 'max:125', Rule::unique('roles')->ignore($this->role->id)],
            'permissions' => ['sometimes', 'array'],
            'permissions.*' => 'exists:permissions,id',
        ];
    }
}
