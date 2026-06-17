<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

#[Fillable([
    'farm_id',
    'notable_id',
    'notable_type',
    'title',
    'content',
    'file_path',
    'file_type',
    'user_id',
])]
class NoteDocument extends Model
{
    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }

    public function notable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
