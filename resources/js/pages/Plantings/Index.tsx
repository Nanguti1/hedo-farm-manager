import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Planting, PaginatedResponse } from '@/types/farm';

interface PageProps {
    plantings: PaginatedResponse<Planting>;
}

export default function PlantingIndex({ plantings }: PageProps) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Plantings', href: '/plantings' }]}>
            <Head title="Plantings" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Plantings</h1>
                        <p className="text-muted-foreground">Track your crops from seed to harvest</p>
                    </div>
                    <Button asChild>
                        <Link href="/plantings/create">
                            <Plus className="w-4 h-4 mr-2" />
                            New Planting
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Crop
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Season
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Dates
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {plantings.data.map((planting) => (
                                <tr key={planting.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                                        <Link
                                            href={`/plantings/${planting.id}`}
                                            className="text-blue-600 hover:text-blue-800 block"
                                        >
                                            {planting.crop?.name}
                                        </Link>
                                        <span className="text-xs text-gray-500">{planting.variety}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        <Link
                                            href={`/grow-locations/${planting.grow_location_id}`}
                                            className="hover:underline"
                                        >
                                            {planting.growLocation?.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {planting.season}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            planting.status === 'harvested'
                                                ? 'bg-green-100 text-green-800'
                                                : planting.status === 'failed'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {planting.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                        <div>Planted: {planting.direct_seed_date || planting.transplant_date || '-'}</div>
                                        <div>Exp. Harvest: {planting.expected_harvest_date || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            href={`/plantings/${planting.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/plantings/${planting.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {plantings.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No plantings found</p>
                        </div>
                    )}
                </div>

                {plantings.links && plantings.links.length > 0 && (
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Showing {plantings.from} to {plantings.to} of {plantings.total} plantings
                        </div>
                        <div className="flex gap-2">
                            {plantings.links.map((link, index) => (
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
