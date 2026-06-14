<?php

namespace App\Policies;

use App\Models\Schedule;
use App\Models\User;

class SchedulePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view schedules');
    }

    public function view(User $user, Schedule $schedule): bool
    {
        return $user->can('view schedules') && $user->farm_id === $schedule->farm_id;
    }

    public function create(User $user): bool
    {
        return $user->can('create schedules');
    }

    public function update(User $user, Schedule $schedule): bool
    {
        return $user->can('edit schedules') && $user->farm_id === $schedule->farm_id;
    }

    public function delete(User $user, Schedule $schedule): bool
    {
        return $user->can('delete schedules') && $user->farm_id === $schedule->farm_id;
    }
}
