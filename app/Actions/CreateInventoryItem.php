<?php

namespace App\Actions;

use App\Models\InventoryItem;
use Illuminate\Support\Facades\Validator;

class CreateInventoryItem
{
    public function execute(int $farmId, array $data): InventoryItem
    {
        Validator::make($data, [
            'category_id' => 'required|exists:inventory_categories,id',
            'name' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|numeric|min:0',
            'reorder_level' => 'required|numeric|min:0',
        ])->validate();

        return InventoryItem::create([
            'farm_id' => $farmId,
            'category_id' => $data['category_id'],
            'name' => $data['name'],
            'unit' => $data['unit'],
            'quantity' => $data['quantity'],
            'reorder_level' => $data['reorder_level'],
        ]);
    }
}
