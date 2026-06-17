<?php

namespace App\Actions;

use App\Models\GrowLocation;
use Illuminate\Support\Facades\Validator;

class CreateGrowLocation
{
    public function execute(int $farmId, array $data): GrowLocation
    {
        Validator::make($data, [
            'name' => 'required|string|max:255',
            'type' => 'required|in:field,greenhouse,nursery,orchard,container,bed,row',
            'parent_id' => 'nullable|exists:grow_locations,id',
            'area_size' => 'nullable|numeric|min:0',
            'area_unit' => 'nullable|string|max:50',
            'gps_coordinates' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive,maintenance',
            'description' => 'nullable|string',
        ])->validate();

        return GrowLocation::create([
            'farm_id' => $farmId,
            'name' => $data['name'],
            'type' => $data['type'],
            'parent_id' => $data['parent_id'] ?? null,
            'area_size' => $data['area_size'] ?? null,
            'area_unit' => $data['area_unit'] ?? null,
            'gps_coordinates' => $data['gps_coordinates'] ?? null,
            'status' => $data['status'],
            'description' => $data['description'] ?? null,
        ]);
    }
}
