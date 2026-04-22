import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle } from 'lucide-react';
import type { InventoryItem, PaginatedResponse } from '@/types/farm';

export default function InventoryIndex({ items }: { items: PaginatedResponse<InventoryItem> }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }]}>
            <Head title="Inventory" />
            <div className="space-y-6">
                <div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Inventory</h1><p className="text-muted-foreground">Manage your inventory items</p></div><Button asChild><Link href="/inventory/create"><Plus className="w-4 h-4 mr-2"/>Add Item</Link></Button></div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                        <tbody className="bg-white divide-y divide-gray-200">{items.data.map((item) => (<tr key={item.id} className="hover:bg-gray-50"><td className="px-6 py-4"><Link href={`/inventory/${item.id}`} className="text-blue-600 hover:text-blue-800">{item.name}</Link>{item.is_low_stock && <AlertTriangle className="w-4 h-4 text-yellow-500 inline ml-2"/>}</td><td className="px-6 py-4">{item.category.name}</td><td className="px-6 py-4">{item.quantity} {item.is_low_stock && <span className="text-red-600 text-xs">(Low)</span>}</td><td className="px-6 py-4">{item.unit}</td><td className="px-6 py-4"><Link href={`/inventory/${item.id}`} className="text-blue-600 mr-3">View</Link></td></tr>))}</tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
