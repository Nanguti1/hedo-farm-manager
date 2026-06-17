<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class UpdatePermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // New permissions to add
        $newPermissions = [
            // Grow Location Management
            'view grow locations',
            'create grow locations',
            'edit grow locations',
            'delete grow locations',

            // Planting Management
            'view plantings',
            'create plantings',
            'edit plantings',
            'delete plantings',

            // Record Management
            'view harvests',
            'create harvests',
            'view nutrients',
            'create nutrients',
            'view treatments',
            'create treatments',
            'view soil samples',
            'create soil samples',
            'view notes',
            'create notes',
        ];

        foreach ($newPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Update Admin role (give all permissions)
        $admin = Role::findByName('Admin', 'web');
        $admin->givePermissionTo(Permission::all());

        // Update Manager role
        $manager = Role::findByName('Manager', 'web');
        $manager->givePermissionTo([
            'view grow locations',
            'create grow locations',
            'edit grow locations',
            'view plantings',
            'create plantings',
            'edit plantings',
            'view harvests',
            'create harvests',
            'view nutrients',
            'create nutrients',
            'view treatments',
            'create treatments',
            'view soil samples',
            'create soil samples',
            'view notes',
            'create notes',
        ]);

        // Update Worker role
        $worker = Role::findByName('Worker', 'web');
        $worker->givePermissionTo([
            'view grow locations',
            'view plantings',
            'edit plantings',
            'view harvests',
            'create harvests',
            'view nutrients',
            'create nutrients',
            'view treatments',
            'create treatments',
            'view notes',
            'create notes',
        ]);
    }
}
