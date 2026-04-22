<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryTransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'inventory_item_id' => $this->inventory_item_id,
            'farm_id' => $this->farm_id,
            'type' => $this->type,
            'quantity' => (float) $this->quantity,
            'reference' => $this->reference,
            'created_at' => $this->created_at,
        ];
    }
}
