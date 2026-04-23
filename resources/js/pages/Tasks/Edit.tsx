import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { Task, TaskFormData } from '@/types/farm';

export default function TaskEdit({ task }: { task: Task }) {
    const { data, setData, put, processing, errors } = useForm<TaskFormData>({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        due_date: task.due_date || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tasks/${task.id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Tasks', href: '/tasks' },
                { title: task.title, href: `/tasks/${task.id}` },
                { title: 'Edit', href: `/tasks/${task.id}/edit` },
            ]}
        >
            <Head title={`Edit ${task.title}`} />

            <div className="mx-auto max-w-2xl space-y-6">
                <h1 className="text-3xl font-bold">Edit Task</h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-lg bg-white p-6 shadow"
                >
                    <div className="space-y-4">
                        <div>
                            <Label>Title *</Label>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                            />
                            {errors.title ? (
                                <p className="text-sm text-red-600">
                                    {errors.title}
                                </p>
                            ) : null}
                        </div>
                        <div>
                            <Label>Description</Label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2"
                                rows={3}
                            />
                            {errors.description ? (
                                <p className="text-sm text-red-600">
                                    {errors.description}
                                </p>
                            ) : null}
                        </div>
                        <div>
                            <Label>Priority *</Label>
                            <Select
                                value={data.priority}
                                onValueChange={(value) =>
                                    setData(
                                        'priority',
                                        value as TaskFormData['priority'],
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Status *</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) =>
                                    setData(
                                        'status',
                                        value as TaskFormData['status'],
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="in_progress">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Due Date</Label>
                            <Input
                                type="date"
                                value={data.due_date}
                                onChange={(e) =>
                                    setData('due_date', e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" asChild>
                            <Link href={`/tasks/${task.id}`}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Task'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
