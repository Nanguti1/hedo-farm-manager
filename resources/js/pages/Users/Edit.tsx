import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import type { User } from '@/types/farm';

interface PageProps {
    user: User & { roles: { name: string }[]; permissions: { name: string }[] };
    roles: { id: number; name: string }[];
    permissions: { id: number; name: string }[];
}

export default function UserEdit({ user, roles, permissions }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        roles: user.roles.map((r) => r.name),
        permissions: user.permissions.map((p) => p.name),
        is_active: user.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    const toggleRole = (roleName: string) => {
        const currentRoles = [...data.roles];
        const index = currentRoles.indexOf(roleName);
        if (index > -1) {
            currentRoles.splice(index, 1);
        } else {
            currentRoles.push(roleName);
        }
        setData('roles', currentRoles);
    };

    const togglePermission = (permissionName: string) => {
        const currentPermissions = [...data.permissions];
        const index = currentPermissions.indexOf(permissionName);
        if (index > -1) {
            currentPermissions.splice(index, 1);
        } else {
            currentPermissions.push(permissionName);
        }
        setData('permissions', currentPermissions);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'User Management', href: '/users' },
                { title: `Edit ${user.name}`, href: `/users/${user.id}/edit` },
            ]}
        >
            <Head title={`Edit ${user.name}`} />

            <div className="max-w-4xl mx-auto py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Edit User</h1>
                    <p className="text-muted-foreground">Update account details for {user.name}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div className="border-t pt-4 space-y-4">
                                <h4 className="text-sm font-medium text-gray-900">Change Password (leave blank to keep current)</h4>
                                <div className="space-y-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirm New Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 pt-4">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Active Account</Label>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium border-b pb-2">Roles</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {roles.map((role) => (
                                        <div key={role.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`role-${role.id}`}
                                                checked={data.roles.includes(role.name)}
                                                onCheckedChange={() => toggleRole(role.name)}
                                            />
                                            <Label htmlFor={`role-${role.id}`} className="text-sm font-normal cursor-pointer">
                                                {role.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.roles && <p className="text-sm text-red-600">{errors.roles}</p>}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium border-b pb-2">Direct Permissions</h3>
                                <div className="h-64 border rounded-md p-4 overflow-y-auto bg-gray-50">
                                    <div className="grid grid-cols-1 gap-3">
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`perm-${permission.id}`}
                                                    checked={data.permissions.includes(permission.name)}
                                                    onCheckedChange={() => togglePermission(permission.name)}
                                                />
                                                <Label htmlFor={`perm-${permission.id}`} className="text-sm font-normal cursor-pointer">
                                                    {permission.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Note: Direct permissions are in addition to permissions inherited from roles.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 border-t pt-6">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Update User
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
