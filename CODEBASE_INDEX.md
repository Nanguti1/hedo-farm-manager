# Codebase Index

This file summarizes the current repository structure, key entry points, and the main areas to inspect when working on the project.

## 1. Project Overview

- **Backend Framework**: Laravel 13 (PHP 8.4)
- **Frontend Stack**: Inertia.js v3 (React 19 + TypeScript)
- **Styling**: Tailwind CSS v4
- **Database**: MySQL (Local) / SQLite (Testing)
- **Authentication**: Laravel Fortify v1 (frontend-agnostic authentication backend)
- **Access Control**: Spatie Laravel-Permission (Roles & Permissions)
- **Routing & Tooling**: Laravel Wayfinder v0, Vite, Laravel Pint v1, PHPUnit v12, Prettier v3, ESLint v9

---

## 2. Top-Level Structure

- `app/` — Core Laravel application PHP code (Models, Actions, Services, Controllers, Middleware, Policies, etc.)
- `bootstrap/` — Application bootstrapping, configuration, and middleware registration
- `config/` — Configuration files for framework, database, session, Fortify, etc.
- `database/` — Database migrations, factories, and seeders
- `public/` — Web entrypoint (`index.php`) and compiled static assets
- `resources/` — Source assets: JS (Inertia React app), CSS (Tailwind), Blade views
- `routes/` — Route definitions (`web.php`, `farm.php`, `settings.php`, `console.php`)
- `tests/` — Test suite containing feature and unit tests (PHPUnit)
- `storage/` — Generated cache, logs, sessions, and uploads

---

## 3. Backend Architecture & Components

### A. Eloquent Models (`app/Models/`)
The application defines standard Eloquent models corresponding to domain entities:
1. `User` - Farm workers, managers, and administrators
2. `Farm` - Multi-tenant farm profiles
3. `Field` - Farm fields/zones for crop growing
4. `Animal` - Individual livestock animals
5. `AnimalBreed` - Livestock breed categories
6. `AnimalCategory` - Livestock species categories
7. `AnimalHealthRecord` - Medical/treatment records for individual animals
8. `Crop` - Cultivated crop definitions
9. `CropCycle` - Historical and ongoing crop planting cycles
10. `YieldRecord` - Harvest outputs recorded per crop cycle
11. `InventoryCategory` - Classification for inventory items
12. `InventoryItem` - Tracked physical goods/assets (seeds, fertilizer, feed, tools)
13. `InventoryTransaction` - Stock adjustments and audit trails
14. `ExpenseCategory` - Types of cash outflows
15. `IncomeCategory` - Types of cash inflows
16. `Transaction` - Ledger of financial operations (income & expense)
17. `Task` - Operations to be completed on the farm
18. `TaskAssignment` - Worker assignments for specific tasks
19. `Order` - Customer purchases and sales orders
20. `OrderItem` - Line items for sales orders
21. `ProductBatch` - Traceable batches of farm product linked to crop cycles
22. `Schedule` - Recurring calendar schedules for operational processes
23. `Contact` - Suppliers, vendors, customers, and partners

### B. Business Logic Services (`app/Services/`)
Services orchestrate business logic across models, calling Actions and managing workflow-level logic:
- `FarmService` - Manages farm setup, user assignments, and dashboard-level aggregations
- `AnimalService` - Coordinates livestock inventory, lineage, breeding, and health records
- `CropService` - Manages field allocations, crop cycle transitions, and yield statistics
- `InventoryService` - Processes stock level adjustments, replenishment alerts, and inventory audits
- `FinanceService` - Oversees ledger entries, monthly cashflow summaries, and profit/loss reports
- `TaskService` - Coordinates staff task schedules, priorities, assignments, and completions
- `SalesService` - Manages order processing, customer records, and product batch trace links
- `ScheduleService` - Coordinates scheduled operations, events, and calendar alerts
- `ContactService` - Manages supplier, customer, and partner directory interactions

### C. Single-Responsibility Actions (`app/Actions/`)
Highly granular, testable execution blocks for discrete write-operations:
- `CreateFarm` / `UpdateFarm`
- `CreateAnimal` / `UpdateAnimal` / `ArchiveAnimal` / `RecordAnimalHealth`
- `CreateCropCycle` / `UpdateCropCycle` / `RecordYield`
- `CreateInventoryItem` / `UpdateInventoryItem` / `UpdateInventoryStock` / `RecordInventoryTransaction`
- `RecordIncome` / `RecordExpense`
- `CreateTask` / `AssignTaskToUser` / `CompleteTask`
- `CreateOrder` / `AddOrderItem` / `GenerateProductBatch`
- `CreateSchedule` / `UpdateSchedule`
- `CreateContact` / `UpdateContact`
- `Fortify/CreateNewUser` - User registration logic
- `Fortify/ResetUserPassword` - Password reset mechanics

