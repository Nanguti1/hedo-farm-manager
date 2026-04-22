<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\SalesService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function __construct(
        private SalesService $salesService,
    ) {}

    public function index(): Response
    {
        $this->authorize('view orders');

        $farmId = auth()->user()->farm_id;
        $orders = $this->salesService->getOrdersByFarm($farmId);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create orders');

        return Inertia::render('Orders/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create orders');

        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'status' => 'required|in:pending,processing,completed,cancelled',
            'order_date' => 'required|date',
        ]);

        $farmId = auth()->user()->farm_id;
        $order = $this->salesService->createOrder($farmId, $validated);

        return redirect()
            ->route('orders.show', $order->id)
            ->with('success', 'Order created successfully');
    }

    public function show(Order $order): Response
    {
        $this->authorize('view', $order);

        $order = $this->salesService->getOrderById($order->id);

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function addItem(Order $order, Request $request): RedirectResponse
    {
        $this->authorize('edit orders');

        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:1',
            'unit_price' => 'required|numeric|min:0',
        ]);

        $this->salesService->addItem($order, $validated);

        return redirect()
            ->route('orders.show', $order->id)
            ->with('success', 'Item added successfully');
    }

    public function generateBatch(Request $request): RedirectResponse
    {
        $this->authorize('view product batches');

        $validated = $request->validate([
            'crop_cycle_id' => 'required|exists:crop_cycles,id',
            'batch_code' => 'required|string|unique:product_batches,batch_code',
            'production_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $farmId = auth()->user()->farm_id;
        $this->salesService->generateBatch($farmId, $validated['crop_cycle_id'], $validated);

        return redirect()
            ->back()
            ->with('success', 'Product batch generated successfully');
    }
}
