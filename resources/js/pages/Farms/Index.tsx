import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Farm, PaginatedResponse } from '@/types/farm';

interface PageProps {
    farms: PaginatedResponse<Farm>;
}

export default function FarmIndex({ farms }: PageProps) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Farms', href: '/farms' }]}>
            <Head title="Farms" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Farms</h1>
                        <p className="text-muted-foreground">Manage your farms</p>
                    </div>
                    <Button asChild>
                        <Link href="/farms/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Farm
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Size
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Users
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Animals
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {farms.data.map((farm) => (
                                <tr key={farm.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            href={`/farms/${farm.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            {farm.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {farm.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {farm.size} acres
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {farm.users_count ?? 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {farm.animals_count ?? 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            farm.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {farm.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            href={`/farms/${farm.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/farms/${farm.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {farms.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No farms found</p>
                        </div>
                    )}
                </div>

                {farms.links && farms.links.length > 0 && (
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Showing {farms.from} to {farms.to} of {farms.total} farms
                        </div>
                        <div className="flex gap-2">
                            {farms.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
