<?php

namespace Database\Seeders;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(FarmSeeder::class);

        $defaultFarmId = Farm::query()->where('name', 'Makindu Farm')->value('id');

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'farm_id' => $defaultFarmId,
        ]);
    }
}
