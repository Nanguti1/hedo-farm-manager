<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Farm Management
            'view farms',
            'create farms',
            'edit farms',
            'delete farms',

            // Livestock Management
            'view animals',
            'create animals',
            'edit animals',
            'delete animals',
            'view animal health records',
            'create animal health records',

            // Crop Management
            'view fields',
            'create fields',
            'edit fields',
            'delete fields',
            'view crops',
            'create crops',
            'edit crops',
            'delete crops',
            'view crop cycles',
            'create crop cycles',
            'edit crop cycles',
            'delete crop cycles',
            'view yield records',

            // Inventory Management
            'view inventory',
            'create inventory items',
            'edit inventory items',
            'delete inventory items',
            'view inventory transactions',

            // Financial Management
            'view transactions',
            'create transactions',
            'edit transactions',
            'delete transactions',

            // Task Management
            'view tasks',
            'create tasks',
            'edit tasks',
            'delete tasks',
            'assign tasks',

            // Sales Management
            'view orders',
            'create orders',
            'edit orders',
            'delete orders',
            'view product batches',

            // User Management
            'view users',
            'create users',
            'edit users',
            'delete users',
            'manage roles',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles and assign permissions
        $admin = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $admin->givePermissionTo(Permission::all());

        $manager = Role::firstOrCreate(['name' => 'Manager', 'guard_name' => 'web']);
        $manager->givePermissionTo([
            'view farms',
            'edit farms',
            'view animals',
            'create animals',
            'edit animals',
            'view animal health records',
            'create animal health records',
            'view fields',
            'create fields',
            'edit fields',
            'view crops',
            'create crops',
            'edit crops',
            'view crop cycles',
            'create crop cycles',
            'edit crop cycles',
            'view yield records',
            'view inventory',
            'create inventory items',
            'edit inventory items',
            'view inventory transactions',
            'view transactions',
            'create transactions',
            'edit transactions',
            'view tasks',
            'create tasks',
            'edit tasks',
            'assign tasks',
            'view orders',
            'create orders',
            'edit orders',
            'view product batches',
            'view users',
            'create users',
            'edit users',
        ]);

        $worker = Role::firstOrCreate(['name' => 'Worker', 'guard_name' => 'web']);
        $worker->givePermissionTo([
            'view farms',
            'view animals',
            'edit animals',
            'view animal health records',
            'create animal health records',
            'view fields',
            'view crops',
            'view crop cycles',
            'edit crop cycles',
            'view yield records',
            'view inventory',
            'edit inventory items',
            'view inventory transactions',
            'view tasks',
            'edit tasks',
            'view orders',
            'view product batches',
        ]);
    }
}
