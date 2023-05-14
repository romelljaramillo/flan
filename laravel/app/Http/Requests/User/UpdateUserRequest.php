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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $maxString = 'max:150';
        return [
            'name' => ['required', 'string', $maxString, Rule::unique('users')->ignore($this->user->id)],
            'first_name' => ['required', 'string', $maxString],
            'last_name' => ['required', 'string', $maxString],
            'email' => ['required', 'string', 'max:255', 'email', Rule::unique('users')->ignore($this->user->id)],
            'password' => ['nullable', Password::min(8)],
        ];
    }
}
