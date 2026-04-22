import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { TransactionFormData } from '@/types/farm';

export default function TransactionCreate({ type, incomeCategories, expenseCategories }: { type: 'income' | 'expense'; incomeCategories: Array<{ id: number; name: string }>; expenseCategories: Array<{ id: number; name: string }> }) {
    const { data, setData, post, processing, errors } = useForm<TransactionFormData>({
        type: type, income_category_id: 0, expense_category_id: 0, amount: 0, description: '', transaction_date: new Date().toISOString().split('T')[0], reference: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transactions');
    };

    const categories = type === 'income' ? incomeCategories : expenseCategories;

    return (
        <AppLayout breadcrumbs={[{ title: 'Finance', href: '/transactions' }, { title: `Add ${type}`, href: `/transactions/create/${type}` }]}>
            <Head title={`Add ${type}`} />
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Add {type}</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <div className="space-y-4">
                        <div><Label>Category *</Label><Select value={type === 'income' ? data.income_category_id?.toString() : data.expense_category_id?.toString()} onValueChange={(v) => type === 'income' ? setData('income_category_id', parseInt(v)) : setData('expense_category_id', parseInt(v))}><SelectTrigger><SelectValue placeholder="Select category"/></SelectTrigger><SelectContent>{categories.map((c) => (<SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>))}</SelectContent></Select></div>
                        <div><Label>Amount *</Label><Input type="number" step="0.01" value={data.amount} onChange={(e) => setData('amount', parseFloat(e.target.value))}/></div>
                        <div><Label>Description</Label><Input value={data.description} onChange={(e) => setData('description', e.target.value)}/></div>
                        <div><Label>Date *</Label><Input type="date" value={data.transaction_date} onChange={(e) => setData('transaction_date', e.target.value)}/></div>
                        <div><Label>Reference</Label><Input value={data.reference} onChange={(e) => setData('reference', e.target.value)}/></div>
                    </div>
                    <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button><Button type="submit" disabled={processing}>Save</Button></div>
                </form>
            </div>
        </AppLayout>
    );
}
