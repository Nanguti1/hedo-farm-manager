<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnimalHealthRecordResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'animal_id' => $this->animal_id,
            'farm_id' => $this->farm_id,
            'record_type' => $this->record_type,
            'description' => $this->description,
            'treatment_date' => $this->treatment_date->format('Y-m-d'),
            'next_due_date' => $this->next_due_date?->format('Y-m-d'),
            'cost' => $this->cost ? (float) $this->cost : null,
            'created_at' => $this->created_at,
        ];
    }
}
