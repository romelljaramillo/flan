<?php

namespace App\Http\Requests\Lang;

use Illuminate\Foundation\Http\FormRequest;

class LangUpdateRequest extends FormRequest
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
            'name' => 'sometimes|required|string|max:32',
            'active' => 'sometimes|required|boolean',
            'iso_code' => 'sometimes|required|string|max:2',
            'language_code' => 'sometimes|required|string|max:5',
            'locale' => 'sometimes|required|string|max:5',
            'date_format_lite' => 'sometimes|required|string|max:32',
            'date_format_full' => 'sometimes|required|string|max:32',
            'is_rtl' => 'sometimes|required|boolean',
            'sites' => 'sometimes|required|array',
            'sites.*' => 'sometimes|exists:sites,id',
        ];
    }
}
