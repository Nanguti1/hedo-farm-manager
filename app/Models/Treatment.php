<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'farm_id',
    'grow_location_id',
    'planting_id',
    'treatment_type',
    'product_used',
    'active_ingredient',
    'dosage',
    'application_method',
    'application_date',
    'reentry_interval',
    'notes',
])]
class Treatment extends Model
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
