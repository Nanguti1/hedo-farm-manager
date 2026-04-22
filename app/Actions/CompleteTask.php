<?php

namespace App\Actions;

use App\Models\Task;

class CompleteTask
{
    public function execute(Task $task): Task
    {
        $task->status = 'completed';
        $task->save();

        $task->assignments()->update([
            'completed_at' => now(),
        ]);

        return $task->fresh();
    }
}
