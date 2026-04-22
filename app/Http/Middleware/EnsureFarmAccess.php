<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureFarmAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$user->farm_id) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'You are not assigned to a farm. Please contact an administrator.');
        }

        return $next($request);
    }
}