### D. Current Contact Workflow (relevant to `app/Actions/UpdateContact.php`)
This is the most direct implementation path for the contact-management code currently in the editor:
- `app/Actions/CreateContact.php` — validates and creates a contact tied to the current farm.
- `app/Actions/UpdateContact.php` — validates partial updates and persists changes to an existing contact.
- `app/Services/ContactService.php` — wraps the create/update actions and exposes the farm-scoped contact operations.
- `app/Http/Controllers/ContactController.php` — handles list, create, show, edit, update, and delete routes for contacts.
- `app/Policies/ContactPolicy.php` — enforces `view contacts`, `create contacts`, `edit contacts`, and `delete contacts` permissions on farm-owned records.
- `resources/js/pages/Contacts/Index.tsx`, `Create.tsx`, `Edit.tsx`, `Show.tsx` — Inertia pages that render the UI for the contact flow.

### E. Route & Web Controllers (`app/Http/Controllers/`)
Handling HTTP requests, session logic, and returning Inertia view rendering objects:
- `FarmController` - Dashboard summary and farm configuration
- `AnimalController` - Livestock listing, details, health additions, and archiving
- `CropController` - Crop cycle progress, field planting, and yield entry
- `InventoryController` - Inventory item catalogs, stock logs, and manual adjustments
- `TransactionController` - Ledger logging, filterable lists, and financial statements
- `TaskController` - Task lists, worker assignments, status updates, and staff my-tasks page
- `OrderController` - Order processing, item additions, and batch registrations
- `ScheduleController` - Planning schedules and calendar timelines
- `ContactController` - Contact directory and profile details
- `Settings/ProfileController` - Personal details & security forms
- `Settings/SecurityController` - Two-Factor Authentication & password updates

---

## 4. Frontend Application Structure

The client application is built with React 19 inside `resources/js/`:

- `resources/js/app.tsx` — Front-end entry point initiating the Inertia rendering loop
- `resources/js/layouts/` — Layout definitions:
  - `app-layout.tsx` - Layout with sidebar, top header navigation, and mobile responsive menus
- `resources/js/pages/` — Inertia React page bundles:
  - `Dashboard.tsx` - Operational dashboards with metrics and quick actions
  - `Farms/` - Farm list and configuration screens
  - `Animals/` - Livestock registries, detail pages, and record inputs
  - `Crops/` - Field details, planting records, and harvest forms
  - `Inventory/` - Stock levels, catalog items, and stock-adjustment dialogs
  - `Transactions/` - Income & expense ledgers, monthly graphs, and category management
  - `Tasks/` - Task boards, lists, worker checkboxes, and personal task logs
  - `Orders/` - Customer order tracking, itemization interfaces, and product tracing
  - `Contacts/` - Vendor and customer directories
  - `Schedules/` - Calendar/planner timelines
  - `Auth/` - Authentication screens (Login, Registration, 2FA, Password Reset)
  - `Settings/` - Profile and security configurations
- `resources/js/components/` — Shared UI elements (buttons, forms, cards, tables, badges, dialogs)
- `resources/js/hooks/` — Custom utility hooks (authentication status, flash notifications, polling)
- `resources/js/lib/` — Utilities, date formatters, currency handlers, and helper classes

---

## 5. Security & Multi-Tenancy

### Multi-Tenancy
All operational modules are strictly multi-tenant. The system enforces tenant partitioning via:
- `EnsureFarmAccess` middleware — Confirms the authenticated user is authorized for the target farm ID.
- `ScopeFarmData` middleware — Globally applies database query scopes to ensure users can only query and write to their farm context.

### Access Control & Authorization
Roles and Permissions are seeded via `RoleAndPermissionSeeder.php` with 44 distinct permissions:
- **Admin**: Full read/write/delete access across all resources.
- **Manager**: Operational read/write capability (no delete operations allowed).
- **Worker**: View and edit-only permissions for operational tracking.

Model-level permissions are declaratively enforced using auto-discovered Laravel Policies in `app/Policies/`:
- `FarmPolicy`, `AnimalPolicy`, `CropCyclePolicy`, `InventoryItemPolicy`, `TransactionPolicy`, `TaskPolicy`, `OrderPolicy`, etc.

---

## 6. Development Workflow & Commands

### Code Formatting
This project uses **Laravel Pint** to enforce stylistic consistency. Before submitting changes, format your PHP code:
```bash
vendor/bin/pint --format agent
```

### Build Tools & Asset Compiling
Run the Vite development server to compile React pages on-the-fly:
```bash
npm run dev
```

Run a full local environment using Composer (starting both web server and hot-reloads):
```bash
composer run dev
```

Build production static assets:
```bash
npm run build
```

---

## 7. Recommended Starting Points

To inspect, extend, or troubleshoot specific features, start with these entrypoints:
1. **Routing and Page Mapping**: `routes/web.php` and `routes/farm.php`
2. **Business Workflows**: `app/Services/` combined with `app/Actions/`
3. **Current Contact Flow**: `app/Actions/UpdateContact.php`, `app/Services/ContactService.php`, and `resources/js/pages/Contacts/`
4. **Database Definitions**: `database/migrations/` and `app/Models/`
5. **Interactive Interfaces**: `resources/js/pages/`
