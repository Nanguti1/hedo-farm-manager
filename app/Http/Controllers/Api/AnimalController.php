<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnimalRequest;
use App\Http\Requests\UpdateAnimalRequest;
use App\Http\Resources\AnimalResource;
use App\Models\Animal;
use App\Services\AnimalService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AnimalController extends Controller
{
    public function __construct(
        private AnimalService $animalService,
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Animal::class);

        $farmId = auth()->user()->farm_id;
        $animals = $this->animalService->getAnimalsByFarm($farmId);

        return AnimalResource::collection($animals);
    }

    public function store(StoreAnimalRequest $request): JsonResponse
    {
        $this->authorize('create', Animal::class);

        $farmId = auth()->user()->farm_id;
        $animal = $this->animalService->createAnimal($farmId, $request->validated());

        return response()->json([
            'message' => 'Animal created successfully',
            'data' => new AnimalResource($animal),
        ], 201);
    }

    public function show(Animal $animal): AnimalResource
    {
        $this->authorize('view', $animal);

        $animal = $this->animalService->getAnimalById($animal->id);

        return new AnimalResource($animal);
    }

    public function update(UpdateAnimalRequest $request, Animal $animal): JsonResponse
    {
        $this->authorize('update', $animal);

        $animal = $this->animalService->updateAnimal($animal, $request->validated());

        return response()->json([
            'message' => 'Animal updated successfully',
            'data' => new AnimalResource($animal),
        ]);
    }

    public function destroy(Animal $animal): JsonResponse
    {
        $this->authorize('delete', $animal);

        $this->animalService->archiveAnimal($animal);

        return response()->json([
            'message' => 'Animal archived successfully',
        ], 204);
    }

    public function recordHealth(Animal $animal, \Illuminate\Http\Request $request): JsonResponse
    {
        $this->authorize('create animal health records');

        $validated = $request->validate([
            'record_type' => 'required|string|max:255',
            'description' => 'required|string',
            'treatment_date' => 'required|date',
            'next_due_date' => 'nullable|date',
            'cost' => 'nullable|numeric|min:0',
        ]);

        $record = $this->animalService->recordHealth($animal, $validated);

        return response()->json([
            'message' => 'Health record created successfully',
            'data' => new AnimalHealthRecordResource($record),
        ], 201);
    }
}
