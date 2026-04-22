<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFarmRequest;
use App\Http\Requests\UpdateFarmRequest;
use App\Http\Resources\FarmResource;
use App\Models\Farm;
use App\Services\FarmService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FarmController extends Controller
{
    public function __construct(
        private FarmService $farmService,
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Farm::class);

        $farms = $this->farmService->getAllFarms();

        return FarmResource::collection($farms);
    }

    public function store(StoreFarmRequest $request): JsonResponse
    {
        $this->authorize('create', Farm::class);

        $farm = $this->farmService->createFarm($request->validated());

        return response()->json([
            'message' => 'Farm created successfully',
            'data' => new FarmResource($farm),
        ], 201);
    }

    public function show(Farm $farm): FarmResource
    {
        $this->authorize('view', $farm);

        $farm = $this->farmService->getFarmById($farm->id);

        return new FarmResource($farm);
    }

    public function update(UpdateFarmRequest $request, Farm $farm): JsonResponse
    {
        $this->authorize('update', $farm);

        $farm = $this->farmService->updateFarm($farm, $request->validated());

        return response()->json([
            'message' => 'Farm updated successfully',
            'data' => new FarmResource($farm),
        ]);
    }

    public function destroy(Farm $farm): JsonResponse
    {
        $this->authorize('delete', $farm);

        $this->farmService->deleteFarm($farm);

        return response()->json([
            'message' => 'Farm deleted successfully',
        ], 204);
    }
}
