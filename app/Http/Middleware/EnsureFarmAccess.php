<?php

namespace App\Http\Middleware;

use App\Models\Farm;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureFarmAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        if (!$user->farm_id) {
            $selectedFarmId = $request->session()->get('selected_farm_id');

            if (!$selectedFarmId && $user->can('view farms')) {
                $selectedFarmId = Farm::query()->value('id');
            }

            if ($selectedFarmId) {
                $user->forceFill(['farm_id' => $selectedFarmId])->save();
                $request->session()->put('selected_farm_id', $selectedFarmId);
            }
        }

        if (!$user->farm_id) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'You are not assigned to a farm. Please contact an administrator.');
        }

        return $next($request);
    }
}
