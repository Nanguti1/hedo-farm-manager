<?php

namespace App\Actions;

use App\Models\Task;
use Illuminate\Support\Facades\Validator;

class CreateTask
{
    public function execute(int $farmId, array $data): Task
    {
        Validator::make($data, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ])->validate();

        return Task::create([
            'farm_id' => $farmId,
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'priority' => $data['priority'],
            'due_date' => $data['due_date'] ?? null,
        ]);
    }
}
