<?php

namespace App\Http\Requests\Lang;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLangRequest extends FormRequest
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
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        if ($this->input('image') === 'null') {
            $this->merge(['image' => null]);
        }

        $activeValue = $this->input('active');
        if ($activeValue === "true" || $activeValue === 'false') {
            $this->merge(["active" => $activeValue === "true" ? 1 : 0]);
        }

        $isRtlValue = $this->input('is_rtl');
        if ($isRtlValue === "true" || $isRtlValue === 'false') {
            $this->merge(["is_rtl" => $isRtlValue === "true" ? 1 : 0]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'sometimes|string|max:32',
            'image' => ['sometimes', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'active' => 'sometimes|boolean',
            'iso_code' => 'sometimes|string|max:2',
            'language_code' => 'sometimes|string|max:5',
            'locale' => 'sometimes|string|max:5',
            'date_format_lite' => 'sometimes|string|max:32',
            'date_format_full' => 'sometimes|string|max:32',
            'is_rtl' => 'sometimes|boolean',
            'sites' => 'sometimes|array',
            'sites.*' => 'sometimes|exists:sites,id',
        ];
    }
}
