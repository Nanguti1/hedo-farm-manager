<?php

namespace App\Actions;

use App\Models\CropCycle;
use App\Models\YieldRecord;
use Illuminate\Support\Facades\Validator;

class RecordYield
{
    public function execute(CropCycle $cycle, array $data): YieldRecord
    {
        Validator::make($data, [
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'harvest_date' => 'required|date',
            'quality_grade' => 'nullable|string|max:50',
        ])->validate();

        return YieldRecord::create([
            'crop_cycle_id' => $cycle->id,
            'quantity' => $data['quantity'],
            'unit' => $data['unit'],
            'harvest_date' => $data['harvest_date'],
            'quality_grade' => $data['quality_grade'] ?? null,
        ]);
    }
}
