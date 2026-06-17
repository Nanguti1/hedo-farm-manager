<?php

namespace App\Http\Controllers;

use App\Models\GrowLocation;
use App\Services\GrowLocationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GrowLocationController extends Controller
{
    public function __construct(
        private GrowLocationService $growLocationService,
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', GrowLocation::class);

        $farmId = auth()->user()->farm_id;
        $growLocations = $this->growLocationService->getGrowLocationsByFarm($farmId);

        return Inertia::render('GrowLocations/Index', [
            'growLocations' => $growLocations,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', GrowLocation::class);

        $farmId = auth()->user()->farm_id;

        return Inertia::render('GrowLocations/Create', [
            'parentLocations' => $this->growLocationService->getAllGrowLocationsByFarm($farmId),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create', GrowLocation::class);

        $farmId = auth()->user()->farm_id;
        $growLocation = $this->growLocationService->createGrowLocation($farmId, $request->all());

        return redirect()
            ->route('grow-locations.show', $growLocation->id)
            ->with('success', 'Grow location created successfully');
    }

    public function show(GrowLocation $growLocation): Response
    {
        $this->authorize('view', $growLocation);

        $growLocation = $this->growLocationService->getGrowLocationById($growLocation->id);

        return Inertia::render('GrowLocations/Show', [
            'growLocation' => $growLocation,
        ]);
    }

    public function edit(GrowLocation $growLocation): Response
    {
        $this->authorize('update', $growLocation);

        $farmId = auth()->user()->farm_id;
        $growLocation = $this->growLocationService->getGrowLocationById($growLocation->id);

        return Inertia::render('GrowLocations/Edit', [
            'growLocation' => $growLocation,
            'parentLocations' => $this->growLocationService->getAllGrowLocationsByFarm($farmId),
        ]);
    }

    public function update(Request $request, GrowLocation $growLocation): RedirectResponse
    {
        $this->authorize('update', $growLocation);

        $growLocation = $this->growLocationService->updateGrowLocation($growLocation, $request->all());

        return redirect()
            ->route('grow-locations.show', $growLocation->id)
            ->with('success', 'Grow location updated successfully');
    }

    public function destroy(GrowLocation $growLocation): RedirectResponse
    {
        $this->authorize('delete', $growLocation);

        $this->growLocationService->deleteGrowLocation($growLocation);

        return redirect()
            ->route('grow-locations.index')
            ->with('success', 'Grow location deleted successfully');
    }
}
