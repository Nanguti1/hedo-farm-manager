import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { CropCycle, PaginatedResponse } from '@/types/farm';

export default function CropIndex({ cycles }: { cycles: PaginatedResponse<CropCycle> }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Crops', href: '/crops' }]}>
            <Head title="Crops" />
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Crop Cycles</h1>
                        <p className="text-muted-foreground">Manage your crop cycles</p>
                    </div>
                    <Button asChild><Link href="/crops/create"><Plus className="w-4 h-4 mr-2" />Add Cycle</Link></Button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Crop</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Planted</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cycles.data.map((cycle) => (
                                <tr key={cycle.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{cycle.field.name}</td>
                                    <td className="px-6 py-4">{cycle.crop.name}</td>
                                    <td className="px-6 py-4">{cycle.planting_date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            cycle.status === 'harvested' ? 'bg-green-100 text-green-800' : 
                                            cycle.status === 'growing' ? 'bg-blue-100 text-blue-800' : 
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>{cycle.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/crops/${cycle.id}`} className="text-blue-600 mr-3">View</Link>
                                        <Link href={`/crops/${cycle.id}/edit`} className="text-indigo-600">Edit</Link>
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
