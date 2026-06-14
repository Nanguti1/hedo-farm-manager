<?php

namespace App\Policies;

use App\Models\Contact;
use App\Models\User;

class ContactPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view contacts');
    }

    public function view(User $user, Contact $contact): bool
    {
        return $user->can('view contacts') && $user->farm_id === $contact->farm_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create contacts');
    }

    public function update(User $user, Contact $contact): bool
    {
        return $user->can('edit contacts') && $user->farm_id === $contact->farm_id;
    }

    public function delete(User $user, Contact $contact): bool
    {
        return $user->can('delete contacts') && $user->farm_id === $contact->farm_id;
    }
}
