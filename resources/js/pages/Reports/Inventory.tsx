import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface InventoryRow {
    id: number;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    reorder_level: number;
    is_low_stock: boolean;
}

interface PageProps {
    items: InventoryRow[];
    lowStockCount: number;
    totalItems: number;
}

export default function InventoryReport({ items, lowStockCount, totalItems }: PageProps) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Reports', href: '/reports' },
                { title: 'Inventory', href: '/reports/inventory' },
            ]}
        >
            <Head title="Inventory Report" />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Link href="/reports" className="text-gray-400 hover:text-gray-600">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Inventory Report</h1>
                        <p className="text-muted-foreground">{totalItems} items tracked</p>
                    </div>
                </div>

                {lowStockCount > 0 && (
                    <div className="flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <p className="text-yellow-800">
                            <span className="font-semibold">{lowStockCount} item{lowStockCount > 1 ? 's' : ''}</span>{' '}
                            below reorder level.
                        </p>
                    </div>
                )}

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Item
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Quantity
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Reorder At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {items.map((item) => (
                                <tr key={item.id} className={item.is_low_stock ? 'bg-red-50' : 'hover:bg-gray-50'}>
                                    <td className="px-6 py-4 font-medium">
                                        <Link
                                            href={`/inventory/${item.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                                    <td className="px-6 py-4 text-right text-sm">
                                        {item.quantity} {item.unit}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm text-gray-500">
                                        {item.reorder_level} {item.unit}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.is_low_stock ? (
                                            <span className="flex items-center gap-1 text-xs font-medium text-red-700">
                                                <AlertTriangle className="h-3 w-3" />
                                                Low Stock
                                            </span>
                                        ) : (
                                            <span className="text-xs font-medium text-green-700">OK</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
