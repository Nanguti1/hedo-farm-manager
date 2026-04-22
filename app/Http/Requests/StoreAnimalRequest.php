<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnimalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create animals');
    }

    public function rules(): array
    {
        return [
            'tag_number' => 'required|string|unique:animals,tag_number',
            'name' => 'nullable|string|max:255',
            'breed_id' => 'required|exists:animal_breeds,id',
            'category_id' => 'required|exists:animal_categories,id',
            'gender' => 'required|in:male,female',
            'birth_date' => 'required|date',
            'purchase_date' => 'nullable|date',
            'status' => 'required|in:active,sold,dead',
            'weight' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ];
    }
}
