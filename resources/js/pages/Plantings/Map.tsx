import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface GrowLocation {
    id: number;
    name: string;
    type: string;
    area?: number;
    area_unit?: string;
}

interface PageProps {
    locations: GrowLocation[];
}

export default function PlantingMap({ locations }: PageProps) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Plantings', href: '/plantings' }, { title: 'Location Map', href: '/plantings/map' }]}>
            <Head title="Location Map" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Location Map</h1>
                    <p className="text-muted-foreground">Visual representation of your farm grow locations</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 min-h-[500px] flex items-center justify-center bg-muted/20">
                        <div className="text-center">
                            <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">Interactive Map Placeholder</h3>
                            <p className="text-sm text-muted-foreground max-w-md mx-auto">
                                This area will display an interactive map of your farm locations. 
                                Integration with mapping services (like Google Maps or Leaflet) will allow you to see your fields and plantings geographically.
                            </p>
                        </div>
                    </Card>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Location List</h3>
                        {locations.map((location) => (
                            <Card key={location.id}>
                                <CardHeader className="p-4 pb-0">
                                    <CardTitle className="text-base">{location.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                    <div className="text-sm text-muted-foreground">
                                        <p>Type: {location.type}</p>
                                        {location.area && <p>Area: {location.area} {location.area_unit}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
