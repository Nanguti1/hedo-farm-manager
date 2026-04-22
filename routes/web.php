<?php

use App\Models\Animal;
use App\Models\CropCycle;
use App\Models\Farm;
use App\Models\InventoryItem;
use App\Models\Task;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $user = auth()->user();
        $farmId = $request->integer('farm_id') ?: $user->farm_id;

        $farms = Farm::query()
            ->when($farmId, fn ($query) => $query->where('id', $farmId))
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        $summary = [
            'total_animals' => Animal::query()->where('farm_id', $farmId)->count(),
            'active_crops' => CropCycle::query()->where('farm_id', $farmId)->whereIn('status', ['planted', 'growing'])->count(),
            'inventory_count' => InventoryItem::query()->where('farm_id', $farmId)->count(),
            'inventory_value' => (float) InventoryItem::query()->where('farm_id', $farmId)->sum('quantity'),
            'income_total' => (float) Transaction::query()->where('farm_id', $farmId)->where('type', 'income')->sum('amount'),
            'expense_total' => (float) Transaction::query()->where('farm_id', $farmId)->where('type', 'expense')->sum('amount'),
        ];

        $recentActivities = [
            'tasks' => Task::query()->where('farm_id', $farmId)->latest()->limit(5)->get(['id', 'title', 'status', 'created_at']),
            'transactions' => Transaction::query()->where('farm_id', $farmId)->latest('transaction_date')->limit(5)->get(['id', 'type', 'amount', 'transaction_date']),
        ];

        return inertia('dashboard', [
            'farms' => $farms,
            'selectedFarmId' => $farmId,
            'summary' => $summary,
            'recentActivities' => $recentActivities,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/farm.php';
