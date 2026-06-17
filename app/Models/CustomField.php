<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

#[Fillable([
    'farm_id',
    'fieldable_id',
    'fieldable_type',
    'name',
    'value',
    'type',
])]
class CustomField extends Model
{
    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }

    public function fieldable(): MorphTo
    {
        return $this->morphTo();
    }
}
