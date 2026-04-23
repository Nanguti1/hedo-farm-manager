import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Edit, MapPin, Users, Beef, Wheat, Package } from 'lucide-react';
import type { Farm, User } from '@/types/farm';

interface PageProps {
    farm: Farm & {
        users: User[];
    };
}

export default function FarmShow({ farm }: PageProps) {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Farms', href: '/farms' },
            { title: farm.name, href: `/farms/${farm.id}` },
        ]}>
            <Head title={farm.name} />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">{farm.name}</h1>
                        <p className="text-muted-foreground">{farm.location}</p>
                    </div>
                    <Button asChild>
                        <Link href={`/farms/${farm.id}/edit`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Farm
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Size</p>
                                <p className="text-2xl font-bold">{farm.size} acres</p>
                            </div>
                            <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Users</p>
                                <p className="text-2xl font-bold">{farm.users_count ?? 0}</p>
                            </div>
                            <Users className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Animals</p>
                                <p className="text-2xl font-bold">{farm.animals_count ?? 0}</p>
                            </div>
                            <Beef className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="text-2xl font-bold">{farm.is_active ? 'Active' : 'Inactive'}</p>
                            </div>
                            <Wheat className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Description</h2>
                    <p className="text-gray-600">{farm.description || 'No description provided'}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Users</h2>
                    {farm.users && farm.users.length > 0 ? (
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-2">Name</th>
                                    <th className="text-left py-2">Email</th>
                                    <th className="text-left py-2">Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {farm.users.map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="py-2">{user.name}</td>
                                        <td className="py-2">{user.email}</td>
                                        <td className="py-2">
                                            {user.is_active ? 'Yes' : 'No'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No users assigned to this farm</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
