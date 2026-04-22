<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'farm_id' => $this->farm_id,
            'category' => InventoryCategoryResource::make($this->whenLoaded('category')),
            'name' => $this->name,
            'unit' => $this->unit,
            'quantity' => (float) $this->quantity,
            'reorder_level' => (float) $this->reorder_level,
            'is_low_stock' => $this->quantity <= $this->reorder_level,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'transactions' => InventoryTransactionResource::collection($this->whenLoaded('transactions')),
        ];
    }
}
