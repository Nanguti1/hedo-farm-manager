<?php

namespace App\Actions;

use App\Models\Farm;
use Illuminate\Support\Facades\Validator;

class CreateFarm
{
    public function execute(array $data): Farm
    {
        Validator::make($data, [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'size' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ])->validate();

        return Farm::create([
            'name' => $data['name'],
            'location' => $data['location'],
            'size' => $data['size'],
            'description' => $data['description'] ?? null,
            'is_active' => $data['is_active'] ?? true,
        ]);
    }
}
