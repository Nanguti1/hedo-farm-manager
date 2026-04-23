<?php

namespace Database\Seeders;

use App\Models\Farm;
use Illuminate\Database\Seeder;

class FarmSeeder extends Seeder
{
    public function run(): void
    {
        Farm::query()->updateOrCreate(
            ['name' => 'Makindu Farm'],
            [
                'location' => 'Makindu, Makueni County',
                'size' => 120,
                'description' => 'Primary operations farm in Makindu.',
                'is_active' => true,
            ],
        );

        Farm::query()->updateOrCreate(
            ['name' => 'Limuru Farm'],
            [
                'location' => 'Limuru, Kiambu County',
                'size' => 85,
                'description' => 'Highland production and livestock farm in Limuru.',
                'is_active' => true,
            ],
        );
    }
}
