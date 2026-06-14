<?php

namespace App\Actions;

use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;

class CreateSchedule
{
    public function execute(int $farmId, array $data): Schedule
    {
        Validator::make($data, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'scheduled_date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'type' => 'required|in:task,event,reminder',
            'status' => 'required|in:scheduled,completed,cancelled',
            'related_task_id' => 'nullable|exists:tasks,id',
        ])->validate();

        return Schedule::create([
            'farm_id' => $farmId,
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'scheduled_date' => $data['scheduled_date'],
            'start_time' => $data['start_time'] ?? null,
            'end_time' => $data['end_time'] ?? null,
            'type' => $data['type'],
            'status' => $data['status'],
            'related_task_id' => $data['related_task_id'] ?? null,
        ]);
    }
}
