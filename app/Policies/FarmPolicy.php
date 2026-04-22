<?php

namespace App\Policies;

use App\Models\Farm;
use App\Models\User;

class FarmPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view farms');
    }

    public function view(User $user, Farm $farm): bool
    {
        return $user->can('view farms') && $user->farm_id === $farm->id;
    }

    public function create(User $user): bool
    {
        return $user->can('create farms');
    }

    public function update(User $user, Farm $farm): bool
    {
        return $user->can('edit farms') && $user->farm_id === $farm->id;
    }

    public function delete(User $user, Farm $farm): bool
    {
        return $user->can('delete farms');
    }
}
