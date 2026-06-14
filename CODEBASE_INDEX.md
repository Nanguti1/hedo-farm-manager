# Codebase Index

This file summarizes the current repository structure, key entry points, and the main areas to inspect when working on the project.

## 1. Project Overview

- Framework: Laravel 13 + Inertia.js v3 + React 19
- Backend language: PHP 8.4
- Frontend language: TypeScript + React
- Styling: Tailwind CSS v4
- Test stack: PHPUnit
- Package tooling: Composer + npm

## 2. Top-Level Structure

- `app/` — Laravel application code (controllers, models, actions, services, policies, middleware)
- `bootstrap/` — Laravel bootstrap and middleware registration
- `config/` — framework and app configuration
- `database/` — migrations, factories, seeders
- `resources/js/` — Inertia/React frontend application
- `resources/views/` — Blade views and shared HTML shell
- `routes/` — route definitions for web and farm-scoped pages
- `tests/` — PHPUnit feature and unit tests
- `public/` — public web entry and built assets
- `vendor/` — installed Composer dependencies

## 3. Backend Entry Points

### Core application code
- `app/Http/Controllers/` — page controllers for farms, animals, crops, inventory, orders, reports, schedules, tasks, transactions
- `app/Actions/` — business actions for create/update/record workflows
- `app/Services/` — service layer coordinating actions and business logic
- `app/Models/` — Eloquent models for domain entities
- `app/Policies/` — authorization rules for domain resources
- `app/Http/Middleware/` — auth and farm-access middleware

### Routing
- `routes/web.php` — main app routing and dashboard entry
- `routes/farm.php` — farm-scoped resource routes for operational modules
- `routes/settings.php` — settings/profile/security routes
- `routes/console.php` — Artisan console commands

## 4. Frontend Entry Points

### Main React app
- `resources/js/app.tsx` — frontend bootstrap for Inertia
- `resources/js/layouts/` — shared layouts for the app shell
- `resources/js/components/` — reusable UI components
- `resources/js/hooks/` — custom React hooks
- `resources/js/lib/` — helper utilities and shared logic
- `resources/js/pages/` — Inertia page components grouped by domain

### Primary page areas
- `resources/js/pages/dashboard.tsx` — dashboard landing page
- `resources/js/pages/Farms/` — farms management pages
- `resources/js/pages/Animals/` — livestock pages
- `resources/js/pages/Crops/` — crop cycle pages
- `resources/js/pages/Inventory/` — inventory pages
- `resources/js/pages/Transactions/` — financial transaction pages
- `resources/js/pages/Tasks/` — task management pages
- `resources/js/pages/Orders/` — order/sales pages
- `resources/js/pages/Reports/` — reporting pages
- `resources/js/pages/Schedules/` — schedule pages
- `resources/js/pages/Contacts/` — contact pages
- `resources/js/pages/auth/` — login, registration, password reset flows
- `resources/js/pages/settings/` — user settings pages

## 5. Important Supporting Docs

- `AGENTS.md` — project guidelines and Laravel Boost instructions
- `BUSINESS_LOGIC_LAYER_SUMMARY.md` — backend business logic architecture summary
- `INERTIA_BUSINESS_LOGIC_LAYER.md` — Inertia/React business logic and route mapping
- `README.md` — project overview and setup notes

## 6. Tooling and Build Commands

### Backend
- `composer install`
- `php artisan test`
- `php artisan route:list`
- `php artisan serve`

### Frontend
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint:check`
- `npm run types:check`

### Full dev workflow
- `composer run dev`

## 7. Recommended Starting Points

If you are new to this repository, start here:

1. `routes/web.php` and `routes/farm.php` for application flow
2. `app/Http/Controllers/` for request handling
3. `app/Actions/` and `app/Services/` for business logic
4. `resources/js/pages/` for UI screens
5. `tests/` for expected behavior and validation
