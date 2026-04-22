import { Head, useForm } from '@inertiajs/react';
import { CheckCircle2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { Task, User } from '@/types/farm';

export default function TaskShow({
    task,
    users,
}: {
    task: Task;
    users: Pick<User, 'id' | 'name'>[];
}) {
    const {
        data: assignData,
        setData: setAssignData,
        post: postAssign,
        processing: assignProcessing,
    } = useForm({ user_id: '' });

    const { post: completeTask, processing: completing } = useForm({});

    const handleAssign = (e: React.FormEvent) => {
        e.preventDefault();

        if (assignData.user_id) {
            postAssign(`/tasks/${task.id}/assign/${assignData.user_id}`);
        }
    };

    const handleComplete = () => {
        completeTask(`/tasks/${task.id}/complete`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Tasks', href: '/tasks' },
                { title: task.title, href: `/tasks/${task.id}` },
            ]}
        >
            <Head title={task.title} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{task.title}</h1>
                        <span
                            className={`rounded-full px-2 py-1 text-xs ${
                                task.priority === 'high'
                                    ? 'bg-red-100 text-red-800'
                                    : task.priority === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                            }`}
                        >
                            {task.priority}
                        </span>
                    </div>
                    {task.status !== 'completed' ? (
                        <Button onClick={handleComplete} disabled={completing}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            {completing ? 'Completing...' : 'Complete Task'}
                        </Button>
                    ) : null}
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-600">
                        {task.description || 'No description'}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="font-medium capitalize">
                                {task.status}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Due Date</p>
                            <p className="font-medium">
                                {task.due_date || 'No due date'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                        <UserPlus className="h-5 w-5" />
                        Assigned Users
                    </h2>
                    <form onSubmit={handleAssign} className="mb-4 flex gap-2">
                        <Select
                            value={assignData.user_id}
                            onValueChange={(value) =>
                                setAssignData('user_id', value)
                            }
                        >
                            <SelectTrigger className="w-64">
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((user) => (
                                    <SelectItem
                                        key={user.id}
                                        value={user.id.toString()}
                                    >
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            type="submit"
                            disabled={assignProcessing || !assignData.user_id}
                        >
                            {assignProcessing ? 'Assigning...' : 'Assign'}
                        </Button>
                    </form>
                    <div className="space-y-2">
                        {task.assigned_users &&
                        task.assigned_users.length > 0 ? (
                            task.assigned_users.map((user) => (
                                <p key={user.id} className="text-sm">
                                    {user.name}
                                </p>
                            ))
                        ) : (
                            <p className="text-gray-500">No users assigned</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
