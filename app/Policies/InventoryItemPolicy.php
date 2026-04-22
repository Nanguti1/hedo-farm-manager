<?php

namespace App\Policies;

use App\Models\InventoryItem;
use App\Models\User;

class InventoryItemPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view inventory');
    }

    public function view(User $user, InventoryItem $item): bool
    {
        return $user->can('view inventory') && $user->farm_id === $item->farm_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create inventory items');
    }

    public function update(User $user, InventoryItem $item): bool
    {
        return $user->can('edit inventory items') && $user->farm_id === $item->farm_id;
    }

    public function delete(User $user, InventoryItem $item): bool
    {
        return $user->can('delete inventory items') && $user->farm_id === $item->farm_id;
    }
}
