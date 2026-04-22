<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Services\FinanceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TransactionController extends Controller
{
    public function __construct(
        private FinanceService $financeService,
    ) {}

    public function index(?string $type = null): AnonymousResourceCollection
    {
        $this->authorize('view transactions');

        $farmId = auth()->user()->farm_id;
        $transactions = $this->financeService->getTransactionsByFarm($farmId, $type);

        return TransactionResource::collection($transactions);
    }

    public function store(\Illuminate\Http\Request $request): JsonResponse
    {
        $this->authorize('create transactions');

        $farmId = auth()->user()->farm_id;
        $type = $request->input('type');

        if ($type === 'income') {
            $validated = $request->validate([
                'income_category_id' => 'required|exists:income_categories,id',
                'amount' => 'required|numeric|min:0',
                'description' => 'required|string',
                'transaction_date' => 'required|date',
                'reference' => 'nullable|string|max:255',
            ]);
            $transaction = $this->financeService->recordIncome($farmId, $validated);
        } elseif ($type === 'expense') {
            $validated = $request->validate([
                'expense_category_id' => 'required|exists:expense_categories,id',
                'amount' => 'required|numeric|min:0',
                'description' => 'required|string',
                'transaction_date' => 'required|date',
                'reference' => 'nullable|string|max:255',
            ]);
            $transaction = $this->financeService->recordExpense($farmId, $validated);
        } else {
            return response()->json([
                'message' => 'Invalid transaction type. Must be income or expense.',
            ], 422);
        }

        return response()->json([
            'message' => 'Transaction recorded successfully',
            'data' => new TransactionResource($transaction),
        ], 201);
    }

    public function show(int $id): TransactionResource
    {
        $this->authorize('view transactions');

        $transaction = $this->financeService->getTransactionById($id);

        return new TransactionResource($transaction);
    }

    public function summary(?string $month = null): JsonResponse
    {
        $this->authorize('view transactions');

        $farmId = auth()->user()->farm_id;
        $summary = $this->financeService->getSummary($farmId, $month);

        return response()->json([
            'data' => $summary,
        ]);
    }
}
