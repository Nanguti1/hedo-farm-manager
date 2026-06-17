import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Sprout, MapPin } from 'lucide-react';

interface Planting {
    id: number;
    created_at: string;
    status: string;
    crop: { name: string };
    growLocation: { name: string };
}

interface PageProps {
    plannedPlantings: Planting[];
}

export default function PlantingPlan({ plannedPlantings }: PageProps) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Plantings', href: '/plantings' }, { title: 'Crop Plan', href: '/plantings/plan' }]}>
            <Head title="Crop Plan" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Crop Plan</h1>
                    <p className="text-muted-foreground">Planned and ongoing plantings for the season</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plannedPlantings.map((planting) => (
                        <Card key={planting.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {planting.crop.name}
                                </CardTitle>
                                <Badge variant={planting.status === 'planned' ? 'outline' : 'default'}>
                                    {planting.status}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm">
                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>Planned: {new Date(planting.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>{planting.growLocation.name}</span>
                                    </div>
                                    <Button asChild variant="ghost" size="sm" className="w-full mt-2">
                                        <Link href={`/plantings/${planting.id}`}>View Details</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {plannedPlantings.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed">
                            <Sprout className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No planned plantings</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new planting.</p>
                            <div className="mt-6">
                                <Button asChild>
                                    <Link href="/plantings/create">Create Planting</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
