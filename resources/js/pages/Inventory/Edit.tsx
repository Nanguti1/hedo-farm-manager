import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { InventoryItem, InventoryItemFormData } from '@/types/farm';

interface PageProps {
    item: InventoryItem;
    categories: Array<{ id: number; name: string }>;
}

export default function InventoryEdit({ item, categories }: PageProps) {
    const { data, setData, put, processing, errors } = useForm<InventoryItemFormData>({
        category_id: item.category.id,
        name: item.name,
        unit: item.unit,
        quantity: item.quantity,
        reorder_level: item.reorder_level,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/inventory/${item.id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Inventory', href: '/inventory' },
                { title: item.name, href: `/inventory/${item.id}` },
                { title: 'Edit', href: `/inventory/${item.id}/edit` },
            ]}
        >
            <Head title={`Edit – ${item.name}`} />

            <div className="mx-auto max-w-2xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Edit Inventory Item</h1>
                    <p className="text-muted-foreground">Update item details</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow">
                    <div className="space-y-4">
                        <div>
                            <Label>Category *</Label>
                            <Select
                                value={data.category_id.toString()}
                                onValueChange={(v) => setData('category_id', parseInt(v))}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="unit">Unit *</Label>
                            <Input
                                id="unit"
                                value={data.unit}
                                onChange={(e) => setData('unit', e.target.value)}
                                className="mt-1"
                                placeholder="kg, liters, pieces"
                            />
                            {errors.unit && <p className="mt-1 text-sm text-red-600">{errors.unit}</p>}
                        </div>

                        <div>
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                                id="quantity"
                                type="number"
                                step="0.01"
                                value={data.quantity}
                                onChange={(e) => setData('quantity', parseFloat(e.target.value))}
                                className="mt-1"
                            />
                            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                        </div>

                        <div>
                            <Label htmlFor="reorder_level">Reorder Level *</Label>
                            <Input
                                id="reorder_level"
                                type="number"
                                step="0.01"
                                value={data.reorder_level}
                                onChange={(e) => setData('reorder_level', parseFloat(e.target.value))}
                                className="mt-1"
                            />
                            {errors.reorder_level && (
                                <p className="mt-1 text-sm text-red-600">{errors.reorder_level}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" asChild>
                            <Link href={`/inventory/${item.id}`}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
