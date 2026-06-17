# App Directory Index

This directory contains the core Laravel application logic, organized by responsibility following a Clean Architecture approach within the Laravel ecosystem.

## 1. Domain Models (`Models/`)
The data layer of the application, representing the entities within the Farm Management System.

- **Livestock**: `Animal`, `AnimalBreed`, `AnimalCategory`, `AnimalHealthRecord`
- **Crops**: `Crop`, `CropCycle`, `Field`, `YieldRecord`
- **Inventory**: `InventoryItem`, `InventoryCategory`, `InventoryTransaction`
- **Finance**: `Transaction`, `IncomeCategory`, `ExpenseCategory`
- **Operations**: `Task`, `TaskAssignment`, `Order`, `OrderItem`, `ProductBatch`, `Schedule`
- **Core**: `User`, `Farm`, `Contact`
- **Stubs**: `GrowLocation`, `Planting` (Database schema exists, application logic pending)

## 2. Business Logic Layer (`Services/`)
Services orchestrate complex, multi-step workflows and act as the primary interface for controllers.

- `AnimalService`: Livestock inventory, health, and lineage.
- `CropService`: Field allocations, cycle transitions, and yield stats.
- `FarmService`: Farm setup, tenant management, and dashboard aggregations.
- `FinanceService`: Ledger entries, cashflow, and P&L reports.
- `InventoryService`: Stock adjustments and replenishment.
- `SalesService`: Order processing and product batch tracing.
- `TaskService`: Staff assignments and priority management.
- `ContactService`: Supplier and customer directory management.
- `ScheduleService`: Recurring operations and calendar events.

## 3. Atomic Operations (`Actions/`)
Single-responsibility classes for discrete write operations, following the "Action" pattern.

- **Farm**: `CreateFarm`, `UpdateFarm`
- **Animal**: `CreateAnimal`, `UpdateAnimal`, `ArchiveAnimal`, `RecordAnimalHealth`
- **Crop**: `CreateCropCycle`, `UpdateCropCycle`, `RecordYield`
- **Inventory**: `CreateInventoryItem`, `UpdateInventoryItem`, `UpdateInventoryStock`, `RecordInventoryTransaction`
- **Finance**: `RecordIncome`, `RecordExpense`
- **Tasks**: `CreateTask`, `AssignTaskToUser`, `CompleteTask`
- **Sales**: `CreateOrder`, `AddOrderItem`, `GenerateProductBatch`
- **Contacts**: `CreateContact`, `UpdateContact`
- **Authentication**: `Fortify/CreateNewUser`, `Fortify/ResetUserPassword`

## 4. HTTP & Transport Layer (`Http/`)
Handling requests and delivering responses via Inertia (Web) or JSON (API).

### Controllers
- **Inertia Controllers**: Root of `Controllers/` handles React/Inertia view rendering (e.g., `AnimalController`, `ContactController`).
- **API Controllers**: `Controllers/Api/` sub-directory for stateless JSON responses.
- **Settings**: `Controllers/Settings/` for profile and security management.

### Data Shaping (`Resources/`)
Eloquent API Resources for consistent data transformation (e.g., `UserResource`, `AnimalResource`).

### Validation (`Requests/`)
Form Request classes for centralized validation logic (e.g., `StoreAnimalRequest`, `UpdateContactRequest`).

### Middleware
- `EnsureFarmAccess`: Multi-tenancy authorization.
- `ScopeFarmData`: Automatic database scoping (Experimental/STUB).
- `HandleInertiaRequests`: Global prop sharing for the frontend.

## 5. Authorization & Security (`Policies/`)
Granular permission enforcement for all models (e.g., `AnimalPolicy`, `OrderPolicy`).

## 6. Infrastructure & Utilities
- `Concerns/`: Reusable traits (e.g., `PasswordValidationRules`).
- `Exceptions/`: Domain-specific exceptions (e.g., `InsufficientStockException`).
- `Providers/`: Service provider registrations (`AppServiceProvider`, `FortifyServiceProvider`).
