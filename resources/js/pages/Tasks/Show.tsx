import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { CheckCircle2, UserPlus } from 'lucide-react';
import type { Task, User } from '@/types/farm';

export default function TaskShow({ task, users }: { task: Task; users: User[] }) {
    const { data: assignData, setData: setAssignData, post: postAssign, processing: assignProcessing } = useForm({ user_id: '' });

    const handleAssign = (e: React.FormEvent) => {
        e.preventDefault();
        postAssign(`/tasks/${task.id}/assign/${assignData.user_id}`);
    };

    const handleComplete = () => {
        post(`/tasks/${task.id}/complete`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Tasks', href: '/tasks' }, { title: task.title, href: `/tasks/${task.id}` }]}>
            <Head title={task.title} />
            <div className="space-y-6">
                <div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">{task.title}</h1><span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{task.priority}</span></div>{task.status !== 'completed' && <Button onClick={handleComplete}><CheckCircle2 className="w-4 h-4 mr-2"/>Complete Task</Button>}</div>
                <div className="bg-white p-6 rounded-lg shadow"><p className="text-gray-600">{task.description || 'No description'}</p><div className="mt-4 grid grid-cols-2 gap-4"><div><p className="text-sm text-gray-500">Status</p><p className="font-medium capitalize">{task.status}</p></div><div><p className="text-sm text-gray-500">Due Date</p><p className="font-medium">{task.due_date || 'No due date'}</p></div></div></div>
                <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-lg font-bold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5"/>Assigned Users</h2><form onSubmit={handleAssign} className="flex gap-2 mb-4"><Select value={assignData.user_id} onValueChange={(v) => setAssignData('user_id', v)}><SelectTrigger className="w-64"><SelectValue placeholder="Select user"/></SelectTrigger><SelectContent>{users.map((u) => (<SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>))}</SelectContent></Select><Button type="submit" disabled={assignProcessing}>Assign</Button></form><div className="space-y-2">{task.assigned_users?.map((u) => (<p key={u.id} className="text-sm">{u.name}</p>)) || <p className="text-gray-500">No users assigned</p>}</div></div>
            </div>
        </AppLayout>
    );
}
