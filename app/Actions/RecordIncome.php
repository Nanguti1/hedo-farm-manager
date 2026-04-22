<?php

namespace App\Actions;

use App\Models\Transaction;
use Illuminate\Support\Facades\Validator;

class RecordIncome
{
    public function execute(int $farmId, array $data): Transaction
    {
        Validator::make($data, [
            'income_category_id' => 'required|exists:income_categories,id',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string',
            'transaction_date' => 'required|date',
            'reference' => 'nullable|string|max:255',
        ])->validate();

        return Transaction::create([
            'farm_id' => $farmId,
            'type' => 'income',
            'income_category_id' => $data['income_category_id'],
            'expense_category_id' => null,
            'amount' => $data['amount'],
            'description' => $data['description'],
            'transaction_date' => $data['transaction_date'],
            'reference' => $data['reference'] ?? null,
        ]);
    }
}
