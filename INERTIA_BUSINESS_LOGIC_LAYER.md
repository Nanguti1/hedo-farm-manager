# Multi-Farm Management System - Inertia/React Business Logic Layer

## Overview
Complete production-ready business logic layer for a multi-tenant farm management system built with Laravel 13, PHP 8.4, Inertia v3, React 19, and Spatie Permissions.

**Primary Use Case**: Web application with Inertia/React
**Future Use Cases**: Mobile app, REST API

---

## Architecture Principles

### 1. **Inertia-First Controllers**
- Controllers return Inertia responses for pages
- Redirect responses for form submissions
- Flash messages for user feedback
- No JSON responses (reserved for future API)

### 2. **Service Layer (Unchanged)**
- Coordinate complex workflows
- Manage multiple Actions
- Handle domain logic
- Framework-agnostic

### 3. **Actions (Unchanged)**
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

### 6. **Validation**
- Form Requests for validation
- Laravel's built-in validation
- Automatic redirect with errors on failure

### 7. **Data Passing**
- Models and collections passed directly to Inertia
- API Resources kept for future REST API use
- Type-safe with TypeScript on frontend

---

## Module Breakdown

### 1. FARM MODULE

**Controller:** `app/Http/Controllers/FarmController.php`

**Routes:**
```php
Route::resource('farms', FarmController::class);
```

**Methods:**
- `index()` - List all farms (admin only)
- `create()` - Show create form
- `store()` - Create farm
- `show()` - Show farm details
- `edit()` - Show edit form
- `update()` - Update farm
- `destroy()` - Delete farm

**Inertia Pages:**
- `Farms/Index` - Farm list
- `Farms/Create` - Create form
- `Farms/Show` - Farm details
- `Farms/Edit` - Edit form

---

### 2. LIVESTOCK MODULE

**Controller:** `app/Http/Controllers/AnimalController.php`

**Routes:**
```php
Route::resource('animals', AnimalController::class);
Route::post('animals/{animal}/health', [AnimalController::class, 'recordHealth']);
```

**Methods:**
- `index()` - List animals for user's farm
- `create()` - Show create form
- `store()` - Create animal
- `show()` - Show animal details
- `edit()` - Show edit form
- `update()` - Update animal
- `destroy()` - Archive animal
- `recordHealth()` - Record health check

**Inertia Pages:**
- `Animals/Index` - Animal list
- `Animals/Create` - Create form
- `Animals/Show` - Animal details
- `Animals/Edit` - Edit form

---

### 3. CROP MODULE

**Controller:** `app/Http/Controllers/CropController.php`

**Routes:**
```php
Route::resource('crops', CropController::class);
Route::post('crops/{cycle}/yield', [CropController::class, 'recordYield']);
```

**Methods:**
- `index()` - List crop cycles for user's farm
- `create()` - Show create form
- `store()` - Create crop cycle
- `show()` - Show crop cycle details
- `edit()` - Show edit form
- `update()` - Update crop cycle
- `recordYield()` - Record harvest yield

**Inertia Pages:**
- `Crops/Index` - Crop cycle list
- `Crops/Create` - Create form
- `Crops/Show` - Crop cycle details
- `Crops/Edit` - Edit form

---

### 4. INVENTORY MODULE

**Controller:** `app/Http/Controllers/InventoryController.php`

**Routes:**
```php
Route::prefix('inventory')->name('inventory.')->group(function () {
    Route::get('/', [InventoryController::class, 'index'])->name('index');
    Route::get('/create', [InventoryController::class, 'create'])->name('create');
    Route::post('/', [InventoryController::class, 'store'])->name('store');
    Route::get('/{item}', [InventoryController::class, 'show'])->name('show');
    Route::post('/{item}/stock', [InventoryController::class, 'updateStock'])->name('stock');
});
```

**Methods:**
- `index()` - List inventory items
- `create()` - Show create form
- `store()` - Create inventory item
- `show()` - Show item details
- `updateStock()` - Adjust stock level

**Inertia Pages:**
- `Inventory/Index` - Inventory list
- `Inventory/Create` - Create form
- `Inventory/Show` - Item details

---

### 5. FINANCIAL MODULE

**Controller:** `app/Http/Controllers/TransactionController.php`

**Routes:**
```php
Route::prefix('transactions')->name('transactions.')->group(function () {
    Route::get('/', [TransactionController::class, 'index'])->name('index');
    Route::get('/create/{type?}', [TransactionController::class, 'create'])->name('create');
    Route::post('/', [TransactionController::class, 'store'])->name('store');
    Route::get('/{id}', [TransactionController::class, 'show'])->name('show');
    Route::get('/summary/{month?}', [TransactionController::class, 'summary'])->name('summary');
});
```

