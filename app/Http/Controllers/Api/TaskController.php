<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService,
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('view tasks');

        $farmId = auth()->user()->farm_id;
        $tasks = $this->taskService->getTasksByFarm($farmId);

        return TaskResource::collection($tasks);
    }

    public function myTasks(): AnonymousResourceCollection
    {
        $this->authorize('view tasks');

        $userId = auth()->id();
        $tasks = $this->taskService->getUserTasks($userId);

        return TaskResource::collection($tasks);
    }

    public function store(StoreTaskRequest $request): JsonResponse
    {
        $this->authorize('create tasks');

        $farmId = auth()->user()->farm_id;
        $task = $this->taskService->createTask($farmId, $request->validated());

        return response()->json([
            'message' => 'Task created successfully',
            'data' => new TaskResource($task),
        ], 201);
    }

    public function show(Task $task): TaskResource
    {
        $this->authorize('view', $task);

        $task = $this->taskService->getTaskById($task->id);

        return new TaskResource($task);
    }

    public function assign(Task $task, int $userId): JsonResponse
    {
        $this->authorize('assign tasks');

        $assignment = $this->taskService->assignTask($task, $userId);

        return response()->json([
            'message' => 'Task assigned successfully',
        ], 201);
    }

    public function complete(Task $task): JsonResponse
    {
        $this->authorize('edit tasks');

        $task = $this->taskService->completeTask($task);

        return response()->json([
            'message' => 'Task completed successfully',
            'data' => new TaskResource($task),
        ]);
    }
}
