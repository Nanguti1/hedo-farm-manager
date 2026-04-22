import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { InventoryItemFormData } from '@/types/farm';

export default function InventoryCreate({ categories }: { categories: Array<{ id: number; name: string }> }) {
    const { data, setData, post, processing, errors } = useForm<InventoryItemFormData>({
        category_id: 0, name: '', unit: '', quantity: 0, reorder_level: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/inventory');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Add Item', href: '/inventory/create' }]}>
            <Head title="Add Inventory Item" />
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Add Inventory Item</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="space-y-4">
                        <div><Label>Category *</Label><Select value={data.category_id.toString()} onValueChange={(v) => setData('category_id', parseInt(v))}><SelectTrigger><SelectValue placeholder="Select category"/></SelectTrigger><SelectContent>{categories.map((c) => (<SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>))}</SelectContent></Select>{errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>}</div>
                        <div><Label>Name *</Label><Input value={data.name} onChange={(e) => setData('name', e.target.value)}/>{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}</div>
                        <div><Label>Unit *</Label><Input value={data.unit} onChange={(e) => setData('unit', e.target.value)} placeholder="kg, liters, pieces"/></div>
                        <div><Label>Quantity *</Label><Input type="number" step="0.01" value={data.quantity} onChange={(e) => setData('quantity', parseFloat(e.target.value))}/>{errors.quantity && <p className="text-sm text-red-600">{errors.quantity}</p>}</div>
                        <div><Label>Reorder Level *</Label><Input type="number" step="0.01" value={data.reorder_level} onChange={(e) => setData('reorder_level', parseFloat(e.target.value))}/>{errors.reorder_level && <p className="text-sm text-red-600">{errors.reorder_level}</p>}</div>
                    </div>
                    <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button><Button type="submit" disabled={processing}>{processing ? 'Creating...' : 'Add Item'}</Button></div>
                </form>
            </div>
        </AppLayout>
    );
}
