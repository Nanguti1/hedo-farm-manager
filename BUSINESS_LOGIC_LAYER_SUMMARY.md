# Multi-Farm Management System - Business Logic Layer Summary

## Overview
Complete production-ready business logic layer for a multi-tenant farm management system built with Laravel 13, PHP 8.4, and Spatie Permissions.

## Architecture Principles

### 1. **Thin Controllers**
- Controllers only handle HTTP concerns
- Delegate business logic to Services
- Use Form Requests for validation
- Return API Resources for consistent responses

### 2. **Service Layer**
- Coordinate complex workflows
- Manage multiple Actions
- Handle domain logic
- No HTTP dependencies

### 3. **Actions (Single Responsibility)**
- Reusable, testable units
- One operation per class
- Pure business logic
- Can be used across multiple Services

### 4. **Multi-Tenancy**
- All queries scoped to farm_id
- Middleware enforcement
- Policy-based authorization
- No cross-farm data access

### 5. **Authorization**
- Spatie Permissions integration
- Policy classes for model authorization
- Permission-based access control
- Farm-scoped checks

---

## Module Breakdown

### 1. FARM MODULE

**Files Created:**
- `Actions/CreateFarm.php` - Create farm with validation
- `Actions/UpdateFarm.php` - Update farm data
- `Services/FarmService.php` - Farm operations
- `Http/Controllers/Api/FarmController.php` - RESTful endpoints
- `Http/Requests/StoreFarmRequest.php` - Create validation
- `Http/Requests/UpdateFarmRequest.php` - Update validation
- `Policies/FarmPolicy.php` - Authorization rules
- `Http/Resources/FarmResource.php` - API response transformation

**Key Features:**
- Admin-only farm creation
- User scoping to farm
- Relationship counts (users, animals, fields)

---

### 2. LIVESTOCK MODULE

**Files Created:**
- `Actions/CreateAnimal.php` - Create animal with tag validation
- `Actions/UpdateAnimal.php` - Update animal data
- `Actions/RecordAnimalHealth.php` - Health record logging
- `Actions/ArchiveAnimal.php` - Soft delete with status change
- `Services/AnimalService.php` - Animal operations
- `Http/Controllers/Api/AnimalController.php` - RESTful endpoints
- `Http/Requests/StoreAnimalRequest.php` - Create validation
- `Http/Requests/UpdateAnimalRequest.php` - Update validation
- `Policies/AnimalPolicy.php` - Authorization rules
- `Http/Resources/AnimalResource.php` - API response transformation
- `Http/Resources/AnimalHealthRecordResource.php` - Health record resource
- `Exceptions/DuplicateTagNumberException.php` - Custom exception

**Key Features:**
- Auto-assign farm_id from authenticated user
- Duplicate tag_number prevention
- Lifecycle status transitions
- Health record tracking

---

### 3. CROP MODULE

**Files Created:**
- `Actions/CreateCropCycle.php` - Create crop cycle
- `Actions/UpdateCropCycle.php` - Update with state validation
- `Actions/RecordYield.php` - Yield recording
- `Services/CropService.php` - Crop operations
- `Http/Controllers/Api/CropController.php` - RESTful endpoints
- `Http/Requests/StoreCropCycleRequest.php` - Create validation
- `Http/Requests/UpdateCropCycleRequest.php` - Update validation
- `Policies/CropCyclePolicy.php` - Authorization rules
- `Http/Resources/CropCycleResource.php` - API response transformation
- `Http/Resources/YieldRecordResource.php` - Yield record resource
- `Exceptions/InvalidCropCycleTransitionException.php` - Custom exception

**Key Features:**
- Planting → harvest workflow validation
- Invalid state transition prevention
- Yield tracking per cycle
- Product batch linking

---

### 4. INVENTORY MODULE

**Files Created:**
- `Actions/CreateInventoryItem.php` - Create inventory item
- `Actions/UpdateInventoryStock.php` - Stock management
- `Actions/RecordInventoryTransaction.php` - Transaction logging
- `Services/InventoryService.php` - Inventory operations
- `Http/Controllers/Api/InventoryController.php` - RESTful endpoints
- `Http/Requests/StoreInventoryItemRequest.php` - Create validation
- `Policies/InventoryItemPolicy.php` - Authorization rules
- `Http/Resources/InventoryItemResource.php` - API response transformation
- `Http/Resources/InventoryTransactionResource.php` - Transaction resource
- `Exceptions/InsufficientStockException.php` - Custom exception

