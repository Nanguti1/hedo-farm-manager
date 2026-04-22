<?php

namespace App\Actions;

use App\Exceptions\InsufficientStockException;
use App\Models\InventoryItem;
use Illuminate\Support\Facades\Validator;

class UpdateInventoryStock
{
    public function execute(InventoryItem $item, float $quantity, string $type): InventoryItem
    {
        Validator::make(['quantity' => $quantity, 'type' => $type], [
            'quantity' => 'required|numeric|min:0',
            'type' => 'required|in:add,subtract',
        ])->validate();

        $currentQuantity = (float) $item->quantity;

        if ($type === 'subtract' && $quantity > $currentQuantity) {
            throw new InsufficientStockException(
                "Insufficient stock. Current: {$currentQuantity}, Requested: {$quantity}"
            );
        }

        $newQuantity = $type === 'add'
            ? $currentQuantity + $quantity
            : $currentQuantity - $quantity;

        $item->quantity = $newQuantity;
        $item->save();

        return $item->fresh();
    }
}
