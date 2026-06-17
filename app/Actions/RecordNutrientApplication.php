<?php

namespace App\Actions;

use App\Models\NutrientApplication;
use App\Models\Planting;
use Illuminate\Support\Facades\Validator;

class RecordNutrientApplication
{
    public function execute(Planting $planting, array $data): NutrientApplication
    {
        Validator::make($data, [
            'fertilizer_type' => 'required|string|max:255',
            'is_organic' => 'required|boolean',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'application_method' => 'nullable|string|max:255',
            'application_date' => 'required|date',
            'cost' => 'nullable|numeric|min:0',
            'applicator' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ])->validate();

        return NutrientApplication::create([
            'farm_id' => $planting->farm_id,
            'grow_location_id' => $planting->grow_location_id,
            'planting_id' => $planting->id,
            'fertilizer_type' => $data['fertilizer_type'],
            'is_organic' => $data['is_organic'],
            'quantity' => $data['quantity'],
            'unit' => $data['unit'],
            'application_method' => $data['application_method'] ?? null,
            'application_date' => $data['application_date'],
            'cost' => $data['cost'] ?? null,
            'applicator' => $data['applicator'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]);
    }
}