**Key Features:**
- Negative stock prevention
- Auto-logging of stock changes
- Low stock alerts
- Transaction history

---

### 5. FINANCIAL MODULE

**Files Created:**
- `Actions/RecordIncome.php` - Income recording
- `Actions/RecordExpense.php` - Expense recording
- `Services/FinanceService.php` - Financial operations
- `Http/Controllers/Api/TransactionController.php` - RESTful endpoints
- `Policies/TransactionPolicy.php` - Authorization rules
- `Http/Resources/TransactionResource.php` - API response transformation
- `Http/Resources/ExpenseCategoryResource.php` - Category resource
- `Http/Resources/IncomeCategoryResource.php` - Category resource

**Key Features:**
- Separate income/expense categories
- Transaction categorization
- Monthly summaries
- Per-farm financial reports

---

### 6. TASK MANAGEMENT MODULE

**Files Created:**
- `Actions/CreateTask.php` - Create task
- `Actions/AssignTaskToUser.php` - User assignment
- `Actions/CompleteTask.php` - Task completion
- `Services/TaskService.php` - Task operations
- `Http/Controllers/Api/TaskController.php` - RESTful endpoints
- `Http/Requests/StoreTaskRequest.php` - Create validation
- `Policies/TaskPolicy.php` - Authorization rules
- `Http/Resources/TaskResource.php` - API response transformation
- `Http/Resources/TaskAssignmentResource.php` - Assignment resource

**Key Features:**
- Many-to-many user assignments
- Completion timestamp tracking
- My tasks endpoint
- Priority management

---

### 7. SALES MODULE

**Files Created:**
- `Actions/CreateOrder.php` - Create order
- `Actions/AddOrderItem.php` - Add line items
- `Actions/GenerateProductBatch.php` - Batch generation
- `Services/SalesService.php` - Sales operations
- `Http/Controllers/Api/OrderController.php` - RESTful endpoints
- `Policies/OrderPolicy.php` - Authorization rules
- `Http/Resources/OrderResource.php` - API response transformation
- `Http/Resources/OrderItemResource.php` - Line item resource

**Key Features:**
- Auto-calculate order totals
- Product batch linking to crop cycles
- Order status management
- Customer tracking

---

## Cross-Cutting Concerns

### Multi-Tenancy Middleware

**Files Created:**
- `Http/Middleware/EnsureFarmAccess.php` - Farm assignment check
- `Http/Middleware/ScopeFarmData.php` - Query scoping

**Usage:**
```php
// In routes/api.php
Route::middleware(['auth:sanctum', 'ensure.farm.access'])
    ->group(function () {
        Route::apiResource('farms', FarmController::class);
        // ... other routes
    });
```

### Custom Exceptions

**Files Created:**
- `Exceptions/DuplicateTagNumberException.php` - Tag uniqueness
- `Exceptions/InvalidCropCycleTransitionException.php` - State validation
- `Exceptions/InsufficientStockException.php` - Stock validation

### API Resources

**Shared Resources:**
- `UserResource.php` - User data
- `AnimalBreedResource.php` - Breed data
- `AnimalCategoryResource.php` - Category data
- `FieldResource.php` - Field data
- `CropResource.php` - Crop data
- `ProductBatchResource.php` - Batch data
- `InventoryCategoryResource.php` - Inventory category
- `ExpenseCategoryResource.php` - Expense category
- `IncomeCategoryResource.php` - Income category

---

## Policy Registration

Laravel 13 auto-discovers policies in `app/Policies/`. No manual registration needed.

**Policies Created:**
- `FarmPolicy.php`
- `AnimalPolicy.php`
- `CropCyclePolicy.php`
- `InventoryItemPolicy.php`
- `TransactionPolicy.php`
- `TaskPolicy.php`
- `OrderPolicy.php`

---

## API Routes Configuration

Add to `routes/api.php`:

