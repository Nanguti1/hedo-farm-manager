<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ScopeFarmData
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->farm_id) {
            DB::macro('addFarmScope', function ($query) use ($user) {
                if (str_contains($query->from, 'users')) {
                    return $query->where('farm_id', $user->farm_id);
                }
                return $query->where('farm_id', $user->farm_id);
            });
        }

        return $next($request);
    }
}
