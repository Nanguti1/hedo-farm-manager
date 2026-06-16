<?php

namespace Tests\Feature;

use App\Models\Farm;
use App\Models\Task;
use App\Models\TaskAssignment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_page_includes_users_for_assignment(): void
    {
        Gate::define('create tasks', fn (User $user) => true);
        Gate::define('assign tasks', fn (User $user) => true);

        $farm = Farm::factory()->create();
        $user = User::factory()->create(['farm_id' => $farm->id]);
        User::factory()->create(['farm_id' => $farm->id]);

        $this->actingAs($user);

        $response = $this->get(route('tasks.create'));

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Tasks/Create')
                ->has('users', 2)
            );
    }

    public function test_store_assigns_the_selected_user_to_the_new_task(): void
    {
        Gate::define('create tasks', fn (User $user) => true);
        Gate::define('assign tasks', fn (User $user) => true);

        $farm = Farm::factory()->create();
        $user = User::factory()->create(['farm_id' => $farm->id]);
        $assignee = User::factory()->create(['farm_id' => $farm->id]);

        $this->actingAs($user);

        $response = $this->post(route('tasks.store'), [
            'title' => 'Routine check',
            'description' => 'Inspect the greenhouse',
            'status' => 'pending',
            'priority' => 'high',
            'due_date' => '2026-06-20',
            'assigned_to' => $assignee->id,
        ]);

        $response->assertRedirect();

        $task = Task::query()->where('title', 'Routine check')->firstOrFail();

        $this->assertTrue(TaskAssignment::query()
            ->where('task_id', $task->id)
            ->where('user_id', $assignee->id)
            ->exists());
    }
}
