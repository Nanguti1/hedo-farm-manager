<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'farm_id',
    'grow_location_id',
    'sample_date',
    'ph',
    'nitrogen',
    'phosphorus',
    'potassium',
    'organic_matter',
    'moisture',
    'lab_report_path',
    'notes',
])]
class SoilSample extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sample_date' => 'date',
            'ph' => 'decimal:2',
            'nitrogen' => 'decimal:2',
            'phosphorus' => 'decimal:2',
            'potassium' => 'decimal:2',
            'organic_matter' => 'decimal:2',
            'moisture' => 'decimal:2',
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
}
