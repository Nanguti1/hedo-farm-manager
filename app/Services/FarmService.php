<?php

namespace App\Services;

use App\Actions\CreateFarm;
use App\Actions\UpdateFarm;
use App\Models\Farm;
use Illuminate\Pagination\LengthAwarePaginator;

class FarmService
{
    public function __construct(
        private CreateFarm $createFarm,
        private UpdateFarm $updateFarm,
    ) {}

    public function getAllFarms(?int $perPage = 15): LengthAwarePaginator
    {
        return Farm::query()
            ->withCount(['users', 'animals', 'fields'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getFarmById(int $id): Farm
    {
        return Farm::query()
            ->with(['users', 'animals', 'fields', 'crops'])
            ->findOrFail($id);
    }

    public function createFarm(array $data): Farm
    {
        return $this->createFarm->execute($data);
    }

    public function updateFarm(Farm $farm, array $data): Farm
    {
        return $this->updateFarm->execute($farm, $data);
    }

    public function deleteFarm(Farm $farm): bool
    {
        return $farm->delete();
    }
}
