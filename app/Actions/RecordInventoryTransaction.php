<?php

namespace App\Actions;

use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use Illuminate\Support\Facades\Validator;

class RecordInventoryTransaction
{
    public function execute(InventoryItem $item, array $data): InventoryTransaction
    {
        Validator::make($data, [
            'type' => 'required|in:in,out,adjustment',
            'quantity' => 'required|numeric|min:0',
            'reference' => 'nullable|string|max:255',
        ])->validate();

        return InventoryTransaction::create([
            'inventory_item_id' => $item->id,
            'farm_id' => $item->farm_id,
            'type' => $data['type'],
            'quantity' => $data['quantity'],
            'reference' => $data['reference'] ?? null,
        ]);
    }
}
