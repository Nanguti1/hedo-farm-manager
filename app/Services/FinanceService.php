<?php

namespace App\Services;

use App\Actions\RecordExpense;
use App\Actions\RecordIncome;
use App\Models\Transaction;
use Illuminate\Pagination\LengthAwarePaginator;

class FinanceService
{
    public function __construct(
        private RecordIncome $recordIncome,
        private RecordExpense $recordExpense,
    ) {}

    public function getTransactionsByFarm(int $farmId, ?string $type = null, ?int $perPage = 15): LengthAwarePaginator
    {
        $query = Transaction::query()
            ->where('farm_id', $farmId)
            ->with(['expenseCategory', 'incomeCategory']);

        if ($type) {
            $query->where('type', $type);
        }

        return $query->orderBy('transaction_date', 'desc')
            ->paginate($perPage);
    }

    public function getTransactionById(int $id): Transaction
    {
        return Transaction::query()
            ->with(['expenseCategory', 'incomeCategory', 'farm'])
            ->findOrFail($id);
    }

    public function recordIncome(int $farmId, array $data): Transaction
    {
        return $this->recordIncome->execute($farmId, $data);
    }

    public function recordExpense(int $farmId, array $data): Transaction
    {
        return $this->recordExpense->execute($farmId, $data);
    }

    public function getSummary(int $farmId, ?string $month = null): array
    {
        $query = Transaction::where('farm_id', $farmId);

        if ($month) {
            $query->whereMonth('transaction_date', $month);
        }

        $totalIncome = (clone $query)->where('type', 'income')->sum('amount');
        $totalExpense = (clone $query)->where('type', 'expense')->sum('amount');
        $net = $totalIncome - $totalExpense;

        return [
            'total_income' => (float) $totalIncome,
            'total_expense' => (float) $totalExpense,
            'net' => (float) $net,
        ];
    }
}
