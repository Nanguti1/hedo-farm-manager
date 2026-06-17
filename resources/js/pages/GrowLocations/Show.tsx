import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Ruler, Info, Layers, Sprout } from 'lucide-react';
import type { GrowLocation } from '@/types/farm';

interface PageProps {
    growLocation: GrowLocation;
}

export default function GrowLocationShow({ growLocation }: PageProps) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Grow Locations', href: '/grow-locations' },
                { title: growLocation.name, href: `/grow-locations/${growLocation.id}` },
            ]}
        >
            <Head title={growLocation.name} />

            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{growLocation.name}</h1>
                            <Badge variant={growLocation.status === 'active' ? 'default' : 'secondary'}>
                                {growLocation.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {growLocation.type} {growLocation.parent && `inside ${growLocation.parent.name}`}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/grow-locations/${growLocation.id}/edit`}>Edit</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Area</CardTitle>
                            <Ruler className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {growLocation.area_size || 'N/A'} {growLocation.area_unit}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sub-locations</CardTitle>
                            <Layers className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {growLocation.children?.length || 0}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Plantings</CardTitle>
                            <Sprout className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {growLocation.plantings?.filter(p => p.status !== 'harvested' && p.status !== 'failed').length || 0}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    {growLocation.description || 'No description provided.'}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Current Plantings</CardTitle>
                                    <CardDescription>Crops currently growing in this location</CardDescription>
                                </div>
                                <Button size="sm" asChild>
                                    <Link href={`/plantings/create?grow_location_id=${growLocation.id}`}>
                                        Add Planting
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {growLocation.plantings && growLocation.plantings.length > 0 ? (
                                        <div className="border rounded-md divide-y">
                                            {growLocation.plantings.map((planting) => (
                                                <div key={planting.id} className="p-4 flex justify-between items-center">
                                                    <div>
                                                        <Link href={`/plantings/${planting.id}`} className="font-semibold text-blue-600 hover:underline">
                                                            {planting.crop?.name} {planting.variety && `(${planting.variety})`}
                                                        </Link>
                                                        <div className="text-sm text-gray-500">
                                                            Season: {planting.season} • Status: {planting.status}
                                                        </div>
                                                    </div>
                                                    <Badge>{planting.status}</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground text-center py-4">No plantings found for this location.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Location Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <Info className="w-4 h-4 mt-1 text-muted-foreground" />
                                    <div>
                                        <div className="font-semibold text-sm">Type</div>
                                        <div className="text-sm text-gray-600 capitalize">{growLocation.type}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Layers className="w-4 h-4 mt-1 text-muted-foreground" />
                                    <div>
                                        <div className="font-semibold text-sm">Hierarchy</div>
                                        <div className="text-sm text-gray-600">
                                            {growLocation.parent ? (
                                                <Link href={`/grow-locations/${growLocation.parent.id}`} className="text-blue-600 hover:underline">
                                                    Part of {growLocation.parent.name}
                                                </Link>
                                            ) : 'Top-level location'}
                                        </div>
                                    </div>
                                </div>
                                {growLocation.gps_coordinates && (
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                                        <div>
                                            <div className="font-semibold text-sm">GPS</div>
                                            <div className="text-sm text-gray-600">{growLocation.gps_coordinates}</div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {growLocation.children && growLocation.children.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sub-locations</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {growLocation.children.map((child) => (
                                            <li key={child.id}>
                                                <Link href={`/grow-locations/${child.id}`} className="text-sm text-blue-600 hover:underline">
                                                    {child.name} ({child.type})
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
