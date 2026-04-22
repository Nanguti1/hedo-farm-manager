<?php

namespace App\Actions;

use App\Models\Animal;

class ArchiveAnimal
{
    public function execute(Animal $animal): bool
    {
        $animal->status = 'sold';
        $animal->save();

        return $animal->delete();
    }
}
