<?php

namespace Tests\Feature;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard_with_summary_props(): void
    {
        $farm = Farm::factory()->create();
        $user = User::factory()->create(['farm_id' => $farm->id]);

        $this->actingAs($user);

        $response = $this->get(route('dashboard'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('summary')
            ->has('recentActivities')
            ->has('farms')
        );
    }
}
