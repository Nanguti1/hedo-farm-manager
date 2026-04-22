<?php

namespace Database\Factories;

use App\Models\InventoryItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<InventoryItem>
 */
class InventoryItemFactory extends Factory
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
            'category_id' => InventoryCategory::factory(),
            'name' => fake()->word(),
            'unit' => fake()->randomElement(['kg', 'litres', 'pieces', 'bags']),
            'quantity' => fake()->randomFloat(2, 0, 1000),
            'reorder_level' => fake()->randomFloat(2, 10, 100),
        ];
    }
}
