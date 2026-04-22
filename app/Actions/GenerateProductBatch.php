<?php

namespace App\Actions;

use App\Models\CropCycle;
use App\Models\ProductBatch;
use Illuminate\Support\Facades\Validator;

class GenerateProductBatch
{
    public function execute(int $farmId, int $cropCycleId, array $data): ProductBatch
    {
        Validator::make($data, [
            'batch_code' => 'required|string|unique:product_batches,batch_code',
            'production_date' => 'required|date',
            'notes' => 'nullable|string',
        ])->validate();

        $cycle = CropCycle::findOrFail($cropCycleId);

        return ProductBatch::create([
            'farm_id' => $farmId,
            'crop_cycle_id' => $cropCycleId,
            'batch_code' => $data['batch_code'],
            'production_date' => $data['production_date'],
            'notes' => $data['notes'] ?? null,
        ]);
    }
}
