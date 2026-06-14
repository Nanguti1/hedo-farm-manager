import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarDays, Clock, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { Schedule } from '@/types/farm';

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

export default function ScheduleShow({ schedule }: { schedule: Schedule }) {
    const { delete: destroy, processing } = useForm({});

    const handleDelete = () => {
        if (confirm('Delete this schedule entry?')) {
            destroy(`/schedules/${schedule.id}`);
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Schedule', href: '/schedules' },
                { title: schedule.title, href: `/schedules/${schedule.id}` },
            ]}
        >
            <Head title={schedule.title} />

            <div className="space-y-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{schedule.title}</h1>
                        <div className="flex gap-2">
                            <span
                                className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${typeColors[schedule.type]}`}
                            >
                                {schedule.type}
                            </span>
                            <span
                                className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[schedule.status]}`}
                            >
                                {schedule.status}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/schedules/${schedule.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-bold">Details</h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Date</p>
                                    <p className="font-medium">{schedule.scheduled_date}</p>
                                </div>
                            </div>
                            {(schedule.start_time || schedule.end_time) && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-500">Time</p>
                                        <p className="font-medium">
                                            {schedule.start_time}
                                            {schedule.end_time ? ` – ${schedule.end_time}` : ''}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {schedule.related_task && (
                                <div>
                                    <p className="text-xs text-gray-500">Linked Task</p>
                                    <Link
                                        href={`/tasks/${schedule.related_task_id}`}
                                        className="font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        {schedule.related_task.title}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {schedule.description && (
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-bold">Description</h2>
                            <p className="text-gray-600">{schedule.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
