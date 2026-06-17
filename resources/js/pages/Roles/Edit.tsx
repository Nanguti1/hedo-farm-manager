import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface PageProps {
    role: Role;
    permissions: Permission[];
}

export default function RoleEdit({ role, permissions }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: role.permissions.map((p) => p.name),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/roles/${role.id}`);
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
                { title: 'Role Management', href: '/roles' },
                { title: `Edit ${role.name}`, href: `/roles/${role.id}/edit` },
            ]}
        >
            <Head title={`Edit ${role.name}`} />

            <div className="max-w-2xl mx-auto py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Edit Role</h1>
                    <p className="text-muted-foreground">Update permissions for the "{role.name}" role</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="space-y-2">
                        <Label htmlFor="name">Role Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={role.name === 'Admin'}
                            required
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div className="space-y-4">
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-96 overflow-y-auto border rounded-md p-4 bg-gray-50">
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
                        {errors.permissions && <p className="text-sm text-red-600">{errors.permissions}</p>}
                    </div>

                    <div className="flex justify-end gap-4 border-t pt-6">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Update Role
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
