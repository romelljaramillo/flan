<?php

namespace App\Http\Requests\Lang;

use Illuminate\Foundation\Http\FormRequest;

class StoreLangRequest extends FormRequest
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
            'name' => 'required|string|max:32',
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'active' => 'required|boolean',
            'iso_code' => 'required|string|max:2',
            'language_code' => 'required|string|max:5',
            'locale' => 'required|string|max:5',
            'date_format_lite' => 'required|string|max:32',
            'date_format_full' => 'required|string|max:32',
            'is_rtl' => 'required|boolean',
            'sites' => 'required|array',
            'sites.*' => 'exists:sites,id',
        ];
    }
}
