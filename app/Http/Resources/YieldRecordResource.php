<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class YieldRecordResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'crop_cycle_id' => $this->crop_cycle_id,
            'quantity' => (float) $this->quantity,
            'unit' => $this->unit,
            'harvest_date' => $this->harvest_date->format('Y-m-d'),
            'quality_grade' => $this->quality_grade,
            'created_at' => $this->created_at,
        ];
    }
}
