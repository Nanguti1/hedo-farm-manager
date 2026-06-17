<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\GrowLocationController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PlantingController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'ensure.farm.access'])
    ->group(function () {
        // Farm Management (Admin Only)
        Route::resource('farms', FarmController::class);

        // User Management
        Route::resource('users', UserController::class);
        Route::resource('roles', \App\Http\Controllers\RoleController::class);

        // Livestock Management
        Route::resource('animals', AnimalController::class);
        Route::post('animals/{animal}/health', [AnimalController::class, 'recordHealth'])->name('animals.health');

        // Grow Location Management
        Route::resource('grow-locations', GrowLocationController::class);

        // Planting Management
        Route::get('plantings/plan', [PlantingController::class, 'plan'])->name('plantings.plan');
        Route::get('plantings/map', [PlantingController::class, 'map'])->name('plantings.map');
        Route::get('plantings/yield-comparison', [PlantingController::class, 'yieldComparison'])->name('plantings.yield');
        Route::resource('plantings', PlantingController::class);
        Route::post('plantings/{planting}/harvest', [PlantingController::class, 'recordHarvest'])->name('plantings.harvest');
        Route::post('plantings/{planting}/nutrient', [PlantingController::class, 'recordNutrient'])->name('plantings.nutrient');
        Route::post('plantings/{planting}/treatment', [PlantingController::class, 'recordTreatment'])->name('plantings.treatment');

        // Crop Management
        Route::resource('crops', CropController::class)->names([
            'index' => 'crops.index',
            'create' => 'crops.create',
            'store' => 'crops.store',
            'show' => 'crops.show',
            'edit' => 'crops.edit',
            'update' => 'crops.update',
        ]);
        Route::post('crops/{cycle}/yield', [CropController::class, 'recordYield'])->name('crops.yield');

        // Inventory Management
        Route::prefix('inventory')->name('inventory.')->group(function () {
            Route::get('/', [InventoryController::class, 'index'])->name('index');
            Route::get('/create', [InventoryController::class, 'create'])->name('create');
            Route::post('/', [InventoryController::class, 'store'])->name('store');
            Route::get('/{item}', [InventoryController::class, 'show'])->name('show');
            Route::get('/{item}/edit', [InventoryController::class, 'edit'])->name('edit');
            Route::put('/{item}', [InventoryController::class, 'update'])->name('update');
            Route::delete('/{item}', [InventoryController::class, 'destroy'])->name('destroy');
            Route::post('/{item}/stock', [InventoryController::class, 'updateStock'])->name('stock');
        });

        // Financial Management
        Route::prefix('transactions')->name('transactions.')->group(function () {
            Route::get('/', [TransactionController::class, 'index'])->name('index');
            Route::get('/create/{type?}', [TransactionController::class, 'create'])->name('create');
            Route::post('/', [TransactionController::class, 'store'])->name('store');
            Route::get('/{id}', [TransactionController::class, 'show'])->name('show');
            Route::get('/summary/{month?}', [TransactionController::class, 'summary'])->name('summary');
        });

        // Task Management
        Route::prefix('tasks')->name('tasks.')->group(function () {
            Route::get('/', [TaskController::class, 'index'])->name('index');
            Route::get('/my-tasks', [TaskController::class, 'myTasks'])->name('my');
            Route::get('/create', [TaskController::class, 'create'])->name('create');
            Route::post('/', [TaskController::class, 'store'])->name('store');
            Route::get('/{task}', [TaskController::class, 'show'])->name('show');
            Route::get('/{task}/edit', [TaskController::class, 'edit'])->name('edit');
            Route::put('/{task}', [TaskController::class, 'update'])->name('update');
            Route::post('/{task}/assign/{user}', [TaskController::class, 'assign'])->name('assign');
            Route::post('/{task}/complete', [TaskController::class, 'complete'])->name('complete');
        });

        // Sales Management
        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/', [OrderController::class, 'index'])->name('index');
            Route::get('/create', [OrderController::class, 'create'])->name('create');
            Route::post('/', [OrderController::class, 'store'])->name('store');
            Route::get('/{order}', [OrderController::class, 'show'])->name('show');
            Route::post('/{order}/items', [OrderController::class, 'addItem'])->name('items');
            Route::post('/product-batches', [OrderController::class, 'generateBatch'])->name('batches');
        });

        // Schedule Management
        Route::resource('schedules', ScheduleController::class);

        // Contacts Management
        Route::resource('contacts', ContactController::class);

        // Reports
        Route::prefix('reports')->name('reports.')->group(function () {
            Route::get('/', [ReportController::class, 'index'])->name('index');
            Route::get('/financial', [ReportController::class, 'financial'])->name('financial');
            Route::get('/livestock', [ReportController::class, 'livestock'])->name('livestock');
            Route::get('/inventory', [ReportController::class, 'inventory'])->name('inventory');
            Route::get('/tasks', [ReportController::class, 'tasks'])->name('tasks');
            Route::get('/crops', [ReportController::class, 'crops'])->name('crops');
        });
    });
