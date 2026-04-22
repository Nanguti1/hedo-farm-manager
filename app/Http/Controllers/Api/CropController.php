<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCropCycleRequest;
use App\Http\Requests\UpdateCropCycleRequest;
use App\Http\Resources\CropCycleResource;
use App\Models\CropCycle;
use App\Services\CropService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CropController extends Controller
{
    public function __construct(
        private CropService $cropService,
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('viewAny', CropCycle::class);

        $farmId = auth()->user()->farm_id;
        $cycles = $this->cropService->getCropCyclesByFarm($farmId);

        return CropCycleResource::collection($cycles);
    }

    public function store(StoreCropCycleRequest $request): JsonResponse
    {
        $this->authorize('create crop cycles');

        $farmId = auth()->user()->farm_id;
        $cycle = $this->cropService->createCropCycle($farmId, $request->validated());

        return response()->json([
            'message' => 'Crop cycle created successfully',
            'data' => new CropCycleResource($cycle),
        ], 201);
    }

    public function show(CropCycle $cycle): CropCycleResource
    {
        $this->authorize('view', $cycle);

        $cycle = $this->cropService->getCropCycleById($cycle->id);

        return new CropCycleResource($cycle);
    }

    public function update(UpdateCropCycleRequest $request, CropCycle $cycle): JsonResponse
    {
        $this->authorize('edit crop cycles');

        $cycle = $this->cropService->updateCropCycle($cycle, $request->validated());

        return response()->json([
            'message' => 'Crop cycle updated successfully',
            'data' => new CropCycleResource($cycle),
        ]);
    }

    public function recordYield(CropCycle $cycle, \Illuminate\Http\Request $request): JsonResponse
    {
        $this->authorize('view yield records');

        $validated = $request->validate([
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'harvest_date' => 'required|date',
            'quality_grade' => 'nullable|string|max:50',
        ]);

        $yield = $this->cropService->recordYield($cycle, $validated);

        return response()->json([
            'message' => 'Yield recorded successfully',
            'data' => new YieldRecordResource($yield),
        ], 201);
    }
}
