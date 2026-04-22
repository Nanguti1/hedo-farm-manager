<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFarmRequest;
use App\Http\Requests\UpdateFarmRequest;
use App\Models\Farm;
use App\Services\FarmService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FarmController extends Controller
{
    public function __construct(
        private FarmService $farmService,
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', Farm::class);

        $farms = $this->farmService->getAllFarms();

        return Inertia::render('Farms/Index', [
            'farms' => $farms,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Farm::class);

        return Inertia::render('Farms/Create');
    }

    public function store(StoreFarmRequest $request): RedirectResponse
    {
        $this->authorize('create', Farm::class);

        $farm = $this->farmService->createFarm($request->validated());

        return redirect()
            ->route('farms.show', $farm->id)
            ->with('success', 'Farm created successfully');
    }

    public function show(Farm $farm): Response
    {
        $this->authorize('view', $farm);

        $farm = $this->farmService->getFarmById($farm->id);

        return Inertia::render('Farms/Show', [
            'farm' => $farm,
        ]);
    }

    public function edit(Farm $farm): Response
    {
        $this->authorize('update', $farm);

        $farm = $this->farmService->getFarmById($farm->id);

        return Inertia::render('Farms/Edit', [
            'farm' => $farm,
        ]);
    }

    public function update(UpdateFarmRequest $request, Farm $farm): RedirectResponse
    {
        $this->authorize('update', $farm);

        $farm = $this->farmService->updateFarm($farm, $request->validated());

        return redirect()
            ->route('farms.show', $farm->id)
            ->with('success', 'Farm updated successfully');
    }

    public function destroy(Farm $farm): RedirectResponse
    {
        $this->authorize('delete', $farm);

        $this->farmService->deleteFarm($farm);

        return redirect()
            ->route('farms.index')
            ->with('success', 'Farm deleted successfully');
    }
}
