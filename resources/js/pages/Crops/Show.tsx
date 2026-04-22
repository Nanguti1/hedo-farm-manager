import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Edit, Calendar } from 'lucide-react';
import type { CropCycle } from '@/types/farm';

export default function CropShow({ cycle }: { cycle: CropCycle }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Crops', href: '/crops' }, { title: `${cycle.crop.name}`, href: `/crops/${cycle.id}` }]}>
            <Head title={cycle.crop.name} />
            <div className="space-y-6">
                <div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">{cycle.crop.name}</h1><p className="text-muted-foreground">{cycle.field.name}</p></div><Button asChild><Link href={`/crops/${cycle.id}/edit`}><Edit className="w-4 h-4 mr-2"/>Edit</Link></Button></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow"><p className="text-sm text-gray-500">Field</p><p className="text-xl font-bold">{cycle.field.name}</p></div>
                    <div className="bg-white p-6 rounded-lg shadow"><p className="text-sm text-gray-500">Planted</p><p className="text-xl font-bold">{cycle.planting_date}</p></div>
                    <div className="bg-white p-6 rounded-lg shadow"><p className="text-sm text-gray-500">Status</p><p className="text-xl font-bold capitalize">{cycle.status}</p></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5"/>Timeline</h2>
                    <div className="space-y-2"><p><span className="text-gray-500">Planted:</span> {cycle.planting_date}</p><p><span className="text-gray-500">Expected Harvest:</span> {cycle.expected_harvest_date}</p></div>
                </div>
                {cycle.yield_records && cycle.yield_records.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-bold mb-4">Yield Records</h2>
                        <table className="min-w-full"><thead><tr className="border-b"><th className="text-left py-2">Quantity</th><th className="text-left py-2">Unit</th><th className="text-left py-2">Date</th></tr></thead><tbody>{cycle.yield_records.map((r) => (<tr key={r.id} className="border-b"><td className="py-2">{r.quantity}</td><td className="py-2">{r.unit}</td><td className="py-2">{r.harvest_date}</td></tr>))}</tbody></table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
