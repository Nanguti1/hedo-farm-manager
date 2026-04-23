<?php

use App\Models\Animal;
use App\Models\CropCycle;
use App\Models\Farm;
use App\Models\InventoryItem;
use App\Models\Task;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $user = $request->user();

        $farmsQuery = Farm::query()->select('id', 'name')->orderBy('name');
        if (!$user->can('view farms')) {
            $farmsQuery->where('id', $user->farm_id);
        }

        $farms = $farmsQuery->get();
        $selectedFarmId = $request->integer('farm_id') ?: $request->session()->get('selected_farm_id') ?: $user->farm_id;

        if (!$selectedFarmId && $farms->isNotEmpty()) {
            $selectedFarmId = $farms->first()->id;
        }

        if ($selectedFarmId && $farms->contains('id', $selectedFarmId)) {
            $request->session()->put('selected_farm_id', $selectedFarmId);

            if ($user->farm_id !== $selectedFarmId) {
                $user->forceFill(['farm_id' => $selectedFarmId])->save();
            }
        }

        $summary = [
            'total_animals' => Animal::query()->where('farm_id', $selectedFarmId)->count(),
            'active_crops' => CropCycle::query()->where('farm_id', $selectedFarmId)->whereIn('status', ['planted', 'growing'])->count(),
            'inventory_count' => InventoryItem::query()->where('farm_id', $selectedFarmId)->count(),
            'inventory_value' => (float) InventoryItem::query()->where('farm_id', $selectedFarmId)->sum('quantity'),
            'income_total' => (float) Transaction::query()->where('farm_id', $selectedFarmId)->where('type', 'income')->sum('amount'),
            'expense_total' => (float) Transaction::query()->where('farm_id', $selectedFarmId)->where('type', 'expense')->sum('amount'),
        ];

        $recentActivities = [
            'tasks' => Task::query()->where('farm_id', $selectedFarmId)->latest()->limit(5)->get(['id', 'title', 'status', 'created_at']),
            'transactions' => Transaction::query()->where('farm_id', $selectedFarmId)->latest('transaction_date')->limit(5)->get(['id', 'type', 'amount', 'transaction_date']),
        ];

        return inertia('dashboard', [
            'farms' => $farms,
            'selectedFarmId' => $selectedFarmId,
            'summary' => $summary,
            'recentActivities' => $recentActivities,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/farm.php';
