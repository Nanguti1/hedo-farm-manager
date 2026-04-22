<?php

namespace App\Actions;

use App\Exceptions\InvalidCropCycleTransitionException;
use App\Models\CropCycle;
use Illuminate\Support\Facades\Validator;

class UpdateCropCycle
{
    private array $validTransitions = [
        'planted' => ['growing'],
        'growing' => ['harvested'],
        'harvested' => [],
    ];

    public function execute(CropCycle $cycle, array $data): CropCycle
    {
        Validator::make($data, [
            'planting_date' => 'sometimes|date',
            'expected_harvest_date' => 'sometimes|date|after:planting_date',
            'status' => 'sometimes|in:planted,growing,harvested',
        ])->validate();

        if (isset($data['status'])) {
            $this->validateTransition($cycle->status, $data['status']);
        }

        $cycle->update(array_filter([
            'planting_date' => $data['planting_date'] ?? null,
            'expected_harvest_date' => $data['expected_harvest_date'] ?? null,
            'status' => $data['status'] ?? null,
        ]));

        return $cycle->fresh();
    }

    private function validateTransition(string $from, string $to): void
    {
        if (!in_array($to, $this->validTransitions[$from] ?? [])) {
            throw new InvalidCropCycleTransitionException(
                "Cannot transition crop cycle from {$from} to {$to}"
            );
        }
    }
}
