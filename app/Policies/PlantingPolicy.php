<?php

namespace App\Policies;

use App\Models\Planting;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PlantingPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view plantings');
    }

    public function view(User $user, Planting $planting): bool
    {
        return $user->can('view plantings') && $user->farm_id === $planting->farm_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create plantings');
    }

    public function update(User $user, Planting $planting): bool
    {
        return $user->can('edit plantings') && $user->farm_id === $planting->farm_id;
    }

    public function delete(User $user, Planting $planting): bool
    {
        return $user->can('delete plantings') && $user->farm_id === $planting->farm_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Planting $planting): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Planting $planting): bool
    {
        return false;
    }
}
