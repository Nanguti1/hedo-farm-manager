import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { CategoryCount, GenderCount, StatusCount } from '@/types/farm';

interface PageProps {
    byStatus: StatusCount[];
    byCategory: CategoryCount[];
    byGender: GenderCount[];
    total: number;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
    );
}

export default function LivestockReport({ byStatus, byCategory, byGender, total }: PageProps) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Reports', href: '/reports' },
                { title: 'Livestock', href: '/reports/livestock' },
            ]}
        >
            <Head title="Livestock Report" />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Link href="/reports" className="text-gray-400 hover:text-gray-600">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Livestock Report</h1>
                        <p className="text-muted-foreground">{total} animals total</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 font-semibold text-gray-700">By Status</h2>
                        <div className="space-y-2">
                            {byStatus.map((row) => (
                                <div key={row.status} className="flex items-center justify-between">
                                    <span className="capitalize text-gray-600">{row.status}</span>
                                    <span className="font-bold">{row.total}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 font-semibold text-gray-700">By Category</h2>
                        <div className="space-y-2">
                            {byCategory.map((row) => (
                                <div key={row.category} className="flex items-center justify-between">
                                    <span className="text-gray-600">{row.category}</span>
                                    <span className="font-bold">{row.total}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 font-semibold text-gray-700">By Gender</h2>
                        <div className="space-y-2">
                            {byGender.map((row) => (
                                <div key={row.gender} className="flex items-center justify-between">
                                    <span className="capitalize text-gray-600">{row.gender}</span>
                                    <span className="font-bold">{row.total}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
