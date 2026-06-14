import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { Schedule, ScheduleFormData, Task } from '@/types/farm';

interface PageProps {
    schedule: Schedule;
    tasks: Pick<Task, 'id' | 'title'>[];
}

export default function ScheduleEdit({ schedule, tasks }: PageProps) {
    const { data, setData, put, processing, errors } = useForm<ScheduleFormData>({
        title: schedule.title,
        description: schedule.description ?? '',
        scheduled_date: schedule.scheduled_date,
        start_time: schedule.start_time ?? '',
        end_time: schedule.end_time ?? '',
        type: schedule.type,
        status: schedule.status,
        related_task_id: schedule.related_task_id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/schedules/${schedule.id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Schedule', href: '/schedules' },
                { title: schedule.title, href: `/schedules/${schedule.id}` },
                { title: 'Edit', href: `/schedules/${schedule.id}/edit` },
            ]}
        >
            <Head title={`Edit – ${schedule.title}`} />

            <div className="mx-auto max-w-2xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Edit Schedule Entry</h1>
                    <p className="text-muted-foreground">Update event details</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                                rows={3}
                            />
                        </div>

                        <div>
                            <Label htmlFor="scheduled_date">Date *</Label>
                            <Input
                                id="scheduled_date"
                                type="date"
                                value={data.scheduled_date}
                                onChange={(e) => setData('scheduled_date', e.target.value)}
                                className="mt-1"
                            />
                            {errors.scheduled_date && (
                                <p className="mt-1 text-sm text-red-600">{errors.scheduled_date}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="start_time">Start Time</Label>
                                <Input
                                    id="start_time"
                                    type="time"
                                    value={data.start_time}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="end_time">End Time</Label>
                                <Input
                                    id="end_time"
                                    type="time"
                                    value={data.end_time}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Type *</Label>
                            <Select
                                value={data.type}
                                onValueChange={(v) => setData('type', v as ScheduleFormData['type'])}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="event">Event</SelectItem>
                                    <SelectItem value="task">Task</SelectItem>
                                    <SelectItem value="reminder">Reminder</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Status *</Label>
                            <Select
                                value={data.status}
                                onValueChange={(v) => setData('status', v as ScheduleFormData['status'])}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {tasks.length > 0 && (
                            <div>
                                <Label>Linked Task (optional)</Label>
                                <Select
                                    value={data.related_task_id?.toString() ?? ''}
                                    onValueChange={(v) =>
                                        setData('related_task_id', v ? parseInt(v) : null)
                                    }
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="None" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">None</SelectItem>
                                        {tasks.map((task) => (
                                            <SelectItem key={task.id} value={task.id.toString()}>
                                                {task.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" asChild>
                            <Link href={`/schedules/${schedule.id}`}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
