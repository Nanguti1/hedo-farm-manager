import { Head, Link, useForm } from '@inertiajs/react';
import { Edit, Mail, MapPin, Phone, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { Contact } from '@/types/farm';

const typeColors: Record<Contact['type'], string> = {
    supplier: 'bg-blue-100 text-blue-800',
    customer: 'bg-green-100 text-green-800',
    vet: 'bg-red-100 text-red-800',
    contractor: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800',
};

export default function ContactShow({ contact }: { contact: Contact }) {
    const { delete: destroy, processing } = useForm({});

    const handleDelete = () => {
        if (confirm('Delete this contact?')) {
            destroy(`/contacts/${contact.id}`);
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Contacts', href: '/contacts' },
                { title: contact.name, href: `/contacts/${contact.id}` },
            ]}
        >
            <Head title={contact.name} />

            <div className="space-y-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold">{contact.name}</h1>
                        <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium capitalize ${typeColors[contact.type]}`}
                        >
                            {contact.type}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/contacts/${contact.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-bold">Contact Details</h2>
                        <div className="space-y-3">
                            {contact.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                                        {contact.phone}
                                    </a>
                                </div>
                            )}
                            {contact.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                                        {contact.email}
                                    </a>
                                </div>
                            )}
                            {contact.address && (
                                <div className="flex items-start gap-2">
                                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                                    <p className="text-gray-700">{contact.address}</p>
                                </div>
                            )}
                            {!contact.phone && !contact.email && !contact.address && (
                                <p className="text-gray-400">No contact details provided</p>
                            )}
                        </div>
                    </div>

                    {contact.notes && (
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-bold">Notes</h2>
                            <p className="text-gray-600">{contact.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
