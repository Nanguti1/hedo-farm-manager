<?php

namespace App\Actions;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Validator;

class AddOrderItem
{
    public function execute(Order $order, array $data): OrderItem
    {
        Validator::make($data, [
            'product_name' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:1',
            'unit_price' => 'required|numeric|min:0',
        ])->validate();

        $item = OrderItem::create([
            'order_id' => $order->id,
            'product_name' => $data['product_name'],
            'quantity' => $data['quantity'],
            'unit_price' => $data['unit_price'],
        ]);

        $this->recalculateOrderTotal($order);

        return $item;
    }

    private function recalculateOrderTotal(Order $order): void
    {
        $total = $order->items()->sum(\DB::raw('quantity * unit_price'));
        $order->total_amount = $total;
        $order->save();
    }
}
