<?php

namespace Tests\Unit;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use ReflectionClass;
use Tests\TestCase;

class ControllerAuthorizationTest extends TestCase
{
    public function test_base_controller_uses_authorizes_requests_trait(): void
    {
        $traits = class_uses_recursive(Controller::class);

        $this->assertContains(AuthorizesRequests::class, $traits);
    }

    public function test_base_controller_exposes_authorize_method(): void
    {
        $reflection = new ReflectionClass(Controller::class);

        $this->assertTrue($reflection->hasMethod('authorize'));
    }
}
