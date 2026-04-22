<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view orders');
    }

    public function view(User $user, Order $order): bool
    {
        return $user->can('view orders') && $user->farm_id === $order->farm_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create orders');
    }

    public function update(User $user, Order $order): bool
    {
        return $user->can('edit orders') && $user->farm_id === $order->farm_id;
    }

    public function delete(User $user, Order $order): bool
    {
        return $user->can('delete orders') && $user->farm_id === $order->farm_id;
    }
}
