import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Info, MapPin, Ruler, Sprout, TrendingUp, Droplets, ShieldCheck, FileText } from 'lucide-react';
import type { Planting } from '@/types/farm';

interface PageProps {
    planting: Planting;
}

export default function PlantingShow({ planting }: PageProps) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Plantings', href: '/plantings' },
                { title: `${planting.crop?.name} (${planting.season})`, href: `/plantings/${planting.id}` },
            ]}
        >
            <Head title={`${planting.crop?.name} - ${planting.season}`} />

            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{planting.crop?.name}</h1>
                            <Badge>{planting.status}</Badge>
                        </div>
                        <p className="text-muted-foreground flex items-center mt-1">
                            <Sprout className="w-4 h-4 mr-1" />
                            {planting.variety || 'Standard Variety'} • {planting.season}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/plantings/${planting.id}/edit`}>Edit</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Location</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                                <Link href={`/grow-locations/${planting.grow_location_id}`} className="text-blue-600 hover:underline">
                                    {planting.growLocation?.name}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Plants/Rows</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold">
                                {planting.number_of_plants || '-'} plants / {planting.number_of_rows || '-'} rows
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Area Occupied</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold">
                                {planting.area_occupied || '-'} {planting.area_unit}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Succession</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold">
                                #{planting.succession_number}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="harvests">Harvests</TabsTrigger>
                        <TabsTrigger value="inputs">Nutrients & Treatments</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Timeline</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center border-b pb-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span>Seed Start</span>
                                        </div>
                                        <span className="font-medium">{planting.seed_start_date || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b pb-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span>Direct Seeded</span>
                                        </div>
                                        <span className="font-medium">{planting.direct_seed_date || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b pb-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span>Transplanted</span>
                                        </div>
                                        <span className="font-medium">{planting.transplant_date || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b pb-2 text-blue-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Expected Harvest</span>
                                        </div>
                                        <span className="font-bold">{planting.expected_harvest_date || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span>Actual Harvest</span>
                                        </div>
                                        <span className="font-medium">{planting.actual_harvest_date || 'N/A'}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 italic">
                                        {planting.notes || 'No notes for this planting.'}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="harvests" className="space-y-4">
                        <div className="flex justify-end">
                            <Button size="sm">Record Harvest</Button>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Harvest History</CardTitle>
                                <CardDescription>Total Yield: {planting.harvests?.reduce((acc, h) => acc + Number(h.quantity), 0) || 0} units</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {planting.harvests && planting.harvests.length > 0 ? (
                                    <div className="border rounded-md divide-y">
                                        {planting.harvests.map((harvest) => (
                                            <div key={harvest.id} className="p-4 flex justify-between items-center">
                                                <div>
                                                    <div className="font-bold">{harvest.quantity} {harvest.unit}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {harvest.harvest_date} • Grade: {harvest.quality_grade || 'Standard'}
                                                    </div>
                                                </div>
                                                <Badge variant="outline">{harvest.market_destination || 'Inventory'}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">No harvest records found.</div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="inputs" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Droplets className="w-5 h-5 text-blue-500" />
                                        Nutrients
                                    </CardTitle>
                                    <Button size="sm" variant="ghost">Add</Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {planting.nutrient_applications && planting.nutrient_applications.length > 0 ? (
                                            planting.nutrient_applications.map((app) => (
                                                <div key={app.id} className="text-sm border-l-2 border-blue-500 pl-3 py-1">
                                                    <div className="font-semibold">{app.fertilizer_type} ({app.quantity} {app.unit})</div>
                                                    <div className="text-gray-500">{app.application_date} • {app.application_method}</div>
                                                </div>
                                            ))
                                        ) : <div className="text-center py-4 text-xs text-muted-foreground">No nutrients recorded.</div>}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-green-500" />
                                        Treatments
                                    </CardTitle>
                                    <Button size="sm" variant="ghost">Add</Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {planting.treatments && planting.treatments.length > 0 ? (
                                            planting.treatments.map((tr) => (
                                                <div key={tr.id} className="text-sm border-l-2 border-green-500 pl-3 py-1">
                                                    <div className="font-semibold">{tr.treatment_type}: {tr.product_used}</div>
                                                    <div className="text-gray-500">{tr.application_date} • Dose: {tr.dosage}</div>
                                                </div>
                                            ))
                                        ) : <div className="text-center py-4 text-xs text-muted-foreground">No treatments recorded.</div>}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="notes">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Detailed Notes & Documents
                                </CardTitle>
                                <Button size="sm">Add Note</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground">
                                    Advanced notes and document attachments coming soon.
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
