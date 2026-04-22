<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInventoryItemRequest;
use App\Models\InventoryCategory;
use App\Models\InventoryItem;
use App\Services\InventoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryController extends Controller
{
    public function __construct(
        private InventoryService $inventoryService,
    ) {}

    public function index(): Response
    {
        $this->authorize('view inventory');

        $farmId = auth()->user()->farm_id;
        $items = $this->inventoryService->getInventoryByFarm($farmId);

        return Inertia::render('Inventory/Index', [
            'items' => $items,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create inventory items');

        return Inertia::render('Inventory/Create', [
            'categories' => InventoryCategory::query()->select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(StoreInventoryItemRequest $request): RedirectResponse
    {
        $this->authorize('create inventory items');

        $farmId = auth()->user()->farm_id;
        $item = $this->inventoryService->createInventoryItem($farmId, $request->validated());

        return redirect()
            ->route('inventory.show', $item->id)
            ->with('success', 'Inventory item created successfully');
    }

    public function show(InventoryItem $item): Response
    {
        $this->authorize('view inventory');

        $item = $this->inventoryService->getInventoryItemById($item->id);

        return Inertia::render('Inventory/Show', [
            'item' => $item,
        ]);
    }

    public function updateStock(InventoryItem $item, Request $request): RedirectResponse
    {
        $this->authorize('edit inventory items');

        $validated = $request->validate([
            'quantity' => 'required|numeric|min:0',
            'type' => 'required|in:add,subtract',
        ]);

        $item = $this->inventoryService->updateStock($item, $validated['quantity'], $validated['type']);

        return redirect()
            ->route('inventory.show', $item->id)
            ->with('success', 'Stock updated successfully');
    }
}
