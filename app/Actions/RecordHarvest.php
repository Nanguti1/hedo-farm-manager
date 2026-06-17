<?php

namespace App\Actions;

use App\Models\Harvest;
use App\Models\Planting;
use Illuminate\Support\Facades\Validator;

class RecordHarvest
{
    public function execute(Planting $planting, array $data): Harvest
    {
        Validator::make($data, [
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'quality_grade' => 'nullable|string|max:50',
            'market_destination' => 'nullable|string|max:255',
            'harvest_date' => 'required|date',
            'notes' => 'nullable|string',
        ])->validate();

        $harvest = Harvest::create([
            'farm_id' => $planting->farm_id,
            'planting_id' => $planting->id,
            'crop_id' => $planting->crop_id,
            'quantity' => $data['quantity'],
            'unit' => $data['unit'],
            'quality_grade' => $data['quality_grade'] ?? null,
            'market_destination' => $data['market_destination'] ?? null,
            'harvest_date' => $data['harvest_date'],
            'notes' => $data['notes'] ?? null,
        ]);

        // If harvesting, we might want to update the planting status
        if ($planting->status !== 'harvested') {
            $planting->update(['status' => 'harvested', 'actual_harvest_date' => $data['harvest_date']]);
        }

        return $harvest;
    }
}
