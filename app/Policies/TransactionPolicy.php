<?php

namespace App\Policies;

use App\Models\Transaction;
use App\Models\User;

class TransactionPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view transactions');
    }

    public function view(User $user, Transaction $transaction): bool
    {
        return $user->can('view transactions') && $user->farm_id === $transaction->farm_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create transactions');
    }

    public function update(User $user, Transaction $transaction): bool
    {
        return $user->can('edit transactions') && $user->farm_id === $transaction->farm_id;
    }

    public function delete(User $user, Transaction $transaction): bool
    {
        return $user->can('delete transactions') && $user->farm_id === $transaction->farm_id;
    }
}
