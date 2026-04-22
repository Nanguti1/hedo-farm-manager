<?php

namespace App\Services;

use App\Actions\ArchiveAnimal;
use App\Actions\CreateAnimal;
use App\Actions\RecordAnimalHealth;
use App\Actions\UpdateAnimal;
use App\Models\Animal;
use Illuminate\Pagination\LengthAwarePaginator;

class AnimalService
{
    public function __construct(
        private CreateAnimal $createAnimal,
        private UpdateAnimal $updateAnimal,
        private RecordAnimalHealth $recordAnimalHealth,
        private ArchiveAnimal $archiveAnimal,
    ) {}

    public function getAnimalsByFarm(int $farmId, ?int $perPage = 15): LengthAwarePaginator
    {
        return Animal::query()
            ->where('farm_id', $farmId)
            ->with(['breed', 'category', 'healthRecords' => fn($q) => $q->latest()->limit(5)])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getAnimalById(int $id): Animal
    {
        return Animal::query()
            ->with(['breed', 'category', 'healthRecords', 'farm'])
            ->findOrFail($id);
    }

    public function createAnimal(int $farmId, array $data): Animal
    {
        return $this->createAnimal->execute($farmId, $data);
    }

    public function updateAnimal(Animal $animal, array $data): Animal
    {
        return $this->updateAnimal->execute($animal, $data);
    }

    public function recordHealth(Animal $animal, array $data)
    {
        return $this->recordAnimalHealth->execute($animal, $data);
    }

    public function archiveAnimal(Animal $animal): bool
    {
        return $this->archiveAnimal->execute($animal);
    }
}
