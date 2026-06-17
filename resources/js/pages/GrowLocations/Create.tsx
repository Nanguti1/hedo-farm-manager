import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { GrowLocation, GrowLocationFormData } from '@/types/farm';

interface PageProps {
    parentLocations: GrowLocation[];
}

export default function GrowLocationCreate({ parentLocations }: PageProps) {
    const { data, setData, post, processing, errors } = useForm<GrowLocationFormData>({
        name: '',
        type: 'field',
        parent_id: null,
        area_size: null,
        area_unit: 'acres',
        status: 'active',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/grow-locations');
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Grow Locations', href: '/grow-locations' },
                { title: 'Add Location', href: '/grow-locations/create' },
            ]}
        >
            <Head title="Add Grow Location" />

            <div className="max-w-2xl mx-auto py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Add Grow Location</h1>
                    <p className="text-muted-foreground">Create a new field, greenhouse, or other location</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Location Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. North Field"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Location Type</Label>
                            <Select
                                value={data.type}
                                onValueChange={(value: any) => setData('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="field">Field</SelectItem>
                                    <SelectItem value="greenhouse">Greenhouse</SelectItem>
                                    <SelectItem value="nursery">Nursery</SelectItem>
                                    <SelectItem value="orchard">Orchard</SelectItem>
                                    <SelectItem value="container">Container</SelectItem>
                                    <SelectItem value="bed">Bed</SelectItem>
                                    <SelectItem value="row">Row</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="parent_id">Parent Location (Optional)</Label>
                            <Select
                                value={data.parent_id?.toString() || 'none'}
                                onValueChange={(value) => setData('parent_id', value === 'none' ? null : parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select parent" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {parentLocations.map((loc) => (
                                        <SelectItem key={loc.id} value={loc.id.toString()}>
                                            {loc.name} ({loc.type})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.parent_id && <p className="text-sm text-red-600">{errors.parent_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value: any) => setData('status', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="area_size">Area Size</Label>
                            <Input
                                id="area_size"
                                type="number"
                                step="0.01"
                                value={data.area_size || ''}
                                onChange={(e) => setData('area_size', e.target.value ? parseFloat(e.target.value) : null)}
                                placeholder="0.00"
                            />
                            {errors.area_size && <p className="text-sm text-red-600">{errors.area_size}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="area_unit">Area Unit</Label>
                            <Input
                                id="area_unit"
                                value={data.area_unit}
                                onChange={(e) => setData('area_unit', e.target.value)}
                                placeholder="acres, sq ft, etc."
                            />
                            {errors.area_unit && <p className="text-sm text-red-600">{errors.area_unit}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Additional details about this location..."
                            rows={4}
                        />
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Create Location
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
