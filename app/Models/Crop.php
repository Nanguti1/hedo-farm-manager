<?php

namespace App\Models;

use Database\Factories\CropFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'farm_id',
    'name',
    'scientific_name',
    'category',
    'variety',
    'days_to_germination',
    'days_to_maturity',
    'frost_timing',
    'planting_depth',
    'spacing',
    'row_spacing',
    'light_needs',
    'water_needs',
    'expected_yield',
    'germination_rate',
    'seed_supplier',
    'seed_lot_number',
])]
class Crop extends Model
{
    /** @use HasFactory<CropFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'germination_rate' => 'decimal:2',
        ];
    }

    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }

    public function cropCycles(): HasMany
    {
        return $this->hasMany(CropCycle::class);
    }

    public function plantings(): HasMany
    {
        return $this->hasMany(Planting::class);
    }

    public function harvests(): HasMany
    {
        return $this->hasMany(Harvest::class);
    }

    public function customFields(): HasMany
    {
        return $this->morphMany(CustomField::class, 'fieldable');
    }

    public function notes(): HasMany
    {
        return $this->morphMany(NoteDocument::class, 'notable');
    }
}
