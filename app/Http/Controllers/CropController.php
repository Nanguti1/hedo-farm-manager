<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCropCycleRequest;
use App\Http\Requests\UpdateCropCycleRequest;
use App\Models\CropCycle;
use App\Services\CropService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CropController extends Controller
{
    public function __construct(
        private CropService $cropService,
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', CropCycle::class);

        $farmId = auth()->user()->farm_id;
        $cycles = $this->cropService->getCropCyclesByFarm($farmId);

        return Inertia::render('Crops/Index', [
            'cycles' => $cycles,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create crop cycles');

        return Inertia::render('Crops/Create');
    }

    public function store(StoreCropCycleRequest $request): RedirectResponse
    {
        $this->authorize('create crop cycles');

        $farmId = auth()->user()->farm_id;
        $cycle = $this->cropService->createCropCycle($farmId, $request->validated());

        return redirect()
            ->route('crops.show', $cycle->id)
            ->with('success', 'Crop cycle created successfully');
    }

    public function show(CropCycle $cycle): Response
    {
        $this->authorize('view', $cycle);

        $cycle = $this->cropService->getCropCycleById($cycle->id);

        return Inertia::render('Crops/Show', [
            'cycle' => $cycle,
        ]);
    }

    public function edit(CropCycle $cycle): Response
    {
        $this->authorize('edit crop cycles');

        $cycle = $this->cropService->getCropCycleById($cycle->id);

        return Inertia::render('Crops/Edit', [
            'cycle' => $cycle,
        ]);
    }

    public function update(UpdateCropCycleRequest $request, CropCycle $cycle): RedirectResponse
    {
        $this->authorize('edit crop cycles');

        $cycle = $this->cropService->updateCropCycle($cycle, $request->validated());

        return redirect()
            ->route('crops.show', $cycle->id)
            ->with('success', 'Crop cycle updated successfully');
    }

    public function recordYield(CropCycle $cycle, Request $request): RedirectResponse
    {
        $this->authorize('view yield records');

        $validated = $request->validate([
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'harvest_date' => 'required|date',
            'quality_grade' => 'nullable|string|max:50',
        ]);

        $yield = $this->cropService->recordYield($cycle, $validated);

        return redirect()
            ->route('crops.show', $cycle->id)
            ->with('success', 'Yield recorded successfully');
    }
}
