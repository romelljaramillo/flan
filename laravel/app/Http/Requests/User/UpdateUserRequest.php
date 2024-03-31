<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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

    protected function prepareForValidation()
    {
        if ($this->input('avatar') === 'null') {
            $this->merge(['avatar' => null]);
        }

        $activeValue = $this->input('active');
        if ($activeValue === "true" || $activeValue === 'false') {
            $this->merge(["active" => $activeValue === "true" ? 1 : 0]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $maxString = 'max:25';

        return [
            'name' => ['sometimes', 'string', $maxString, Rule::unique('users')->ignore($this->user->id)],
            'first_name' => ['sometimes', 'string', $maxString],
            'last_name' => ['sometimes', 'string', $maxString],
            'email' => ['sometimes', 'string', 'max:255', 'email', 
                'regex:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/',
                Rule::unique('users')->ignore($this->user->id)],
            'password' => ['sometimes', Password::min(8)],
            'avatar' => ['sometimes', 'nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'active' => ['sometimes', 'boolean'],
        ];
    }
}
