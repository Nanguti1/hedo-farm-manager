<?php

namespace App\Actions;

use App\Exceptions\DuplicateTagNumberException;
use App\Models\Animal;
use Illuminate\Support\Facades\Validator;

class CreateAnimal
{
    public function execute(int $farmId, array $data): Animal
    {
        Validator::make($data, [
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
        ])->validate();

        if (Animal::where('tag_number', $data['tag_number'])->exists()) {
            throw new DuplicateTagNumberException('An animal with this tag number already exists.');
        }

        return Animal::create([
            'farm_id' => $farmId,
            'tag_number' => $data['tag_number'],
            'name' => $data['name'] ?? null,
            'breed_id' => $data['breed_id'],
            'category_id' => $data['category_id'],
            'gender' => $data['gender'],
            'birth_date' => $data['birth_date'],
            'purchase_date' => $data['purchase_date'] ?? null,
            'status' => $data['status'],
            'weight' => $data['weight'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]);
    }
}
