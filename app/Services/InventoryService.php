<?php

namespace App\Services;

use App\Actions\CreateInventoryItem;
use App\Actions\RecordInventoryTransaction;
use App\Actions\UpdateInventoryStock;
use App\Models\InventoryItem;
use Illuminate\Pagination\LengthAwarePaginator;

class InventoryService
{
    public function __construct(
        private CreateInventoryItem $createInventoryItem,
        private UpdateInventoryStock $updateInventoryStock,
        private RecordInventoryTransaction $recordInventoryTransaction,
    ) {}

    public function getInventoryByFarm(int $farmId, ?int $perPage = 15): LengthAwarePaginator
    {
        return InventoryItem::query()
            ->where('farm_id', $farmId)
            ->with(['category', 'transactions' => fn($q) => $q->latest()->limit(5)])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getInventoryItemById(int $id): InventoryItem
    {
        return InventoryItem::query()
            ->with(['category', 'transactions', 'farm'])
            ->findOrFail($id);
    }

    public function createInventoryItem(int $farmId, array $data): InventoryItem
    {
        return $this->createInventoryItem->execute($farmId, $data);
    }

    public function updateStock(InventoryItem $item, float $quantity, string $type): InventoryItem
    {
        $item = $this->updateInventoryStock->execute($item, $quantity, $type);

        $this->recordInventoryTransaction->execute($item, [
            'type' => $type === 'add' ? 'in' : 'out',
            'quantity' => $quantity,
            'reference' => 'Stock adjustment',
        ]);

        return $item;
    }

    public function recordTransaction(InventoryItem $item, array $data)
    {
        return $this->recordInventoryTransaction->execute($item, $data);
    }
}
