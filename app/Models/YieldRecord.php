<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['crop_cycle_id', 'quantity', 'unit', 'harvest_date', 'quality_grade'])]
class YieldRecord extends Model
{
    protected function casts(): array
    {
        return [
            'quantity' => 'decimal:2',
            'harvest_date' => 'date',
        ];
    }

    public function cropCycle(): BelongsTo
    {
        return $this->belongsTo(CropCycle::class);
    }
}
