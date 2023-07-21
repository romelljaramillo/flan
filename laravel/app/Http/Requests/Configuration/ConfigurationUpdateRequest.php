<?php

namespace App\Http\Requests\Configuration;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ConfigurationUpdateRequest extends FormRequest
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
            'name' => 'sometimes|required|' . Rule::unique('configurations')->ignore($this->configuration->id),
            'value' => 'sometimes|nullable',
            'site_group_id' => 'sometimes|integer',
            'site_id' => 'sometimes|integer',
        ];
    }
}
