<?php

namespace App\Policies;

use App\Models\GrowLocation;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GrowLocationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view grow locations');
    }

    public function view(User $user, GrowLocation $growLocation): bool
    {
        return $user->can('view grow locations') && $user->farm_id === $growLocation->farm_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create grow locations');
    }

    public function update(User $user, GrowLocation $growLocation): bool
    {
        return $user->can('edit grow locations') && $user->farm_id === $growLocation->farm_id;
    }

    public function delete(User $user, GrowLocation $growLocation): bool
    {
        return $user->can('delete grow locations') && $user->farm_id === $growLocation->farm_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, GrowLocation $growLocation): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, GrowLocation $growLocation): bool
    {
        return false;
    }
}
