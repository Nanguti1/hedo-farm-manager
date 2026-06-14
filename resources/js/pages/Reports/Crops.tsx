import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { StatusCount } from '@/types/farm';

interface CropCycleRow {
    id: number;
    status: string;
    planting_date: string;
    expected_harvest_date: string;
    crop: { name: string } | null;
    field: { name: string } | null;
}

interface PageProps {
    byStatus: StatusCount[];
    activeCycles: CropCycleRow[];
    total: number;
}

const statusColors: Record<string, string> = {
    planted: 'bg-green-100 text-green-800',
    growing: 'bg-emerald-100 text-emerald-800',
    harvested: 'bg-gray-100 text-gray-800',
};

export default function CropsReport({ byStatus, activeCycles, total }: PageProps) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Reports', href: '/reports' },
                { title: 'Crops', href: '/reports/crops' },
            ]}
        >
            <Head title="Crops Report" />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Link href="/reports" className="text-gray-400 hover:text-gray-600">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Crops Report</h1>
                        <p className="text-muted-foreground">{total} crop cycles total</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {byStatus.map((row) => (
                        <div key={row.status} className="rounded-lg bg-white p-5 shadow">
                            <p className="text-sm text-gray-500 capitalize">{row.status}</p>
                            <p className="mt-1 text-2xl font-bold">{row.total}</p>
                        </div>
                    ))}
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="border-b px-6 py-4">
                        <h2 className="font-semibold text-gray-700">Active Cycles</h2>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Crop
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Field
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Planted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Expected Harvest
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {activeCycles.map((cycle) => (
                                <tr key={cycle.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">
                                        <Link
                                            href={`/crops/${cycle.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            {cycle.crop?.name ?? '—'}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {cycle.field?.name ?? '—'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{cycle.planting_date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {cycle.expected_harvest_date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[cycle.status] ?? 'bg-gray-100 text-gray-800'}`}
                                        >
                                            {cycle.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {activeCycles.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No active crop cycles
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