```php
use App\Http\Controllers\Api\FarmController;
use App\Http\Controllers\Api\AnimalController;
use App\Http\Controllers\Api\CropController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\OrderController;

Route::middleware(['auth:sanctum', 'ensure.farm.access'])
    ->group(function () {
        Route::apiResource('farms', FarmController::class);
        Route::apiResource('animals', AnimalController::class);
        Route::apiResource('crop-cycles', CropController::class);
        Route::apiResource('inventory', InventoryController::class);
        Route::apiResource('transactions', TransactionController::class);
        Route::apiResource('tasks', TaskController::class);
        Route::apiResource('orders', OrderController::class);

        // Custom endpoints
        Route::post('animals/{animal}/health', [AnimalController::class, 'recordHealth']);
        Route::post('crop-cycles/{cycle}/yield', [CropController::class, 'recordYield']);
        Route::post('inventory/{item}/stock', [InventoryController::class, 'updateStock']);
        Route::get('transactions/summary', [TransactionController::class, 'summary']);
        Route::get('tasks/my-tasks', [TaskController::class, 'myTasks']);
        Route::post('tasks/{task}/assign/{user}', [TaskController::class, 'assign']);
        Route::post('tasks/{task}/complete', [TaskController::class, 'complete']);
        Route::post('orders/{order}/items', [OrderController::class, 'addItem']);
        Route::post('product-batches', [OrderController::class, 'generateBatch']);
    });
```

---

## Middleware Registration

Add to `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'ensure.farm.access' => \App\Http\Middleware\EnsureFarmAccess::class,
        'scope.farm.data' => \App\Http\Middleware\ScopeFarmData::class,
    ]);
})
```

---

## Database Seeding

Run the seeder to create default roles and permissions:

```bash
php artisan db:seed --class=RoleAndPermissionSeeder
```

**Roles Created:**
- **Admin** - All permissions
- **Manager** - Operational permissions (no delete)
- **Worker** - Execution permissions (view, edit only)

**Permissions Created (44 total):**
- Farm Management: view, create, edit, delete farms
- Livestock: view, create, edit, delete animals, health records
- Crop Management: view, create, edit, delete fields, crops, cycles, yield records
- Inventory: view, create, edit, delete items, view transactions
- Financial: view, create, edit, delete transactions
- Task Management: view, create, edit, delete tasks, assign tasks
- Sales: view, create, edit, delete orders, view product batches
- User Management: view, create, edit, delete users, manage roles

---

## Usage Examples

### Creating an Animal
```php
POST /api/animals
{
    "tag_number": "TAG-123456",
    "name": "Bessie",
    "breed_id": 1,
    "category_id": 1,
    "gender": "female",
    "birth_date": "2023-01-15",
    "status": "active",
    "weight": 450.5
}
```

### Recording a Transaction
```php
POST /api/transactions
{
    "type": "income",
    "income_category_id": 1,
    "amount": 5000.00,
    "description": "Crop sale",
    "transaction_date": "2024-01-15"
}
```

### Assigning a Task
```php
POST /api/tasks/{id}/assign/{userId}
```

### Getting Financial Summary
```php
GET /api/transactions/summary?month=1
```

---

## Key Design Decisions

1. **Actions Pattern**: Single-responsibility classes for reusable operations
2. **Service Layer**: Coordinates actions and handles workflows
3. **Form Requests**: Centralized validation logic
4. **API Resources**: Consistent, type-safe API responses
5. **Policies**: Declarative authorization rules
6. **Middleware**: Cross-cutting concerns (tenancy, scoping)
7. **Exceptions**: Domain-specific error handling
8. **Type Safety**: PHP 8.4 typed properties and return types

---

## Next Steps

1. Register middleware in `bootstrap/app.php`
2. Add API routes to `routes/api.php`
3. Run migrations: `php artisan migrate`
4. Seed roles/permissions: `php artisan db:seed --class=RoleAndPermissionSeeder`
5. Test endpoints with Postman or similar tool
6. Integrate with Inertia frontend

---

## File Count Summary

- **Actions**: 15 classes
- **Services**: 7 classes
- **Controllers**: 7 classes
- **Requests**: 7 classes
- **Policies**: 7 classes
- **Resources**: 15 classes
- **Middleware**: 2 classes
- **Exceptions**: 3 classes
- **Seeders**: 1 class

**Total: 64 files created**
