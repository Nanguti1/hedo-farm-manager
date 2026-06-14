import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { PriorityCount, StatusCount } from '@/types/farm';

interface PageProps {
    byStatus: StatusCount[];
    byPriority: PriorityCount[];
    overdue: number;
    total: number;
}

const priorityColors: Record<string, string> = {
    high: 'text-red-700',
    medium: 'text-yellow-700',
    low: 'text-green-700',
};

const statusColors: Record<string, string> = {
    pending: 'text-gray-600',
    in_progress: 'text-blue-700',
    completed: 'text-green-700',
};

export default function TasksReport({ byStatus, byPriority, overdue, total }: PageProps) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Reports', href: '/reports' },
                { title: 'Tasks', href: '/reports/tasks' },
            ]}
        >
            <Head title="Tasks Report" />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Link href="/reports" className="text-gray-400 hover:text-gray-600">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Tasks Report</h1>
                        <p className="text-muted-foreground">{total} tasks total</p>
                    </div>
                </div>

                {overdue > 0 && (
                    <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <p className="text-red-800">
                            <span className="font-semibold">{overdue} task{overdue > 1 ? 's' : ''}</span> overdue.{' '}
                            <Link href="/tasks" className="underline">
                                View tasks
                            </Link>
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 font-semibold text-gray-700">By Status</h2>
                        <div className="space-y-3">
                            {byStatus.map((row) => (
                                <div key={row.status} className="flex items-center justify-between">
                                    <span
                                        className={`capitalize ${statusColors[row.status] ?? 'text-gray-600'}`}
                                    >
                                        {row.status.replace('_', ' ')}
                                    </span>
                                    <span className="font-bold">{row.total}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 font-semibold text-gray-700">By Priority</h2>
                        <div className="space-y-3">
                            {byPriority.map((row) => (
                                <div key={row.priority} className="flex items-center justify-between">
                                    <span
                                        className={`capitalize ${priorityColors[row.priority] ?? 'text-gray-600'}`}
                                    >
                                        {row.priority}
                                    </span>
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
