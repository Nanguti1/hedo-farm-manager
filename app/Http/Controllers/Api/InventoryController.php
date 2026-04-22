<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInventoryItemRequest;
use App\Http\Resources\InventoryItemResource;
use App\Models\InventoryItem;
use App\Services\InventoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class InventoryController extends Controller
{
    public function __construct(
        private InventoryService $inventoryService,
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('view inventory');

        $farmId = auth()->user()->farm_id;
        $items = $this->inventoryService->getInventoryByFarm($farmId);

        return InventoryItemResource::collection($items);
    }

    public function store(StoreInventoryItemRequest $request): JsonResponse
    {
        $this->authorize('create inventory items');

        $farmId = auth()->user()->farm_id;
        $item = $this->inventoryService->createInventoryItem($farmId, $request->validated());

        return response()->json([
            'message' => 'Inventory item created successfully',
            'data' => new InventoryItemResource($item),
        ], 201);
    }

    public function show(InventoryItem $item): InventoryItemResource
    {
        $this->authorize('view inventory');

        $item = $this->inventoryService->getInventoryItemById($item->id);

        return new InventoryItemResource($item);
    }

    public function updateStock(InventoryItem $item, \Illuminate\Http\Request $request): JsonResponse
    {
        $this->authorize('edit inventory items');

        $validated = $request->validate([
            'quantity' => 'required|numeric|min:0',
            'type' => 'required|in:add,subtract',
        ]);

        $item = $this->inventoryService->updateStock($item, $validated['quantity'], $validated['type']);

        return response()->json([
            'message' => 'Stock updated successfully',
            'data' => new InventoryItemResource($item),
        ]);
    }
}
