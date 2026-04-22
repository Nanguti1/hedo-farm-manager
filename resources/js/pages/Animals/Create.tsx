import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { AnimalFormData } from '@/types/farm';

interface PageProps {
    breeds: Array<{ id: number; name: string }>;
    categories: Array<{ id: number; name: string }>;
}

export default function AnimalCreate({ breeds, categories }: PageProps) {
    const { data, setData, post, processing, errors } = useForm<AnimalFormData>({
        tag_number: '',
        name: '',
        breed_id: 0,
        category_id: 0,
        gender: 'female',
        birth_date: '',
        purchase_date: '',
        status: 'active',
        weight: 0,
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/animals');
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Livestock', href: '/animals' },
            { title: 'Add Animal', href: '/animals/create' },
        ]}>
            <Head title="Add Animal" />

            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Add Animal</h1>
                    <p className="text-muted-foreground">Add a new animal to your farm</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="tag_number">Tag Number *</Label>
                            <Input
                                id="tag_number"
                                type="text"
                                value={data.tag_number}
                                onChange={(e) => setData('tag_number', e.target.value)}
                                className="mt-1"
                                placeholder="TAG-123456"
                            />
                            {errors.tag_number && (
                                <p className="text-sm text-red-600 mt-1">{errors.tag_number}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="breed_id">Breed *</Label>
                            <Select
                                value={data.breed_id.toString()}
                                onValueChange={(value) => setData('breed_id', parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select breed" />
                                </SelectTrigger>
                                <SelectContent>
                                    {breeds.map((breed) => (
                                        <SelectItem key={breed.id} value={breed.id.toString()}>
                                            {breed.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.breed_id && (
                                <p className="text-sm text-red-600 mt-1">{errors.breed_id}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="category_id">Category *</Label>
                            <Select
                                value={data.category_id.toString()}
                                onValueChange={(value) => setData('category_id', parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && (
                                <p className="text-sm text-red-600 mt-1">{errors.category_id}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="gender">Gender *</Label>
                            <Select
                                value={data.gender}
                                onValueChange={(value) => setData('gender', value as 'male' | 'female')}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.gender && (
                                <p className="text-sm text-red-600 mt-1">{errors.gender}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="birth_date">Birth Date *</Label>
                            <Input
                                id="birth_date"
                                type="date"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                                className="mt-1"
                            />
                            {errors.birth_date && (
                                <p className="text-sm text-red-600 mt-1">{errors.birth_date}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="purchase_date">Purchase Date</Label>
                            <Input
                                id="purchase_date"
                                type="date"
                                value={data.purchase_date}
                                onChange={(e) => setData('purchase_date', e.target.value)}
                                className="mt-1"
                            />
                            {errors.purchase_date && (
                                <p className="text-sm text-red-600 mt-1">{errors.purchase_date}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="status">Status *</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) => setData('status', value as 'active' | 'sold' | 'dead')}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="sold">Sold</SelectItem>
                                    <SelectItem value="dead">Dead</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-sm text-red-600 mt-1">{errors.status}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                value={data.weight}
                                onChange={(e) => setData('weight', parseFloat(e.target.value))}
                                className="mt-1"
                            />
                            {errors.weight && (
                                <p className="text-sm text-red-600 mt-1">{errors.weight}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="notes">Notes</Label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                rows={3}
                            />
                            {errors.notes && (
                                <p className="text-sm text-red-600 mt-1">{errors.notes}</p>
                            )}
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
                            {processing ? 'Creating...' : 'Add Animal'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
