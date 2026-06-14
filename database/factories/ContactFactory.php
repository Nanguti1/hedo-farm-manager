<?php

namespace Database\Factories;

use App\Models\Contact;
use App\Models\Farm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contact>
 */
class ContactFactory extends Factory
{
    public function definition(): array
    {
        return [
            'farm_id' => Farm::factory(),
            'name' => fake()->name(),
            'type' => fake()->randomElement(['supplier', 'customer', 'vet', 'contractor', 'other']),
            'phone' => fake()->optional()->phoneNumber(),
            'email' => fake()->optional()->safeEmail(),
            'address' => fake()->optional()->address(),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}
