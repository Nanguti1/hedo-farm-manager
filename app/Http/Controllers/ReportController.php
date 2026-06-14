<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\CropCycle;
use App\Models\InventoryItem;
use App\Models\Task;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        $this->authorize('view reports');

        return Inertia::render('Reports/Index');
    }

    public function financial(Request $request): Response
    {
        $this->authorize('view reports');

        $farmId = auth()->user()->farm_id;
        $year = $request->integer('year', now()->year);

        $monthlyData = collect(range(1, 12))->map(function (int $month) use ($farmId, $year) {
            $query = Transaction::query()
                ->where('farm_id', $farmId)
                ->whereYear('transaction_date', $year)
                ->whereMonth('transaction_date', $month);

            return [
                'month' => $month,
                'month_name' => now()->setMonth($month)->format('M'),
                'income' => (float) (clone $query)->where('type', 'income')->sum('amount'),
                'expense' => (float) (clone $query)->where('type', 'expense')->sum('amount'),
            ];
        });

        $totals = [
            'total_income' => (float) Transaction::query()->where('farm_id', $farmId)->whereYear('transaction_date', $year)->where('type', 'income')->sum('amount'),
            'total_expense' => (float) Transaction::query()->where('farm_id', $farmId)->whereYear('transaction_date', $year)->where('type', 'expense')->sum('amount'),
        ];
        $totals['net'] = $totals['total_income'] - $totals['total_expense'];

        return Inertia::render('Reports/Financial', [
            'monthlyData' => $monthlyData,
            'totals' => $totals,
            'year' => $year,
        ]);
    }

    public function livestock(): Response
    {
        $this->authorize('view reports');

        $farmId = auth()->user()->farm_id;

        $byStatus = Animal::query()
            ->where('farm_id', $farmId)
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->get();

        $byCategory = Animal::query()
            ->where('farm_id', $farmId)
            ->with('category')
            ->selectRaw('category_id, count(*) as total')
            ->groupBy('category_id')
            ->get()
            ->map(fn ($row) => [
                'category' => $row->category?->name ?? 'Unknown',
                'total' => $row->total,
            ]);

        $byGender = Animal::query()
            ->where('farm_id', $farmId)
            ->selectRaw('gender, count(*) as total')
            ->groupBy('gender')
            ->get();

        return Inertia::render('Reports/Livestock', [
            'byStatus' => $byStatus,
            'byCategory' => $byCategory,
            'byGender' => $byGender,
            'total' => Animal::query()->where('farm_id', $farmId)->count(),
        ]);
    }

    public function inventory(): Response
    {
        $this->authorize('view reports');

        $farmId = auth()->user()->farm_id;

        $items = InventoryItem::query()
            ->where('farm_id', $farmId)
            ->with('category')
            ->orderBy('name')
            ->get(['id', 'name', 'unit', 'quantity', 'reorder_level', 'category_id'])
            ->map(fn ($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'category' => $item->category?->name ?? 'Unknown',
                'quantity' => (float) $item->quantity,
                'unit' => $item->unit,
                'reorder_level' => (float) $item->reorder_level,
                'is_low_stock' => $item->quantity <= $item->reorder_level,
            ]);

        return Inertia::render('Reports/Inventory', [
            'items' => $items,
            'lowStockCount' => $items->where('is_low_stock', true)->count(),
            'totalItems' => $items->count(),
        ]);
    }

    public function tasks(): Response
    {
        $this->authorize('view reports');

        $farmId = auth()->user()->farm_id;

        $byStatus = Task::query()
            ->where('farm_id', $farmId)
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->get();

        $byPriority = Task::query()
            ->where('farm_id', $farmId)
            ->selectRaw('priority, count(*) as total')
            ->groupBy('priority')
            ->get();

        $overdue = Task::query()
            ->where('farm_id', $farmId)
            ->where('status', '!=', 'completed')
            ->whereNotNull('due_date')
            ->where('due_date', '<', now()->toDateString())
            ->count();

        return Inertia::render('Reports/Tasks', [
            'byStatus' => $byStatus,
            'byPriority' => $byPriority,
            'overdue' => $overdue,
            'total' => Task::query()->where('farm_id', $farmId)->count(),
        ]);
    }

    public function crops(): Response
    {
        $this->authorize('view reports');

        $farmId = auth()->user()->farm_id;

        $byStatus = CropCycle::query()
            ->where('farm_id', $farmId)
            ->with('crop')
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->get();

        $activeCycles = CropCycle::query()
            ->where('farm_id', $farmId)
            ->whereIn('status', ['planted', 'growing'])
            ->with(['crop', 'field'])
            ->latest()
            ->get(['id', 'status', 'planting_date', 'expected_harvest_date', 'crop_id', 'field_id']);

        return Inertia::render('Reports/Crops', [
            'byStatus' => $byStatus,
            'activeCycles' => $activeCycles,
            'total' => CropCycle::query()->where('farm_id', $farmId)->count(),
        ]);
    }
}
