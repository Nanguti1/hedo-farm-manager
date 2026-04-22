import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { OrderFormData } from '@/types/farm';

export default function OrderCreate() {
    const { data, setData, post, processing, errors } = useForm<OrderFormData>({
        customer_name: '', status: 'pending', order_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/orders');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Orders', href: '/orders' }, { title: 'Add Order', href: '/orders/create' }]}>
            <Head title="Add Order" />
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Add Order</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="space-y-4">
                        <div><Label>Customer Name *</Label><Input value={data.customer_name} onChange={(e) => setData('customer_name', e.target.value)}/>{errors.customer_name && <p className="text-sm text-red-600">{errors.customer_name}</p>}</div>
                        <div><Label>Status *</Label><Select value={data.status} onValueChange={(v) => setData('status', v as 'pending' | 'processing' | 'completed' | 'cancelled')}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="processing">Processing</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="cancelled">Cancelled</SelectItem></SelectContent></Select></div>
                        <div><Label>Order Date *</Label><Input type="date" value={data.order_date} onChange={(e) => setData('order_date', e.target.value)}/></div>
                    </div>
                    <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button><Button type="submit" disabled={processing}>Add Order</Button></div>
                </form>
            </div>
        </AppLayout>
    );
}
