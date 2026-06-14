<?php

namespace App\Actions;

use App\Models\InventoryItem;
use Illuminate\Support\Facades\Validator;

class UpdateInventoryItem
{
    public function execute(InventoryItem $item, array $data): InventoryItem
    {
        Validator::make($data, [
            'category_id' => 'sometimes|exists:inventory_categories,id',
            'name' => 'sometimes|string|max:255',
            'unit' => 'sometimes|string|max:50',
            'quantity' => 'sometimes|numeric|min:0',
            'reorder_level' => 'sometimes|numeric|min:0',
        ])->validate();

        $item->update($data);

        return $item->fresh();
    }
}
