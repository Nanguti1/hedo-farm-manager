<?php

namespace Database\Factories;

use App\Models\Animal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Animal>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'farm_id' => Farm::factory(),
            'tag_number' => 'TAG-'.fake()->unique()->numerify('######'),
            'name' => fake()->optional()->firstName(),
            'breed_id' => AnimalBreed::factory(),
            'category_id' => AnimalCategory::factory(),
            'gender' => fake()->randomElement(['male', 'female']),
            'birth_date' => fake()->date(),
            'purchase_date' => fake()->optional()->date(),
            'status' => fake()->randomElement(['active', 'sold', 'dead']),
            'weight' => fake()->optional()->randomFloat(2, 50, 500),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}
