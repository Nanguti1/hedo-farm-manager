<?php

namespace App\Actions;

use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;

class UpdateSchedule
{
    public function execute(Schedule $schedule, array $data): Schedule
    {
        Validator::make($data, [
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'scheduled_date' => 'sometimes|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'type' => 'sometimes|in:task,event,reminder',
            'status' => 'sometimes|in:scheduled,completed,cancelled',
            'related_task_id' => 'nullable|exists:tasks,id',
        ])->validate();

        $schedule->update($data);

        return $schedule->fresh();
    }
}
