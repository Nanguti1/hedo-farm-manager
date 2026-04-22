<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CropCycleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'farm_id' => $this->farm_id,
            'field' => FieldResource::make($this->whenLoaded('field')),
            'crop' => CropResource::make($this->whenLoaded('crop')),
            'planting_date' => $this->planting_date->format('Y-m-d'),
            'expected_harvest_date' => $this->expected_harvest_date->format('Y-m-d'),
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'yield_records' => YieldRecordResource::collection($this->whenLoaded('yieldRecords')),
            'product_batches' => ProductBatchResource::collection($this->whenLoaded('productBatches')),
        ];
    }
}
