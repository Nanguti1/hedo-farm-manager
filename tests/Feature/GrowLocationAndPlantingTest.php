<?php

namespace Tests\Feature;

use App\Models\Farm;
use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GrowLocationAndPlantingTest extends TestCase
{
    use RefreshDatabase;

    public function test_grow_locations_index_is_accessible_to_authorized_user(): void
    {
        $this->seed(RoleAndPermissionSeeder::class);

        $farm = Farm::factory()->create();
        $user = User::factory()->create(['farm_id' => $farm->id]);
        $user->assignRole('Admin');

        $response = $this->actingAs($user)->get('/grow-locations');

        $response->assertOk();
        $response->assertSee('Grow Locations');
    }

    public function test_plantings_index_is_accessible_to_authorized_user(): void
    {
        $this->seed(RoleAndPermissionSeeder::class);

        $farm = Farm::factory()->create();
        $user = User::factory()->create(['farm_id' => $farm->id]);
        $user->assignRole('Admin');

        $response = $this->actingAs($user)->get('/plantings');

        $response->assertOk();
        $response->assertSee('Plantings');
    }
}
