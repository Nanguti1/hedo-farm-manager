<?php

namespace Database\Factories;

use App\Models\AnimalCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AnimalCategory>
 */
class AnimalCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Cattle', 'Poultry', 'Sheep', 'Goats', 'Pigs']),
        ];
    }
}
