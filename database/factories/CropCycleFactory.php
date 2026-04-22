<?php

namespace Database\Factories;

use App\Models\CropCycle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CropCycle>
 */
class CropCycleFactory extends Factory
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
            'field_id' => Field::factory(),
            'crop_id' => Crop::factory(),
            'planting_date' => fake()->date(),
            'expected_harvest_date' => fake()->date('+3 months'),
            'status' => fake()->randomElement(['planted', 'growing', 'harvested']),
        ];
    }
}
