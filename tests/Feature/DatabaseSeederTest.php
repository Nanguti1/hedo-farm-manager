<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DatabaseSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_database_seeder_assigns_admin_role_and_permissions_to_default_user(): void
    {
        $this->artisan('db:seed', ['--class' => 'DatabaseSeeder'])
            ->assertSuccessful();

        $user = User::query()->where('email', 'g.nanguti@gmail.com')->firstOrFail();

        $this->assertTrue($user->hasRole('Admin'));
        $this->assertTrue($user->can('view farms'));
        $this->assertTrue($user->can('view tasks'));
    }
}
