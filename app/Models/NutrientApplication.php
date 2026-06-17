<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'farm_id',
    'grow_location_id',
    'planting_id',
    'fertilizer_type',
    'is_organic',
    'quantity',
    'unit',
    'application_method',
    'application_date',
    'cost',
    'applicator',
    'notes',
])]
class NutrientApplication extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'application_date' => 'date',
            'is_organic' => 'boolean',
            'quantity' => 'decimal:2',
            'cost' => 'decimal:2',
        ];
    }

    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }

    public function growLocation(): BelongsTo
    {
        return $this->belongsTo(GrowLocation::class);
    }

    public function planting(): BelongsTo
    {
        return $this->belongsTo(Planting::class);
    }
}
