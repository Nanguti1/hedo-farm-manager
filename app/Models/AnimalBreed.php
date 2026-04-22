<?php

namespace App\Models;

use Database\Factories\AnimalBreedFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'description'])]
class AnimalBreed extends Model
{
    /** @use HasFactory<AnimalBreedFactory> */
    use HasFactory;
    public function animals(): HasMany
    {
        return $this->hasMany(Animal::class);
    }
}
