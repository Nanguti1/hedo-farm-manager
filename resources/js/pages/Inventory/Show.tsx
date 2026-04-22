import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { InventoryItem } from '@/types/farm';

export default function InventoryShow({ item }: { item: InventoryItem }) {
    const { data: stockData, setData: setStockData, post: postStock, processing: stockProcessing } = useForm({ quantity: 1, type: 'add' });

    const handleStockUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        postStock(`/inventory/${item.id}/stock`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: item.name, href: `/inventory/${item.id}` }]}>
            <Head title={item.name} />
            <div className="space-y-6">
                <div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">{item.name}</h1><p className="text-muted-foreground">{item.category.name}</p></div><div className="bg-white p-6 rounded-lg shadow"><p className="text-sm text-gray-500">Current Quantity</p><p className={`text-3xl font-bold ${item.is_low_stock ? 'text-red-600' : ''}`}>{item.quantity} {item.unit}</p></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-lg font-bold mb-4">Details</h2><div className="space-y-2"><p><span className="text-gray-500">Category:</span> {item.category.name}</p><p><span className="text-gray-500">Unit:</span> {item.unit}</p><p><span className="text-gray-500">Reorder Level:</span> {item.reorder_level}</p></div></div>
                    <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-lg font-bold mb-4">Update Stock</h2><form onSubmit={handleStockUpdate} className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><Label>Quantity</Label><Input type="number" step="0.01" value={stockData.quantity} onChange={(e) => setStockData('quantity', parseFloat(e.target.value))}/></div><div><Label>Type</Label><Select value={stockData.type} onValueChange={(v) => setStockData('type', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="add">Add</SelectItem><SelectItem value="subtract">Remove</SelectItem></SelectContent></Select></div></div><Button type="submit" disabled={stockProcessing} className="w-full">Update Stock</Button></form></div>
                </div>
            </div>
        </AppLayout>
    );
}
