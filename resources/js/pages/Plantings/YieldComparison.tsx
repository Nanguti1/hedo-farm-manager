import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface YieldData {
    crop: string;
    total: number;
    unit: string;
}

interface PageProps {
    yieldData: YieldData[];
}

export default function YieldComparison({ yieldData }: PageProps) {
    const maxYield = Math.max(...yieldData.map(d => d.total), 1);

    return (
        <AppLayout breadcrumbs={[{ title: 'Plantings', href: '/plantings' }, { title: 'Yield Comparison', href: '/plantings/yield-comparison' }]}>
            <Head title="Yield Comparison" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Yield Comparison</h1>
                    <p className="text-muted-foreground">Compare harvest yields across different crops</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BarChart3 className="mr-2 h-5 w-5" />
                                Harvest Totals by Crop
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {yieldData.map((data, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span>{data.crop}</span>
                                            <span>{data.total} {data.unit}</span>
                                        </div>
                                        <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-primary transition-all duration-500" 
                                                style={{ width: `${(data.total / maxYield) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {yieldData.length === 0 && (
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground">No yield data recorded yet.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium">Top Performing Crop</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">
                                    {yieldData.length > 0 
                                        ? yieldData.reduce((prev, current) => (prev.total > current.total) ? prev : current).crop 
                                        : 'N/A'}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium">Total Harvest Entries</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{yieldData.length}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
