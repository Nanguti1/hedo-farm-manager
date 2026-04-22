import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Order, PaginatedResponse } from '@/types/farm';

export default function OrderIndex({ orders }: { orders: PaginatedResponse<Order> }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Orders', href: '/orders' }]}>
            <Head title="Orders" />
            <div className="space-y-6">
                <div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Orders</h1><p className="text-muted-foreground">Manage sales orders</p></div><Button asChild><Link href="/orders/create"><Plus className="w-4 h-4 mr-2"/>Add Order</Link></Button></div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                        <tbody className="bg-white divide-y divide-gray-200">{orders.data.map((order) => (<tr key={order.id} className="hover:bg-gray-50"><td className="px-6 py-4">#{order.id}</td><td className="px-6 py-4"><Link href={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-800">{order.customer_name}</Link></td><td className="px-6 py-4 font-medium">${order.total_amount.toFixed(2)}</td><td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-blue-100 text-blue-800' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{order.status}</span></td><td className="px-6 py-4">{order.order_date}</td><td className="px-6 py-4"><Link href={`/orders/${order.id}`} className="text-blue-600">View</Link></td></tr>))}</tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
