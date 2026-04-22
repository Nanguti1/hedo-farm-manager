import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { TaskFormData } from '@/types/farm';

export default function TaskCreate() {
    const { data, setData, post, processing, errors } = useForm<TaskFormData>({
        title: '', description: '', status: 'pending', priority: 'medium', due_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tasks');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Tasks', href: '/tasks' }, { title: 'Add Task', href: '/tasks/create' }]}>
            <Head title="Add Task" />
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Add Task</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="space-y-4">
                        <div><Label>Title *</Label><Input value={data.title} onChange={(e) => setData('title', e.target.value)}/>{errors.title && <p className="text-sm text-red-600">{errors.title}</p>}</div>
                        <div><Label>Description</Label><textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="w-full px-3 py-2 border rounded-md" rows={3}/></div>
                        <div><Label>Priority *</Label><Select value={data.priority} onValueChange={(v) => setData('priority', v as 'low' | 'medium' | 'high')}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent></Select></div>
                        <div><Label>Status *</Label><Select value={data.status} onValueChange={(v) => setData('status', v as 'pending' | 'in_progress' | 'completed')}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="completed">Completed</SelectItem></SelectContent></Select></div>
                        <div><Label>Due Date</Label><Input type="date" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)}/></div>
                    </div>
                    <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button><Button type="submit" disabled={processing}>Add Task</Button></div>
                </form>
            </div>
        </AppLayout>
    );
}
