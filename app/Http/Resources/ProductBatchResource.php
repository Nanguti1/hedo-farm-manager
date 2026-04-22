<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductBatchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'farm_id' => $this->farm_id,
            'crop_cycle_id' => $this->crop_cycle_id,
            'batch_code' => $this->batch_code,
            'production_date' => $this->production_date->format('Y-m-d'),
            'notes' => $this->notes,
            'created_at' => $this->created_at,
        ];
    }
}
