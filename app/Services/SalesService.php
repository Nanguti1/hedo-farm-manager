<?php

namespace App\Services;

use App\Actions\AddOrderItem;
use App\Actions\CreateOrder;
use App\Actions\GenerateProductBatch;
use App\Models\Order;
use Illuminate\Pagination\LengthAwarePaginator;

class SalesService
{
    public function __construct(
        private CreateOrder $createOrder,
        private AddOrderItem $addOrderItem,
        private GenerateProductBatch $generateProductBatch,
    ) {}

    public function getOrdersByFarm(int $farmId, ?int $perPage = 15): LengthAwarePaginator
    {
        return Order::query()
            ->where('farm_id', $farmId)
            ->with(['items'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getOrderById(int $id): Order
    {
        return Order::query()
            ->with(['items', 'farm'])
            ->findOrFail($id);
    }

    public function createOrder(int $farmId, array $data): Order
    {
        return $this->createOrder->execute($farmId, $data);
    }

    public function addItem(Order $order, array $data)
    {
        return $this->addOrderItem->execute($order, $data);
    }

    public function generateBatch(int $farmId, int $cropCycleId, array $data)
    {
        return $this->generateProductBatch->execute($farmId, $cropCycleId, $data);
    }
}
