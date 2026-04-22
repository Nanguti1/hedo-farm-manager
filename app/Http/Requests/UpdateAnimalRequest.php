<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnimalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit animals');
    }

    public function rules(): array
    {
        return [
            'tag_number' => 'sometimes|string|unique:animals,tag_number,'.$this->animal->id,
            'name' => 'nullable|string|max:255',
            'breed_id' => 'sometimes|exists:animal_breeds,id',
            'category_id' => 'sometimes|exists:animal_categories,id',
            'gender' => 'sometimes|in:male,female',
            'birth_date' => 'sometimes|date',
            'purchase_date' => 'nullable|date',
            'status' => 'sometimes|in:active,sold,dead',
            'weight' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ];
    }
}
