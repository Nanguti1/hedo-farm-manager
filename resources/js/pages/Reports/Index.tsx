import { Head, Link } from '@inertiajs/react';
import { BarChart3, Beef, Package, Sprout, CheckSquare, DollarSign } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

const reports = [
    {
        title: 'Financial Report',
        description: 'Monthly income, expenses, and net summary for the year.',
        href: '/reports/financial',
        icon: DollarSign,
        color: 'bg-green-50 text-green-700',
    },
    {
        title: 'Livestock Report',
        description: 'Animal counts by status, category, and gender.',
        href: '/reports/livestock',
        icon: Beef,
        color: 'bg-amber-50 text-amber-700',
    },
    {
        title: 'Inventory Report',
        description: 'Current stock levels and low-stock alerts.',
        href: '/reports/inventory',
        icon: Package,
        color: 'bg-blue-50 text-blue-700',
    },
    {
        title: 'Tasks Report',
        description: 'Task completion rates, priorities, and overdue items.',
        href: '/reports/tasks',
        icon: CheckSquare,
        color: 'bg-purple-50 text-purple-700',
    },
    {
        title: 'Crops Report',
        description: 'Active crop cycles and planting status overview.',
        href: '/reports/crops',
        icon: Sprout,
        color: 'bg-emerald-50 text-emerald-700',
    },
];

export default function ReportsIndex() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Reports', href: '/reports' }]}>
            <Head title="Reports" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Reports</h1>
                    <p className="text-muted-foreground">Farm-wide analytics and summaries</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {reports.map((report) => (
                        <Link
                            key={report.href}
                            href={report.href}
                            className="group rounded-lg bg-white p-6 shadow transition hover:shadow-md"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`rounded-lg p-3 ${report.color}`}>
                                    <report.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-900 group-hover:text-blue-600">
                                        {report.title}
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
