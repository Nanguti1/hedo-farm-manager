<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\SalesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OrderController extends Controller
{
    public function __construct(
        private SalesService $salesService,
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('view orders');

        $farmId = auth()->user()->farm_id;
        $orders = $this->salesService->getOrdersByFarm($farmId);

        return OrderResource::collection($orders);
    }

    public function store(\Illuminate\Http\Request $request): JsonResponse
    {
        $this->authorize('create orders');

        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'status' => 'required|in:pending,processing,completed,cancelled',
            'order_date' => 'required|date',
        ]);

        $farmId = auth()->user()->farm_id;
        $order = $this->salesService->createOrder($farmId, $validated);

        return response()->json([
            'message' => 'Order created successfully',
            'data' => new OrderResource($order),
        ], 201);
    }

    public function show(Order $order): OrderResource
    {
        $this->authorize('view', $order);

        $order = $this->salesService->getOrderById($order->id);

        return new OrderResource($order);
    }

    public function addItem(Order $order, \Illuminate\Http\Request $request): JsonResponse
    {
        $this->authorize('edit orders');

        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:1',
            'unit_price' => 'required|numeric|min:0',
        ]);

        $item = $this->salesService->addItem($order, $validated);

        return response()->json([
            'message' => 'Item added successfully',
            'data' => new OrderItemResource($item),
        ], 201);
    }

    public function generateBatch(\Illuminate\Http\Request $request): JsonResponse
    {
        $this->authorize('view product batches');

        $validated = $request->validate([
            'crop_cycle_id' => 'required|exists:crop_cycles,id',
            'batch_code' => 'required|string|unique:product_batches,batch_code',
            'production_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $farmId = auth()->user()->farm_id;
        $batch = $this->salesService->generateBatch($farmId, $validated['crop_cycle_id'], $validated);

        return response()->json([
            'message' => 'Product batch generated successfully',
            'data' => new ProductBatchResource($batch),
        ], 201);
    }
}
