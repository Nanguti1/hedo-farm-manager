<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

#[Fillable([
    'farm_id',
    'parent_id',
    'name',
    'type',
    'area_size',
    'area_unit',
    'gps_coordinates',
    'polygon',
    'status',
    'description',
])]
class GrowLocation extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'polygon' => 'json',
            'area_size' => 'decimal:2',
        ];
    }

    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(GrowLocation::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(GrowLocation::class, 'parent_id');
    }

    public function plantings(): HasMany
    {
        return $this->hasMany(Planting::class);
    }

    public function nutrientApplications(): HasMany
    {
        return $this->hasMany(NutrientApplication::class);
    }

    public function treatments(): HasMany
    {
        return $this->hasMany(Treatment::class);
    }

    public function soilSamples(): HasMany
    {
        return $this->hasMany(SoilSample::class);
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
