import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Edit, Heart, Calendar } from 'lucide-react';
import type { Animal } from '@/types/farm';

interface PageProps {
    animal: Animal;
}

export default function AnimalShow({ animal }: PageProps) {
    const { post, processing } = useForm();

    return (
        <AppLayout breadcrumbs={[
            { title: 'Livestock', href: '/animals' },
            { title: animal.tag_number, href: `/animals/${animal.id}` },
        ]}>
            <Head title={animal.tag_number} />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">{animal.tag_number}</h1>
                        <p className="text-muted-foreground">{animal.name || 'No name'}</p>
                    </div>
                    <Button asChild>
                        <Link href={`/animals/${animal.id}/edit`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Animal
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Breed</p>
                                <p className="text-xl font-bold">{animal.breed.name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Category</p>
                                <p className="text-xl font-bold">{animal.category.name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Gender</p>
                                <p className="text-xl font-bold capitalize">{animal.gender}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="text-xl font-bold capitalize">{animal.status}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Dates
                        </h2>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm text-gray-500">Birth Date</p>
                                <p className="font-medium">{animal.birth_date}</p>
                            </div>
                            {animal.purchase_date && (
                                <div>
                                    <p className="text-sm text-gray-500">Purchase Date</p>
                                    <p className="font-medium">{animal.purchase_date}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-bold mb-4">Details</h2>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm text-gray-500">Weight</p>
                                <p className="font-medium">{animal.weight ? `${animal.weight} kg` : 'Not recorded'}</p>
                            </div>
                            {animal.notes && (
                                <div>
                                    <p className="text-sm text-gray-500">Notes</p>
                                    <p className="font-medium">{animal.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Heart className="w-5 h-5" />
                            Health Records
                        </h2>
                        <Button size="sm" asChild>
                            <Link href={`/animals/${animal.id}/health`}>
                                Add Health Record
                            </Link>
                        </Button>
                    </div>

                    {animal.health_records && animal.health_records.length > 0 ? (
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Type</th>
                                    <th className="text-left py-2">Description</th>
                                    <th className="text-left py-2">Date</th>
                                    <th className="text-left py-2">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animal.health_records.map((record) => (
                                    <tr key={record.id} className="border-b">
                                        <td className="py-2">{record.record_type}</td>
                                        <td className="py-2">{record.description}</td>
                                        <td className="py-2">{record.treatment_date}</td>
                                        <td className="py-2">{record.cost ? `$${record.cost}` : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No health records yet</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
