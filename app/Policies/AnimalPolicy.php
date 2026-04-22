<?php

namespace App\Policies;

use App\Models\Animal;
use App\Models\User;

class AnimalPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view animals');
    }

    public function view(User $user, Animal $animal): bool
    {
        return $user->can('view animals') && $user->farm_id === $animal->farm_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create animals');
    }

    public function update(User $user, Animal $animal): bool
    {
        return $user->can('edit animals') && $user->farm_id === $animal->farm_id;
    }

    public function delete(User $user, Animal $animal): bool
    {
        return $user->can('delete animals') && $user->farm_id === $animal->farm_id;
    }
}
