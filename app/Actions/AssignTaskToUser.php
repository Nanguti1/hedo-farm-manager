<?php

namespace App\Actions;

use App\Models\Task;
use App\Models\TaskAssignment;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AssignTaskToUser
{
    public function execute(Task $task, User $user): TaskAssignment
    {
        if ($task->users()->where('user_id', $user->id)->exists()) {
            throw new \Exception('Task is already assigned to this user.');
        }

        return TaskAssignment::create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'assigned_at' => now(),
        ]);
    }
}
