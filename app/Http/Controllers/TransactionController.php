<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\FinanceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function __construct(
        private FinanceService $financeService,
    ) {}

    public function index(?string $type = null): Response
    {
        $this->authorize('view transactions');

        $farmId = auth()->user()->farm_id;
        $transactions = $this->financeService->getTransactionsByFarm($farmId, $type);

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'type' => $type,
        ]);
    }

    public function create(?string $type = 'income'): Response
    {
        $this->authorize('create transactions');

        return Inertia::render('Transactions/Create', [
            'type' => $type,
        ]);
    }

    public function store(Request $request): RedirectResponse
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
            return back()->with('error', 'Invalid transaction type. Must be income or expense.');
        }

        return redirect()
            ->route('transactions.index')
            ->with('success', 'Transaction recorded successfully');
    }

    public function show(int $id): Response
    {
        $this->authorize('view transactions');

        $transaction = $this->financeService->getTransactionById($id);

        return Inertia::render('Transactions/Show', [
            'transaction' => $transaction,
        ]);
    }

    public function summary(?string $month = null): Response
    {
        $this->authorize('view transactions');

        $farmId = auth()->user()->farm_id;
        $summary = $this->financeService->getSummary($farmId, $month);

        return Inertia::render('Transactions/Summary', [
            'summary' => $summary,
            'month' => $month,
        ]);
    }
}
