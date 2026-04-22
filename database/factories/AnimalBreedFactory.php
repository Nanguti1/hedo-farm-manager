<?php

namespace Database\Factories;

use App\Models\AnimalBreed;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AnimalBreed>
 */
class AnimalBreedFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'description' => fake()->sentence(),
        ];
    }
}
