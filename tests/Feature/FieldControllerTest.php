<?php

namespace Tests\Feature;

use App\Models\Farm;
use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FieldControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_fields_index_is_accessible_to_authorized_user(): void
    {
        $this->seed(RoleAndPermissionSeeder::class);

        $farm = Farm::factory()->create();
        $user = User::factory()->create([
            'farm_id' => $farm->id,
        ]);

        $user->assignRole('Admin');

        $response = $this->actingAs($user)->get('/fields');

        $response->assertOk();
        $response->assertSee('Fields');
    }
}
