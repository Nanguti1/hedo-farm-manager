import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Shield, Trash2, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Role {
    id: number;
    name: string;
    permissions: { name: string }[];
}

interface PageProps {
    roles: Role[];
}

export default function RoleIndex({ roles }: PageProps) {
    const handleDelete = (role: Role) => {
        if (role.name === 'Admin') {
            alert('Cannot delete Admin role');
            return;
        }
        if (confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
            router.delete(`/roles/${role.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Role Management', href: '/roles' }]}>
            <Head title="Role Management" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Role Management</h1>
                        <p className="text-muted-foreground">Define system roles and their permissions</p>
                    </div>
                    <Button asChild>
                        <Link href="/roles/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Role
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Permissions
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {roles.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Shield className="h-5 w-5 text-indigo-500 mr-2" />
                                            <span className="font-medium text-gray-900">{role.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {role.permissions.slice(0, 10).map((perm) => (
                                                <Badge key={perm.name} variant="secondary" className="text-[10px]">
                                                    {perm.name}
                                                </Badge>
                                            ))}
                                            {role.permissions.length > 10 && (
                                                <Badge variant="outline" className="text-[10px]">
                                                    +{role.permissions.length - 10} more
                                                </Badge>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <Link
                                            href={`/roles/${role.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Edit
                                        </Link>
                                        {role.name !== 'Admin' && (
                                            <button
                                                onClick={() => handleDelete(role)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
