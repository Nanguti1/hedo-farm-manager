<?php

namespace App\Actions;

use App\Models\Order;
use Illuminate\Support\Facades\Validator;

class CreateOrder
{
    public function execute(int $farmId, array $data): Order
    {
        Validator::make($data, [
            'customer_name' => 'required|string|max:255',
            'status' => 'required|in:pending,processing,completed,cancelled',
            'order_date' => 'required|date',
        ])->validate();

        return Order::create([
            'farm_id' => $farmId,
            'customer_name' => $data['customer_name'],
            'total_amount' => 0,
            'status' => $data['status'],
            'order_date' => $data['order_date'],
        ]);
    }
}
