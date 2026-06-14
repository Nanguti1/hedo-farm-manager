<?php

namespace App\Services;

use App\Actions\CreateSchedule;
use App\Actions\UpdateSchedule;
use App\Models\Schedule;
use Illuminate\Pagination\LengthAwarePaginator;

class ScheduleService
{
    public function __construct(
        private CreateSchedule $createSchedule,
        private UpdateSchedule $updateSchedule,
    ) {}

    public function getSchedulesByFarm(int $farmId, ?int $perPage = 20): LengthAwarePaginator
    {
        return Schedule::query()
            ->where('farm_id', $farmId)
            ->with(['relatedTask'])
            ->orderBy('scheduled_date')
            ->paginate($perPage);
    }

    public function getScheduleById(int $id): Schedule
    {
        return Schedule::query()
            ->with(['relatedTask', 'farm'])
            ->findOrFail($id);
    }

    public function createSchedule(int $farmId, array $data): Schedule
    {
        return $this->createSchedule->execute($farmId, $data);
    }

    public function updateSchedule(Schedule $schedule, array $data): Schedule
    {
        return $this->updateSchedule->execute($schedule, $data);
    }

    public function deleteSchedule(Schedule $schedule): bool
    {
        return $schedule->delete();
    }
}
