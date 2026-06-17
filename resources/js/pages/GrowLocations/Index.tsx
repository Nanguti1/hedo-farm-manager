import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { GrowLocation, PaginatedResponse } from '@/types/farm';

interface PageProps {
    growLocations: PaginatedResponse<GrowLocation>;
}

export default function GrowLocationIndex({ growLocations }: PageProps) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Grow Locations', href: '/grow-locations' }]}>
            <Head title="Grow Locations" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Grow Locations</h1>
                        <p className="text-muted-foreground">Manage your fields, greenhouses, and nurseries</p>
                    </div>
                    <Button asChild>
                        <Link href="/grow-locations/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Location
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
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Parent
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Area
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
                            {growLocations.data.map((location) => (
                                <tr key={location.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                                        <Link
                                            href={`/grow-locations/${location.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            {location.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 capitalize">
                                        {location.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {location.parent?.name || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {location.area_size} {location.area_unit}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            location.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : location.status === 'maintenance'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {location.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            href={`/grow-locations/${location.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/grow-locations/${location.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {growLocations.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No grow locations found</p>
                        </div>
                    )}
                </div>

                {growLocations.links && growLocations.links.length > 0 && (
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Showing {growLocations.from} to {growLocations.to} of {growLocations.total} locations
                        </div>
                        <div className="flex gap-2">
                            {growLocations.links.map((link, index) => (
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
