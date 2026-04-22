<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService,
    ) {}

    public function index(): Response
    {
        $this->authorize('view tasks');

        $farmId = auth()->user()->farm_id;
        $tasks = $this->taskService->getTasksByFarm($farmId);

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function myTasks(): Response
    {
        $this->authorize('view tasks');

        $userId = auth()->id();
        $tasks = $this->taskService->getUserTasks($userId);

        return Inertia::render('Tasks/MyTasks', [
            'tasks' => $tasks,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create tasks');

        return Inertia::render('Tasks/Create');
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $this->authorize('create tasks');

        $farmId = auth()->user()->farm_id;
        $task = $this->taskService->createTask($farmId, $request->validated());

        return redirect()
            ->route('tasks.show', $task->id)
            ->with('success', 'Task created successfully');
    }

    public function show(Task $task): Response
    {
        $this->authorize('view', $task);

        $task = $this->taskService->getTaskById($task->id);

        return Inertia::render('Tasks/Show', [
            'task' => $task,
        ]);
    }

    public function edit(Task $task): Response
    {
        $this->authorize('update', $task);

        $task = $this->taskService->getTaskById($task->id);

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
        ]);
    }

    public function assign(Task $task, int $userId): RedirectResponse
    {
        $this->authorize('assign tasks');

        $this->taskService->assignTask($task, $userId);

        return redirect()
            ->route('tasks.show', $task->id)
            ->with('success', 'Task assigned successfully');
    }

    public function complete(Task $task): RedirectResponse
    {
        $this->authorize('edit tasks');

        $task = $this->taskService->completeTask($task);

        return redirect()
            ->route('tasks.show', $task->id)
            ->with('success', 'Task completed successfully');
    }
}
