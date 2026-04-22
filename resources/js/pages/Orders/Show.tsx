import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import type { Order, ProductBatch } from '@/types/farm';

export default function OrderShow({ order, batches }: { order: Order; batches: ProductBatch[] }) {
    const { data: itemData, setData: setItemData, post: postItem, processing: itemProcessing } = useForm({ product_name: '', quantity: 1, unit_price: 0 });

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        postItem(`/orders/${order.id}/items`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Orders', href: '/orders' }, { title: `#${order.id}`, href: `/orders/${order.id}` }]}>
            <Head title={`Order #${order.id}`} />
            <div className="space-y-6">
                <div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Order #{order.id}</h1><p className="text-muted-foreground">{order.customer_name}</p></div><span className={`px-3 py-1 rounded-full text-sm ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-blue-100 text-blue-800' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{order.status}</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-lg font-bold mb-4">Order Details</h2><div className="space-y-2"><p><span className="text-gray-500">Customer:</span> {order.customer_name}</p><p><span className="text-gray-500">Date:</span> {order.order_date}</p><p><span className="text-gray-500">Total:</span> <span className="text-xl font-bold">${order.total_amount.toFixed(2)}</span></p></div></div>
                    <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/>Add Item</h2><form onSubmit={handleAddItem} className="space-y-4"><div><Label>Product</Label><Input value={itemData.product_name} onChange={(e) => setItemData('product_name', e.target.value)}/></div><div className="grid grid-cols-2 gap-4"><div><Label>Quantity</Label><Input type="number" value={itemData.quantity} onChange={(e) => setItemData('quantity', parseInt(e.target.value))}/></div><div><Label>Unit Price</Label><Input type="number" step="0.01" value={itemData.unit_price} onChange={(e) => setItemData('unit_price', parseFloat(e.target.value))}/></div></div><Button type="submit" disabled={itemProcessing} className="w-full">Add Item</Button></form></div>
                </div>
                {order.items && order.items.length > 0 && (<div className="bg-white p-6 rounded-lg shadow"><h2 className="text-lg font-bold mb-4">Order Items</h2><table className="min-w-full"><thead><tr className="border-b"><th className="text-left py-2">Product</th><th className="text-left py-2">Qty</th><th className="text-left py-2">Unit Price</th><th className="text-left py-2">Subtotal</th></tr></thead><tbody>{order.items.map((item) => (<tr key={item.id} className="border-b"><td className="py-2">{item.product_name}</td><td className="py-2">{item.quantity}</td><td className="py-2">${item.unit_price.toFixed(2)}</td><td className="py-2 font-medium">${item.subtotal.toFixed(2)}</td></tr>))}</tbody></table></div>)}
            </div>
        </AppLayout>
    );
}
