<?php

namespace App\Services;

use App\Actions\CreateGrowLocation;
use App\Actions\UpdateGrowLocation;
use App\Models\GrowLocation;
use Illuminate\Pagination\LengthAwarePaginator;

class GrowLocationService
{
    public function __construct(
        private CreateGrowLocation $createGrowLocation,
        private UpdateGrowLocation $updateGrowLocation,
    ) {}

    public function getGrowLocationsByFarm(int $farmId, ?int $perPage = 15): LengthAwarePaginator
    {
        return GrowLocation::query()
            ->where('farm_id', $farmId)
            ->with(['parent', 'children'])
            ->orderBy('name')
            ->paginate($perPage);
    }

    public function getAllGrowLocationsByFarm(int $farmId)
    {
        return GrowLocation::query()
            ->where('farm_id', $farmId)
            ->orderBy('name')
            ->get();
    }

    public function getGrowLocationById(int $id): GrowLocation
    {
        return GrowLocation::query()
            ->with(['parent', 'children', 'plantings.crop', 'farm'])
            ->findOrFail($id);
    }

    public function createGrowLocation(int $farmId, array $data): GrowLocation
    {
        return $this->createGrowLocation->execute($farmId, $data);
    }

    public function updateGrowLocation(GrowLocation $growLocation, array $data): GrowLocation
    {
        return $this->updateGrowLocation->execute($growLocation, $data);
    }

    public function deleteGrowLocation(GrowLocation $growLocation): bool
    {
        return $growLocation->delete();
    }
}
