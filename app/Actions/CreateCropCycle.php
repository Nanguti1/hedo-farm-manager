<?php

namespace App\Actions;

use App\Exceptions\InvalidCropCycleTransitionException;
use App\Models\CropCycle;
use Illuminate\Support\Facades\Validator;

class CreateCropCycle
{
    public function execute(int $farmId, array $data): CropCycle
    {
        Validator::make($data, [
            'field_id' => 'required|exists:fields,id',
            'crop_id' => 'required|exists:crops,id',
            'planting_date' => 'required|date',
            'expected_harvest_date' => 'required|date|after:planting_date',
            'status' => 'required|in:planted,growing,harvested',
        ])->validate();

        return CropCycle::create([
            'farm_id' => $farmId,
            'field_id' => $data['field_id'],
            'crop_id' => $data['crop_id'],
            'planting_date' => $data['planting_date'],
            'expected_harvest_date' => $data['expected_harvest_date'],
            'status' => $data['status'],
        ]);
    }
}
