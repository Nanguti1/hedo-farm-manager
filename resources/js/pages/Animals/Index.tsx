import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Animal, PaginatedResponse } from '@/types/farm';

interface PageProps {
    animals: PaginatedResponse<Animal>;
}

export default function AnimalIndex({ animals }: PageProps) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Livestock', href: '/animals' }]}>
            <Head title="Livestock" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Livestock</h1>
                        <p className="text-muted-foreground">Manage your animals</p>
                    </div>
                    <Button asChild>
                        <Link href="/animals/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Animal
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tag Number
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Breed
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gender
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
                            {animals.data.map((animal) => (
                                <tr key={animal.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                                        <Link
                                            href={`/animals/${animal.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            {animal.tag_number}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {animal.name || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {animal.breed.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {animal.gender}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            animal.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : animal.status === 'sold'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {animal.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            href={`/animals/${animal.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/animals/${animal.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {animals.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No animals found</p>
                        </div>
                    )}
                </div>

                {animals.links && animals.links.length > 0 && (
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Showing {animals.from} to {animals.to} of {animals.total} animals
                        </div>
                        <div className="flex gap-2">
                            {animals.links.map((link, index) => (
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
