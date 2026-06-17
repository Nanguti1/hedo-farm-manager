<?php

namespace App\Actions;

use App\Models\Planting;
use Illuminate\Support\Facades\Validator;

class CreatePlanting
{
    public function execute(int $farmId, array $data): Planting
    {
        Validator::make($data, [
            'crop_id' => 'required|exists:crops,id',
            'grow_location_id' => 'required|exists:grow_locations,id',
            'variety' => 'nullable|string|max:255',
            'season' => 'required|string|max:255',
            'status' => 'required|in:planned,seeded,transplanted,growing,harvested,failed',
            'seed_start_date' => 'nullable|date',
            'transplant_date' => 'nullable|date',
            'direct_seed_date' => 'nullable|date',
            'expected_harvest_date' => 'nullable|date',
            'number_of_plants' => 'nullable|integer|min:0',
            'number_of_rows' => 'nullable|integer|min:0',
            'area_occupied' => 'nullable|numeric|min:0',
            'area_unit' => 'nullable|string|max:50',
            'succession_number' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ])->validate();

        return Planting::create([
            'farm_id' => $farmId,
            'crop_id' => $data['crop_id'],
            'grow_location_id' => $data['grow_location_id'],
            'variety' => $data['variety'] ?? null,
            'season' => $data['season'],
            'status' => $data['status'],
            'seed_start_date' => $data['seed_start_date'] ?? null,
            'transplant_date' => $data['transplant_date'] ?? null,
            'direct_seed_date' => $data['direct_seed_date'] ?? null,
            'expected_harvest_date' => $data['expected_harvest_date'] ?? null,
            'number_of_plants' => $data['number_of_plants'] ?? null,
            'number_of_rows' => $data['number_of_rows'] ?? null,
            'area_occupied' => $data['area_occupied'] ?? null,
            'area_unit' => $data['area_unit'] ?? null,
            'succession_number' => $data['succession_number'],
            'notes' => $data['notes'] ?? null,
        ]);
    }
}
