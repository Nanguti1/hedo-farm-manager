<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

#[Fillable([
    'farm_id',
    'crop_id',
    'grow_location_id',
    'variety',
    'season',
    'status',
    'seed_start_date',
    'transplant_date',
    'direct_seed_date',
    'expected_harvest_date',
    'actual_harvest_date',
    'number_of_plants',
    'number_of_rows',
    'area_occupied',
    'area_unit',
    'succession_number',
    'notes',
])]
class Planting extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'seed_start_date' => 'date',
            'transplant_date' => 'date',
            'direct_seed_date' => 'date',
            'expected_harvest_date' => 'date',
            'actual_harvest_date' => 'date',
            'area_occupied' => 'decimal:2',
        ];
    }

    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }

    public function crop(): BelongsTo
    {
        return $this->belongsTo(Crop::class);
    }

    public function growLocation(): BelongsTo
    {
        return $this->belongsTo(GrowLocation::class);
    }

    public function harvests(): HasMany
    {
        return $this->hasMany(Harvest::class);
    }

    public function nutrientApplications(): HasMany
    {
        return $this->hasMany(NutrientApplication::class);
    }

    public function treatments(): HasMany
    {
        return $this->hasMany(Treatment::class);
    }

    public function customFields(): MorphMany
    {
        return $this->morphMany(CustomField::class, 'fieldable');
    }

    public function notes(): MorphMany
    {
        return $this->morphMany(NoteDocument::class, 'notable');
    }
}
