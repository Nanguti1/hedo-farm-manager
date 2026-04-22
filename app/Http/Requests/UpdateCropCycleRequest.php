<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCropCycleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit crop cycles');
    }

    public function rules(): array
    {
        return [
            'planting_date' => 'sometimes|date',
            'expected_harvest_date' => 'sometimes|date|after:planting_date',
            'status' => 'sometimes|in:planted,growing,harvested',
        ];
    }
}
