<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnimalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'farm_id' => $this->farm_id,
            'tag_number' => $this->tag_number,
            'name' => $this->name,
            'breed' => AnimalBreedResource::make($this->whenLoaded('breed')),
            'category' => AnimalCategoryResource::make($this->whenLoaded('category')),
            'gender' => $this->gender,
            'birth_date' => $this->birth_date?->format('Y-m-d'),
            'purchase_date' => $this->purchase_date?->format('Y-m-d'),
            'status' => $this->status,
            'weight' => $this->weight ? (float) $this->weight : null,
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'health_records' => AnimalHealthRecordResource::collection($this->whenLoaded('healthRecords')),
        ];
    }
}
