<?php

namespace App\Services;

use App\Actions\AssignTaskToUser;
use App\Actions\CompleteTask;
use App\Actions\CreateTask;
use App\Models\Task;
use Illuminate\Pagination\LengthAwarePaginator;

class TaskService
{
    public function __construct(
        private CreateTask $createTask,
        private AssignTaskToUser $assignTaskToUser,
        private CompleteTask $completeTask,
    ) {}

    public function getTasksByFarm(int $farmId, ?int $perPage = 15): LengthAwarePaginator
    {
        return Task::query()
            ->where('farm_id', $farmId)
            ->with(['users', 'assignments'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getTaskById(int $id): Task
    {
        return Task::query()
            ->with(['users', 'assignments', 'farm'])
            ->findOrFail($id);
    }

    public function createTask(int $farmId, array $data): Task
    {
        return $this->createTask->execute($farmId, $data);
    }

    public function assignTask(Task $task, int $userId)
    {
        $user = \App\Models\User::findOrFail($userId);
        return $this->assignTaskToUser->execute($task, $user);
    }

    public function completeTask(Task $task): Task
    {
        return $this->completeTask->execute($task);
    }

    public function getUserTasks(int $userId, ?int $perPage = 15): LengthAwarePaginator
    {
        return Task::query()
            ->whereHas('users', fn($q) => $q->where('user_id', $userId))
            ->with(['assignments' => fn($q) => $q->where('user_id', $userId)])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
}
