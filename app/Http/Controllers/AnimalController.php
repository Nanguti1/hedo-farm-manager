<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnimalRequest;
use App\Http\Requests\UpdateAnimalRequest;
use App\Models\Animal;
use App\Services\AnimalService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnimalController extends Controller
{
    public function __construct(
        private AnimalService $animalService,
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', Animal::class);

        $farmId = auth()->user()->farm_id;
        $animals = $this->animalService->getAnimalsByFarm($farmId);

        return Inertia::render('Animals/Index', [
            'animals' => $animals,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Animal::class);

        return Inertia::render('Animals/Create');
    }

    public function store(StoreAnimalRequest $request): RedirectResponse
    {
        $this->authorize('create', Animal::class);

        $farmId = auth()->user()->farm_id;
        $animal = $this->animalService->createAnimal($farmId, $request->validated());

        return redirect()
            ->route('animals.show', $animal->id)
            ->with('success', 'Animal created successfully');
    }

    public function show(Animal $animal): Response
    {
        $this->authorize('view', $animal);

        $animal = $this->animalService->getAnimalById($animal->id);

        return Inertia::render('Animals/Show', [
            'animal' => $animal,
        ]);
    }

    public function edit(Animal $animal): Response
    {
        $this->authorize('update', $animal);

        $animal = $this->animalService->getAnimalById($animal->id);

        return Inertia::render('Animals/Edit', [
            'animal' => $animal,
        ]);
    }

    public function update(UpdateAnimalRequest $request, Animal $animal): RedirectResponse
    {
        $this->authorize('update', $animal);

        $animal = $this->animalService->updateAnimal($animal, $request->validated());

        return redirect()
            ->route('animals.show', $animal->id)
            ->with('success', 'Animal updated successfully');
    }

    public function destroy(Animal $animal): RedirectResponse
    {
        $this->authorize('delete', $animal);

        $this->animalService->archiveAnimal($animal);

        return redirect()
            ->route('animals.index')
            ->with('success', 'Animal archived successfully');
    }

    public function recordHealth(Animal $animal, Request $request): RedirectResponse
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

        return redirect()
            ->route('animals.show', $animal->id)
            ->with('success', 'Health record created successfully');
    }
}
