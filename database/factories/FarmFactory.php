<?php

namespace Database\Factories;

use App\Models\Farm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Farm>
 */
class FarmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company().' Farm',
            'location' => fake()->city().', '.fake()->state(),
            'size' => fake()->randomFloat(2, 10, 500),
            'description' => fake()->paragraph(),
            'is_active' => true,
        ];
    }
}
