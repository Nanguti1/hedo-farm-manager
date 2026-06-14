import { Head, Link } from '@inertiajs/react';
import { CalendarDays, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { PaginatedResponse, Schedule } from '@/types/farm';

const typeColors: Record<Schedule['type'], string> = {
    task: 'bg-blue-100 text-blue-800',
    event: 'bg-purple-100 text-purple-800',
    reminder: 'bg-yellow-100 text-yellow-800',
};

const statusColors: Record<Schedule['status'], string> = {
    scheduled: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function ScheduleIndex({ schedules }: { schedules: PaginatedResponse<Schedule> }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Schedule', href: '/schedules' }]}>
            <Head title="Schedule" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Schedule</h1>
                        <p className="text-muted-foreground">Manage farm events, tasks, and reminders</p>
                    </div>
                    <Button asChild>
                        <Link href="/schedules/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Entry
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {schedules.data.map((schedule) => (
                                <tr key={schedule.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/schedules/${schedule.id}`}
                                            className="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            {schedule.title}
                                        </Link>
                                        {schedule.related_task && (
                                            <p className="text-xs text-gray-500">
                                                Task: {schedule.related_task.title}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="h-4 w-4 text-gray-400" />
                                            {schedule.scheduled_date}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {schedule.start_time
                                            ? `${schedule.start_time}${schedule.end_time ? ` – ${schedule.end_time}` : ''}`
                                            : '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${typeColors[schedule.type]}`}
                                        >
                                            {schedule.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[schedule.status]}`}
                                        >
                                            {schedule.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <Link
                                            href={`/schedules/${schedule.id}`}
                                            className="mr-3 text-blue-600 hover:text-blue-900"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/schedules/${schedule.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {schedules.data.length === 0 && (
                        <div className="py-12 text-center">
                            <CalendarDays className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                            <p className="text-gray-500">No schedule entries yet</p>
                        </div>
                    )}
                </div>

                {schedules.links && schedules.total > schedules.per_page && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {schedules.from} to {schedules.to} of {schedules.total}
                        </p>
                        <div className="flex gap-2">
                            {schedules.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? '#'}
                                    className={`rounded px-4 py-2 text-sm ${
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
