<?php

namespace App\Actions;

use App\Models\Animal;
use Illuminate\Support\Facades\Validator;

class UpdateAnimal
{
    public function execute(Animal $animal, array $data): Animal
    {
        Validator::make($data, [
            'tag_number' => 'sometimes|string|unique:animals,tag_number,'.$animal->id,
            'name' => 'nullable|string|max:255',
            'breed_id' => 'sometimes|exists:animal_breeds,id',
            'category_id' => 'sometimes|exists:animal_categories,id',
            'gender' => 'sometimes|in:male,female',
            'birth_date' => 'sometimes|date',
            'purchase_date' => 'nullable|date',
            'status' => 'sometimes|in:active,sold,dead',
            'weight' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ])->validate();

        $animal->update(array_filter([
            'tag_number' => $data['tag_number'] ?? null,
            'name' => $data['name'] ?? null,
            'breed_id' => $data['breed_id'] ?? null,
            'category_id' => $data['category_id'] ?? null,
            'gender' => $data['gender'] ?? null,
            'birth_date' => $data['birth_date'] ?? null,
            'purchase_date' => $data['purchase_date'] ?? null,
            'status' => $data['status'] ?? null,
            'weight' => $data['weight'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]));

        return $animal->fresh();
    }
}
