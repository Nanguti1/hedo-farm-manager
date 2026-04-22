<?php

namespace App\Services;

use App\Actions\CreateCropCycle;
use App\Actions\RecordYield;
use App\Actions\UpdateCropCycle;
use App\Models\CropCycle;
use Illuminate\Pagination\LengthAwarePaginator;

class CropService
{
    public function __construct(
        private CreateCropCycle $createCropCycle,
        private UpdateCropCycle $updateCropCycle,
        private RecordYield $recordYield,
    ) {}

    public function getCropCyclesByFarm(int $farmId, ?int $perPage = 15): LengthAwarePaginator
    {
        return CropCycle::query()
            ->where('farm_id', $farmId)
            ->with(['field', 'crop', 'yieldRecords'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getCropCycleById(int $id): CropCycle
    {
        return CropCycle::query()
            ->with(['field', 'crop', 'yieldRecords', 'productBatches'])
            ->findOrFail($id);
    }

    public function createCropCycle(int $farmId, array $data): CropCycle
    {
        return $this->createCropCycle->execute($farmId, $data);
    }

    public function updateCropCycle(CropCycle $cycle, array $data): CropCycle
    {
        return $this->updateCropCycle->execute($cycle, $data);
    }

    public function recordYield(CropCycle $cycle, array $data)
    {
        return $this->recordYield->execute($cycle, $data);
    }
}
