<?php

namespace App\Actions;

use App\Models\Farm;
use Illuminate\Support\Facades\Validator;

class UpdateFarm
{
    public function execute(Farm $farm, array $data): Farm
    {
        Validator::make($data, [
            'name' => 'sometimes|string|max:255',
            'location' => 'sometimes|string|max:255',
            'size' => 'sometimes|numeric|min:0',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ])->validate();

        $farm->update(array_filter([
            'name' => $data['name'] ?? null,
            'location' => $data['location'] ?? null,
            'size' => $data['size'] ?? null,
            'description' => $data['description'] ?? null,
            'is_active' => $data['is_active'] ?? null,
        ]));

        return $farm->fresh();
    }
}
