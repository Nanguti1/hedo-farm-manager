import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Crop, GrowLocation, PlantingFormData } from '@/types/farm';

interface PageProps {
    crops: Crop[];
    growLocations: GrowLocation[];
}

export default function PlantingCreate({ crops, growLocations }: PageProps) {
    const { data, setData, post, processing, errors } = useForm<PlantingFormData>({
        crop_id: 0,
        grow_location_id: 0,
        variety: '',
        season: new Date().getFullYear().toString(),
        status: 'planned',
        seed_start_date: '',
        transplant_date: '',
        direct_seed_date: '',
        expected_harvest_date: '',
        number_of_plants: null,
        number_of_rows: null,
        area_occupied: null,
        area_unit: 'sq ft',
        succession_number: 1,
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/plantings');
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Plantings', href: '/plantings' },
                { title: 'New Planting', href: '/plantings/create' },
            ]}
        >
            <Head title="New Planting" />

            <div className="max-w-4xl mx-auto py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">New Planting</h1>
                    <p className="text-muted-foreground">Plan or record a new crop planting</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="crop_id">Crop</Label>
                            <Select
                                value={data.crop_id.toString()}
                                onValueChange={(value) => setData('crop_id', parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select crop" />
                                </SelectTrigger>
                                <SelectContent>
                                    {crops.map((crop) => (
                                        <SelectItem key={crop.id} value={crop.id.toString()}>
                                            {crop.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.crop_id && <p className="text-sm text-red-600">{errors.crop_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="grow_location_id">Grow Location</Label>
                            <Select
                                value={data.grow_location_id.toString()}
                                onValueChange={(value) => setData('grow_location_id', parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {growLocations.map((loc) => (
                                        <SelectItem key={loc.id} value={loc.id.toString()}>
                                            {loc.name} ({loc.type})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.grow_location_id && <p className="text-sm text-red-600">{errors.grow_location_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="variety">Variety (Optional)</Label>
                            <Input
                                id="variety"
                                value={data.variety}
                                onChange={(e) => setData('variety', e.target.value)}
                                placeholder="e.g. Cherry Bomb"
                            />
                            {errors.variety && <p className="text-sm text-red-600">{errors.variety}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="season">Season / Year</Label>
                            <Input
                                id="season"
                                value={data.season}
                                onChange={(e) => setData('season', e.target.value)}
                                placeholder="e.g. 2026 Spring"
                                required
                            />
                            {errors.season && <p className="text-sm text-red-600">{errors.season}</p>}
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
                                    <SelectItem value="planned">Planned</SelectItem>
                                    <SelectItem value="seeded">Seeded</SelectItem>
                                    <SelectItem value="transplanted">Transplanted</SelectItem>
                                    <SelectItem value="growing">Growing</SelectItem>
                                    <SelectItem value="harvested">Harvested</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="succession_number">Succession #</Label>
                            <Input
                                id="succession_number"
                                type="number"
                                value={data.succession_number}
                                onChange={(e) => setData('succession_number', parseInt(e.target.value))}
                                required
                            />
                            {errors.succession_number && <p className="text-sm text-red-600">{errors.succession_number}</p>}
                        </div>
                    </div>

                    <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="direct_seed_date">Direct Seed Date</Label>
                            <Input
                                id="direct_seed_date"
                                type="date"
                                value={data.direct_seed_date}
                                onChange={(e) => setData('direct_seed_date', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="seed_start_date">Seed Start Date (Trays)</Label>
                            <Input
                                id="seed_start_date"
                                type="date"
                                value={data.seed_start_date}
                                onChange={(e) => setData('seed_start_date', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="transplant_date">Transplant Date</Label>
                            <Input
                                id="transplant_date"
                                type="date"
                                value={data.transplant_date}
                                onChange={(e) => setData('transplant_date', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expected_harvest_date">Expected Harvest Date</Label>
                            <Input
                                id="expected_harvest_date"
                                type="date"
                                value={data.expected_harvest_date}
                                onChange={(e) => setData('expected_harvest_date', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="number_of_plants"># of Plants</Label>
                            <Input
                                id="number_of_plants"
                                type="number"
                                value={data.number_of_plants || ''}
                                onChange={(e) => setData('number_of_plants', e.target.value ? parseInt(e.target.value) : null)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="number_of_rows"># of Rows</Label>
                            <Input
                                id="number_of_rows"
                                type="number"
                                value={data.number_of_rows || ''}
                                onChange={(e) => setData('number_of_rows', e.target.value ? parseInt(e.target.value) : null)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="area_occupied">Area Occupied</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="area_occupied"
                                    type="number"
                                    step="0.01"
                                    value={data.area_occupied || ''}
                                    onChange={(e) => setData('area_occupied', e.target.value ? parseFloat(e.target.value) : null)}
                                />
                                <Input
                                    className="w-24"
                                    value={data.area_unit}
                                    onChange={(e) => setData('area_unit', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Create Planting
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