**Methods:**
- `index()` - List transactions (optional filter by type)
- `create()` - Show create form (income/expense)
- `store()` - Record transaction
- `show()` - Show transaction details
- `summary()` - Financial summary

**Inertia Pages:**
- `Transactions/Index` - Transaction list
- `Transactions/Create` - Create form
- `Transactions/Show` - Transaction details
- `Transactions/Summary` - Financial summary

---

### 6. TASK MANAGEMENT MODULE

**Controller:** `app/Http/Controllers/TaskController.php`

**Routes:**
```php
Route::prefix('tasks')->name('tasks.')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('index');
    Route::get('/my-tasks', [TaskController::class, 'myTasks'])->name('my');
    Route::get('/create', [TaskController::class, 'create'])->name('create');
    Route::post('/', [TaskController::class, 'store'])->name('store');
    Route::get('/{task}', [TaskController::class, 'show'])->name('show');
    Route::get('/{task}/edit', [TaskController::class, 'edit'])->name('edit');
    Route::post('/{task}/assign/{user}', [TaskController::class, 'assign'])->name('assign');
    Route::post('/{task}/complete', [TaskController::class, 'complete'])->name('complete');
});
```

**Methods:**
- `index()` - List all tasks for farm
- `myTasks()` - List tasks assigned to current user
- `create()` - Show create form
- `store()` - Create task
- `show()` - Show task details
- `edit()` - Show edit form
- `assign()` - Assign task to user
- `complete()` - Mark task as complete

**Inertia Pages:**
- `Tasks/Index` - Task list
- `Tasks/MyTasks` - My tasks
- `Tasks/Create` - Create form
- `Tasks/Show` - Task details
- `Tasks/Edit` - Edit form

---

### 7. SALES MODULE

**Controller:** `app/Http/Controllers/OrderController.php`

**Routes:**
```php
Route::prefix('orders')->name('orders.')->group(function () {
    Route::get('/', [OrderController::class, 'index'])->name('index');
    Route::get('/create', [OrderController::class, 'create'])->name('create');
    Route::post('/', [OrderController::class, 'store'])->name('store');
    Route::get('/{order}', [OrderController::class, 'show'])->name('show');
    Route::post('/{order}/items', [OrderController::class, 'addItem'])->name('items');
    Route::post('/product-batches', [OrderController::class, 'generateBatch'])->name('batches');
});
```

**Methods:**
- `index()` - List orders
- `create()` - Show create form
- `store()` - Create order
- `show()` - Show order details
- `addItem()` - Add item to order
- `generateBatch()` - Generate product batch

**Inertia Pages:**
- `Orders/Index` - Order list
- `Orders/Create` - Create form
- `Orders/Show` - Order details

---

## Route Configuration

All farm management routes are in `routes/farm.php` and automatically included in `routes/web.php`.

**Middleware Applied:**
- `auth` - User must be authenticated
- `verified` - User must have verified email
- `ensure.farm.access` - User must be assigned to a farm

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

## Flash Messages

Controllers use Laravel's flash messages for user feedback:

```php
// Success message
return redirect()
    ->route('farms.show', $farm->id)
    ->with('success', 'Farm created successfully');

// Error message
return back()
    ->with('error', 'Something went wrong');
```

**Displaying Flash Messages in React:**

Use Inertia's `usePage` hook or shared props to access flash messages:

```tsx
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;

    if (flash.success) {
        return <div className="bg-green-500">{flash.success}</div>;
    }

    if (flash.error) {
        return <div className="bg-red-500">{flash.error}</div>;
    }

    return null;
}
```

---

## Inertia Page Examples

### Farm Index Page (`resources/js/pages/Farms/Index.tsx`)

```tsx
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Farm {
    id: number;
    name: string;
    location: string;
    size: number;
    users_count: number;
    animals_count: number;
}

interface PageProps {
    farms: {
        data: Farm[];
        links: any[];
    };
}

export default function FarmIndex({ farms }: PageProps) {
    return (
        <AppLayout>
            <Head title="Farms" />
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Farms</h1>
                    <Link
                        href="/farms/create"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create Farm
                    </Link>
                </div>

                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Size</th>
                            <th>Users</th>
                            <th>Animals</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {farms.data.map((farm) => (
                            <tr key={farm.id}>
                                <td>{farm.name}</td>
                                <td>{farm.location}</td>
                                <td>{farm.size}</td>
                                <td>{farm.users_count}</td>
                                <td>{farm.animals_count}</td>
                                <td>
                                    <Link href={`/farms/${farm.id}`}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
```

### Animal Create Page (`resources/js/pages/Animals/Create.tsx`)

```tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { router } from '@inertiajs/react';

export default function AnimalCreate() {
    const { data, setData, post, processing, errors } = useForm({
        tag_number: '',
        name: '',
        breed_id: '',
        category_id: '',
        gender: 'female',
        birth_date: '',
        status: 'active',
        weight: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/animals');
    };

    return (
        <AppLayout>
            <Head title="Create Animal" />
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Create Animal</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Tag Number</label>
                        <input
                            type="text"
                            value={data.tag_number}
                            onChange={(e) => setData('tag_number', e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        />
                        {errors.tag_number && (
                            <span className="text-red-500">{errors.tag_number}</span>
                        )}
                    </div>

                    {/* More fields... */}

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create Animal
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
```

---

## TypeScript Types

Create type definitions for your pages in `resources/js/types/farm.ts`:

```typescript
export interface Animal {
    id: number;
    farm_id: number;
    tag_number: string;
    name: string | null;
    breed: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
    };
    gender: 'male' | 'female';
    birth_date: string;
    status: 'active' | 'sold' | 'dead';
    weight: number | null;
    health_records: HealthRecord[];
}

export interface HealthRecord {
    id: number;
    record_type: string;
    description: string;
    treatment_date: string;
    cost: number | null;
}

export interface Task {
    id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
    assigned_users: User[];
}
```

---

## Authorization in Frontend

Use Inertia's shared props to pass user permissions:

**In HandleInertiaRequests middleware:**

```php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user(),
            'permissions' => $request->user()?->getAllPermissions()->pluck('name') ?? [],
        ],
    ]);
}
```

**Use in React:**

```tsx
const { auth } = usePage().props;

const canCreateFarms = auth.permissions.includes('create farms');

{canCreateFarms && (
    <Link href="/farms/create">Create Farm</Link>
)}
```

---

## Data Transformation

For Inertia, you can pass models and collections directly. The API Resources created earlier can be:

1. **Kept for future REST API use** - They're already created
2. **Used selectively** - Transform complex relationships
3. **Skipped** - Pass models directly for simple cases

**Example - Using model directly:**

```php
// Controller
return Inertia::render('Animals/Show', [
    'animal' => $animal->load(['breed', 'category']),
]);
```

**Example - Using API Resource for complex data:**

```php
// Controller
use App\Http\Resources\AnimalResource;

return Inertia::render('Animals/Show', [
    'animal' => new AnimalResource($animal),
]);
```

---

## Future REST API Migration

When you're ready to build the REST API:

1. **Keep existing API controllers** (`app/Http/Controllers/Api/`)
2. **Create `routes/api.php`** with API routes
3. **Use API Resources** for all responses
4. **Apply Sanctum authentication** instead of session auth
5. **Keep Services, Actions, Requests, Policies unchanged**

The business logic layer is already structured to support both Inertia and API simultaneously.

---

## File Structure

```
app/
├── Actions/                    # Business logic operations
├── Services/                   # Workflow coordination
├── Http/
│   ├── Controllers/           # Inertia controllers (new)
│   │   ├── FarmController.php
│   │   ├── AnimalController.php
│   │   └── ...
│   ├── Controllers/Api/       # API controllers (for future use)
│   ├── Requests/              # Form requests (shared)
│   ├── Middleware/            # Middleware (shared)
│   └── Resources/             # API Resources (for future API)
├── Policies/                  # Authorization (shared)
└── Exceptions/                # Custom exceptions (shared)

routes/
├── web.php                    # Includes farm routes
└── farm.php                   # Farm management routes
```

---

## Key Differences from API Version

| Aspect | Inertia Version | API Version |
|--------|-----------------|-------------|
| Response Type | Inertia::render() / Redirect | JsonResponse |
| Data Passing | Models/Collections directly | API Resources |
| Error Handling | Redirect with flash messages | JSON error responses |
| Authentication | Session auth | Sanctum tokens |
| Routes | web.php | api.php |
| Middleware | Web middleware | API middleware |

---

## Next Steps

1. **Register middleware** in `bootstrap/app.php`
2. **Create Inertia pages** in `resources/js/pages/`
3. **Add TypeScript types** for props
4. **Create navigation** in sidebar/header
5. **Test form submissions** and validation
6. **Implement flash message** component
7. **Add loading states** with Inertia

---

## Summary

- ✅ **Controllers refactored** for Inertia
- ✅ **Routes configured** for web
- ✅ **Middleware updated** for redirect responses
- ✅ **Exceptions updated** to support both web and API
- ✅ **Services, Actions, Policies unchanged** (reusable)
- ✅ **API Resources kept** for future REST API
- ✅ **Form Requests unchanged** (shared validation)
- ✅ **Ready for React frontend development**
