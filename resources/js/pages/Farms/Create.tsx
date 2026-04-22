import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { FarmFormData } from '@/types/farm';

export default function FarmCreate() {
    const { data, setData, post, processing, errors } = useForm<FarmFormData>({
        name: '',
        location: '',
        size: 0,
        description: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/farms');
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Farms', href: '/farms' },
            { title: 'Create', href: '/farms/create' },
        ]}>
            <Head title="Create Farm" />

            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Create Farm</h1>
                    <p className="text-muted-foreground">Add a new farm to your system</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1"
                                error={errors.name}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="mt-1"
                                error={errors.location}
                            />
                            {errors.location && (
                                <p className="text-sm text-red-600 mt-1">{errors.location}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="size">Size (acres)</Label>
                            <Input
                                id="size"
                                type="number"
                                step="0.01"
                                value={data.size}
                                onChange={(e) => setData('size', parseFloat(e.target.value))}
                                className="mt-1"
                                error={errors.size}
                            />
                            {errors.size && (
                                <p className="text-sm text-red-600 mt-1">{errors.size}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                            />
                            <Label htmlFor="is_active" className="cursor-pointer">
                                Active
                            </Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Farm'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
