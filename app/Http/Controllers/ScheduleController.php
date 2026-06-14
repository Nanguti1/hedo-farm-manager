<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Models\Schedule;
use App\Models\Task;
use App\Services\ScheduleService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ScheduleController extends Controller
{
    public function __construct(
        private ScheduleService $scheduleService,
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', Schedule::class);

        $farmId = auth()->user()->farm_id;
        $schedules = $this->scheduleService->getSchedulesByFarm($farmId);

        return Inertia::render('Schedules/Index', [
            'schedules' => $schedules,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Schedule::class);

        $farmId = auth()->user()->farm_id;

        return Inertia::render('Schedules/Create', [
            'tasks' => Task::query()
                ->where('farm_id', $farmId)
                ->where('status', '!=', 'completed')
                ->select('id', 'title')
                ->orderBy('title')
                ->get(),
        ]);
    }

    public function store(StoreScheduleRequest $request): RedirectResponse
    {
        $this->authorize('create', Schedule::class);

        $farmId = auth()->user()->farm_id;
        $schedule = $this->scheduleService->createSchedule($farmId, $request->validated());

        return redirect()
            ->route('schedules.show', $schedule->id)
            ->with('success', 'Schedule entry created successfully');
    }

    public function show(Schedule $schedule): Response
    {
        $this->authorize('view', $schedule);

        $schedule = $this->scheduleService->getScheduleById($schedule->id);

        return Inertia::render('Schedules/Show', [
            'schedule' => $schedule,
        ]);
    }

    public function edit(Schedule $schedule): Response
    {
        $this->authorize('update', $schedule);

        $schedule = $this->scheduleService->getScheduleById($schedule->id);
        $farmId = auth()->user()->farm_id;

        return Inertia::render('Schedules/Edit', [
            'schedule' => $schedule,
            'tasks' => Task::query()
                ->where('farm_id', $farmId)
                ->where('status', '!=', 'completed')
                ->select('id', 'title')
                ->orderBy('title')
                ->get(),
        ]);
    }

    public function update(UpdateScheduleRequest $request, Schedule $schedule): RedirectResponse
    {
        $this->authorize('update', $schedule);

        $this->scheduleService->updateSchedule($schedule, $request->validated());

        return redirect()
            ->route('schedules.show', $schedule->id)
            ->with('success', 'Schedule entry updated successfully');
    }

    public function destroy(Schedule $schedule): RedirectResponse
    {
        $this->authorize('delete', $schedule);

        $this->scheduleService->deleteSchedule($schedule);

        return redirect()
            ->route('schedules.index')
            ->with('success', 'Schedule entry deleted successfully');
    }
}
