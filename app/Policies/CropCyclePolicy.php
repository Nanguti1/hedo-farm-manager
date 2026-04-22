<?php

namespace App\Policies;

use App\Models\CropCycle;
use App\Models\User;

class CropCyclePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view crop cycles');
    }

    public function view(User $user, CropCycle $cycle): bool
    {
        return $user->can('view crop cycles') && $user->farm_id === $cycle->farm_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create crop cycles');
    }

    public function update(User $user, CropCycle $cycle): bool
    {
        return $user->can('edit crop cycles') && $user->farm_id === $cycle->farm_id;
    }

    public function delete(User $user, CropCycle $cycle): bool
    {
        return $user->can('delete crop cycles') && $user->farm_id === $cycle->farm_id;
    }
}
