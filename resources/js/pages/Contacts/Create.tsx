import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { ContactFormData } from '@/types/farm';

export default function ContactCreate() {
    const { data, setData, post, processing, errors } = useForm<ContactFormData>({
        name: '',
        type: 'other',
        phone: '',
        email: '',
        address: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contacts');
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Contacts', href: '/contacts' },
                { title: 'Add Contact', href: '/contacts/create' },
            ]}
        >
            <Head title="Add Contact" />

            <div className="mx-auto max-w-2xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Add Contact</h1>
                    <p className="text-muted-foreground">Add a supplier, customer, vet, or contractor</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <Label>Type *</Label>
                            <Select
                                value={data.type}
                                onValueChange={(v) => setData('type', v as ContactFormData['type'])}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="supplier">Supplier</SelectItem>
                                    <SelectItem value="customer">Customer</SelectItem>
                                    <SelectItem value="vet">Vet</SelectItem>
                                    <SelectItem value="contractor">Contractor</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="mt-1"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="address">Address</Label>
                            <textarea
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                                rows={2}
                            />
                        </div>

                        <div>
                            <Label htmlFor="notes">Notes</Label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Add Contact'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
