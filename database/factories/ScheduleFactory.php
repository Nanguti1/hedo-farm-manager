<?php

namespace Database\Factories;

use App\Models\Farm;
use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Schedule>
 */
class ScheduleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'farm_id' => Farm::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->optional()->paragraph(),
            'scheduled_date' => fake()->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'start_time' => fake()->optional()->time('H:i'),
            'end_time' => fake()->optional()->time('H:i'),
            'type' => fake()->randomElement(['task', 'event', 'reminder']),
            'status' => fake()->randomElement(['scheduled', 'completed', 'cancelled']),
            'related_task_id' => null,
        ];
    }
}
