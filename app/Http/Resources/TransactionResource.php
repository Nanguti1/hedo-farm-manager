<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'farm_id' => $this->farm_id,
            'type' => $this->type,
            'expense_category' => ExpenseCategoryResource::make($this->whenLoaded('expenseCategory')),
            'income_category' => IncomeCategoryResource::make($this->whenLoaded('incomeCategory')),
            'amount' => (float) $this->amount,
            'description' => $this->description,
            'transaction_date' => $this->transaction_date->format('Y-m-d'),
            'reference' => $this->reference,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
