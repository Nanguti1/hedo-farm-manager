import { Head, Link } from '@inertiajs/react';
import { Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { Contact, PaginatedResponse } from '@/types/farm';

const typeColors: Record<Contact['type'], string> = {
    supplier: 'bg-blue-100 text-blue-800',
    customer: 'bg-green-100 text-green-800',
    vet: 'bg-red-100 text-red-800',
    contractor: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800',
};

export default function ContactIndex({ contacts }: { contacts: PaginatedResponse<Contact> }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Contacts', href: '/contacts' }]}>
            <Head title="Contacts" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Contacts</h1>
                        <p className="text-muted-foreground">Suppliers, customers, vets, and contractors</p>
                    </div>
                    <Button asChild>
                        <Link href="/contacts/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Contact
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {contacts.data.map((contact) => (
                                <tr key={contact.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">
                                        <Link
                                            href={`/contacts/${contact.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            {contact.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${typeColors[contact.type]}`}
                                        >
                                            {contact.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {contact.phone ?? '—'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {contact.email ? (
                                            <a
                                                href={`mailto:${contact.email}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {contact.email}
                                            </a>
                                        ) : (
                                            '—'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <Link
                                            href={`/contacts/${contact.id}`}
                                            className="mr-3 text-blue-600 hover:text-blue-900"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/contacts/${contact.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {contacts.data.length === 0 && (
                        <div className="py-12 text-center">
                            <Users className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                            <p className="text-gray-500">No contacts yet</p>
                        </div>
                    )}
                </div>

                {contacts.links && contacts.total > contacts.per_page && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {contacts.from} to {contacts.to} of {contacts.total}
                        </p>
                        <div className="flex gap-2">
                            {contacts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? '#'}
                                    className={`rounded px-4 py-2 text-sm ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
