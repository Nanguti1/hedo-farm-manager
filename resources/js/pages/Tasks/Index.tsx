import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle2 } from 'lucide-react';
import type { Task, PaginatedResponse } from '@/types/farm';

export default function TaskIndex({ tasks }: { tasks: PaginatedResponse<Task> }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Tasks', href: '/tasks' }]}>
            <Head title="Tasks" />
            <div className="space-y-6">
                <div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Tasks</h1><p className="text-muted-foreground">Manage farm tasks</p></div><Button asChild><Link href="/tasks/create"><Plus className="w-4 h-4 mr-2"/>Add Task</Link></Button></div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                        <tbody className="bg-white divide-y divide-gray-200">{tasks.data.map((task) => (<tr key={task.id} className="hover:bg-gray-50"><td className="px-6 py-4"><Link href={`/tasks/${task.id}`} className="text-blue-600 hover:text-blue-800">{task.title}</Link></td><td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{task.priority}</span></td><td className="px-6 py-4 capitalize">{task.status}</td><td className="px-6 py-4">{task.due_date || '-'}</td><td className="px-6 py-4"><Link href={`/tasks/${task.id}`} className="text-blue-600 mr-3">View</Link>{task.status !== 'completed' && <Link href={`/tasks/${task.id}/complete`} method="post" as="button" className="text-green-600"><CheckCircle2 className="w-4 h-4 inline"/> Complete</Link>}</td></tr>))}</tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
