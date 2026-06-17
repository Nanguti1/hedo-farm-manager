<?php

namespace App\Actions;

use App\Models\Planting;
use App\Models\Treatment;
use Illuminate\Support\Facades\Validator;

class RecordTreatment
{
    public function execute(Planting $planting, array $data): Treatment
    {
        Validator::make($data, [
            'treatment_type' => 'required|string|max:255',
            'product_used' => 'required|string|max:255',
            'active_ingredient' => 'nullable|string|max:255',
            'dosage' => 'nullable|string|max:255',
            'application_method' => 'nullable|string|max:255',
            'application_date' => 'required|date',
            'reentry_interval' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ])->validate();

        return Treatment::create([
            'farm_id' => $planting->farm_id,
            'grow_location_id' => $planting->grow_location_id,
            'planting_id' => $planting->id,
            'treatment_type' => $data['treatment_type'],
            'product_used' => $data['product_used'],
            'active_ingredient' => $data['active_ingredient'] ?? null,
            'dosage' => $data['dosage'] ?? null,
            'application_method' => $data['application_method'] ?? null,
            'application_date' => $data['application_date'],
            'reentry_interval' => $data['reentry_interval'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]);
    }
}
