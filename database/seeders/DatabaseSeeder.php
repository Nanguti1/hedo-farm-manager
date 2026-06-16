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
        $this->call([
            FarmSeeder::class,
            RoleAndPermissionSeeder::class,
        ]);

        $defaultFarmId = Farm::query()->where('name', 'Makindu Farm')->value('id');

        $user = User::factory()->create([
            'name' => 'Nanguti - SA',
            'email' => 'g.nanguti@gmail.com',
            'farm_id' => $defaultFarmId,
        ]);

        $user->assignRole('Admin');
    }
}
