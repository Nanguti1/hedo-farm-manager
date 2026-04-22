<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FarmResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'location' => $this->location,
            'size' => (float) $this->size,
            'description' => $this->description,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'users_count' => $this->whenCounted('users'),
            'animals_count' => $this->whenCounted('animals'),
            'fields_count' => $this->whenCounted('fields'),
            'users' => UserResource::collection($this->whenLoaded('users')),
        ];
    }
}
