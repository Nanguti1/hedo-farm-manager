import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { CropCycleFormData } from '@/types/farm';

export default function CropCreate({ fields, crops }: { fields: Array<{ id: number; name: string }>; crops: Array<{ id: number; name: string }> }) {
    const { data, setData, post, processing, errors } = useForm<CropCycleFormData>({
        field_id: 0, crop_id: 0, planting_date: '', expected_harvest_date: '', status: 'planted',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/crops');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Crops', href: '/crops' }, { title: 'Add Cycle', href: '/crops/create' }]}>
            <Head title="Add Crop Cycle" />
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Add Crop Cycle</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="space-y-4">
                        <div><Label>Field *</Label><Select value={data.field_id.toString()} onValueChange={(v) => setData('field_id', parseInt(v))}><SelectTrigger><SelectValue placeholder="Select field"/></SelectTrigger><SelectContent>{fields.map((f) => (<SelectItem key={f.id} value={f.id.toString()}>{f.name}</SelectItem>))}</SelectContent></Select>{errors.field_id && <p className="text-sm text-red-600">{errors.field_id}</p>}</div>
                        <div><Label>Crop *</Label><Select value={data.crop_id.toString()} onValueChange={(v) => setData('crop_id', parseInt(v))}><SelectTrigger><SelectValue placeholder="Select crop"/></SelectTrigger><SelectContent>{crops.map((c) => (<SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>))}</SelectContent></Select>{errors.crop_id && <p className="text-sm text-red-600">{errors.crop_id}</p>}</div>
                        <div><Label>Planting Date *</Label><Input type="date" value={data.planting_date} onChange={(e) => setData('planting_date', e.target.value)}/>{errors.planting_date && <p className="text-sm text-red-600">{errors.planting_date}</p>}</div>
                        <div><Label>Expected Harvest Date *</Label><Input type="date" value={data.expected_harvest_date} onChange={(e) => setData('expected_harvest_date', e.target.value)}/>{errors.expected_harvest_date && <p className="text-sm text-red-600">{errors.expected_harvest_date}</p>}</div>
                        <div><Label>Status *</Label><Select value={data.status} onValueChange={(v) => setData('status', v as 'planted' | 'growing' | 'harvested')}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="planted">Planted</SelectItem><SelectItem value="growing">Growing</SelectItem><SelectItem value="harvested">Harvested</SelectItem></SelectContent></Select>{errors.status && <p className="text-sm text-red-600">{errors.status}</p>}</div>
                    </div>
                    <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button><Button type="submit" disabled={processing}>{processing ? 'Creating...' : 'Add Cycle'}</Button></div>
                </form>
            </div>
        </AppLayout>
    );
}
