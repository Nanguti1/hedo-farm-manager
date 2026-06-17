<?php

namespace App\Services;

use App\Actions\CreatePlanting;
use App\Actions\RecordHarvest;
use App\Actions\RecordNutrientApplication;
use App\Actions\RecordTreatment;
use App\Actions\UpdatePlanting;
use App\Models\Harvest;
use App\Models\NutrientApplication;
use App\Models\Planting;
use App\Models\Treatment;
use Illuminate\Pagination\LengthAwarePaginator;

class PlantingService
{
    public function __construct(
        private CreatePlanting $createPlanting,
        private UpdatePlanting $updatePlanting,
        private RecordHarvest $recordHarvest,
        private RecordNutrientApplication $recordNutrientApplication,
        private RecordTreatment $recordTreatment,
    ) {}

    public function getPlantingsByFarm(int $farmId, ?int $perPage = 15): LengthAwarePaginator
    {
        return Planting::query()
            ->where('farm_id', $farmId)
            ->with(['crop', 'growLocation'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getPlantingById(int $id): Planting
    {
        return Planting::query()
            ->with(['crop', 'growLocation', 'harvests', 'nutrientApplications', 'treatments', 'farm'])
            ->findOrFail($id);
    }

    public function createPlanting(int $farmId, array $data): Planting
    {
        return $this->createPlanting->execute($farmId, $data);
    }

    public function updatePlanting(Planting $planting, array $data): Planting
    {
        return $this->updatePlanting->execute($planting, $data);
    }

    public function deletePlanting(Planting $planting): bool
    {
        return $planting->delete();
    }

    public function recordHarvest(Planting $planting, array $data): Harvest
    {
        return $this->recordHarvest->execute($planting, $data);
    }

    public function recordNutrient(Planting $planting, array $data): NutrientApplication
    {
        return $this->recordNutrientApplication->execute($planting, $data);
    }

    public function recordTreatment(Planting $planting, array $data): Treatment
    {
        return $this->recordTreatment->execute($planting, $data);
    }
}
