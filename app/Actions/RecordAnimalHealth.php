<?php

namespace App\Actions;

use App\Models\Animal;
use App\Models\AnimalHealthRecord;
use Illuminate\Support\Facades\Validator;

class RecordAnimalHealth
{
    public function execute(Animal $animal, array $data): AnimalHealthRecord
    {
        Validator::make($data, [
            'record_type' => 'required|string|max:255',
            'description' => 'required|string',
            'treatment_date' => 'required|date',
            'next_due_date' => 'nullable|date',
            'cost' => 'nullable|numeric|min:0',
        ])->validate();

        return AnimalHealthRecord::create([
            'animal_id' => $animal->id,
            'farm_id' => $animal->farm_id,
            'record_type' => $data['record_type'],
            'description' => $data['description'],
            'treatment_date' => $data['treatment_date'],
            'next_due_date' => $data['next_due_date'] ?? null,
            'cost' => $data['cost'] ?? null,
        ]);
    }
}
