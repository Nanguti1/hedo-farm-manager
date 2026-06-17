<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use App\Models\Planting;
use App\Services\GrowLocationService;
use App\Services\PlantingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlantingController extends Controller
{
    public function __construct(
        private PlantingService $plantingService,
        private GrowLocationService $growLocationService,
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', Planting::class);

        $farmId = auth()->user()->farm_id;
        $plantings = $this->plantingService->getPlantingsByFarm($farmId);

        return Inertia::render('Plantings/Index', [
            'plantings' => $plantings,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Planting::class);

        $farmId = auth()->user()->farm_id;

        return Inertia::render('Plantings/Create', [
            'crops' => Crop::where('farm_id', $farmId)->orderBy('name')->get(),
            'growLocations' => $this->growLocationService->getAllGrowLocationsByFarm($farmId),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create', Planting::class);

        $farmId = auth()->user()->farm_id;
        $planting = $this->plantingService->createPlanting($farmId, $request->all());

        return redirect()
            ->route('plantings.show', $planting->id)
            ->with('success', 'Planting created successfully');
    }

    public function show(Planting $planting): Response
    {
        $this->authorize('view', $planting);

        $planting = $this->plantingService->getPlantingById($planting->id);

        return Inertia::render('Plantings/Show', [
            'planting' => $planting,
        ]);
    }

    public function edit(Planting $planting): Response
    {
        $this->authorize('update', $planting);

        $farmId = auth()->user()->farm_id;
        $planting = $this->plantingService->getPlantingById($planting->id);

        return Inertia::render('Plantings/Edit', [
            'planting' => $planting,
            'crops' => Crop::where('farm_id', $farmId)->orderBy('name')->get(),
            'growLocations' => $this->growLocationService->getAllGrowLocationsByFarm($farmId),
        ]);
    }

    public function update(Request $request, Planting $planting): RedirectResponse
    {
        $this->authorize('update', $planting);

        $planting = $this->plantingService->updatePlanting($planting, $request->all());

        return redirect()
            ->route('plantings.show', $planting->id)
            ->with('success', 'Planting updated successfully');
    }

    public function destroy(Planting $planting): RedirectResponse
    {
        $this->authorize('delete', $planting);

        $this->plantingService->deletePlanting($planting);

        return redirect()
            ->route('plantings.index')
            ->with('success', 'Planting deleted successfully');
    }

    public function plan(): Response
    {
        $this->authorize('viewAny', Planting::class);

        $farmId = auth()->user()->farm_id;
        // Basic implementation: get planned and ongoing plantings
        $plannedPlantings = Planting::where('farm_id', $farmId)
            ->whereIn('status', ['planned', 'seeded'])
            ->with(['crop', 'growLocation'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Plantings/Plan', [
            'plannedPlantings' => $plannedPlantings,
        ]);
    }

    public function map(): Response
    {
        $this->authorize('view grow locations');

        $farmId = auth()->user()->farm_id;
        $locations = $this->growLocationService->getAllGrowLocationsByFarm($farmId);

        return Inertia::render('Plantings/Map', [
            'locations' => $locations,
        ]);
    }

    public function yieldComparison(): Response
    {
        $this->authorize('view reports');

        $farmId = auth()->user()->farm_id;
        
        // Basic implementation: sum yield per crop
        $yieldData = \App\Models\Harvest::where('farm_id', $farmId)
            ->with('crop')
            ->selectRaw('crop_id, sum(quantity) as total_quantity, unit')
            ->groupBy('crop_id', 'unit')
            ->get()
            ->map(fn($item) => [
                'crop' => $item->crop->name,
                'total' => (float)$item->total_quantity,
                'unit' => $item->unit,
            ]);

        return Inertia::render('Plantings/YieldComparison', [
            'yieldData' => $yieldData,
        ]);
    }

    public function recordHarvest(Request $request, Planting $planting): RedirectResponse
    {
        $this->authorize('update', $planting);

        $this->plantingService->recordHarvest($planting, $request->all());

        return redirect()
            ->route('plantings.show', $planting->id)
            ->with('success', 'Harvest recorded successfully');
    }

    public function recordNutrient(Request $request, Planting $planting): RedirectResponse
    {
        $this->authorize('update', $planting);

        $this->plantingService->recordNutrient($planting, $request->all());

        return redirect()
            ->route('plantings.show', $planting->id)
            ->with('success', 'Nutrient application recorded successfully');
    }

    public function recordTreatment(Request $request, Planting $planting): RedirectResponse
    {
        $this->authorize('update', $planting);

        $this->plantingService->recordTreatment($planting, $request->all());

        return redirect()
            ->route('plantings.show', $planting->id)
            ->with('success', 'Treatment recorded successfully');
    }
}
