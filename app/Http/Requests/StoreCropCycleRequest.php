<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCropCycleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create crop cycles');
    }

    public function rules(): array
    {
        return [
            'field_id' => 'required|exists:fields,id',
            'crop_id' => 'required|exists:crops,id',
            'planting_date' => 'required|date',
            'expected_harvest_date' => 'required|date|after:planting_date',
            'status' => 'required|in:planted,growing,harvested',
        ];
    }
}
