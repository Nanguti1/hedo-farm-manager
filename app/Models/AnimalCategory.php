<?php

namespace App\Models;

use Database\Factories\AnimalCategoryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name'])]
class AnimalCategory extends Model
{
    /** @use HasFactory<AnimalCategoryFactory> */
    use HasFactory;
    public function animals(): HasMany
    {
        return $this->hasMany(Animal::class);
    }
}
