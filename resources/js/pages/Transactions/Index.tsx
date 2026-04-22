import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign } from 'lucide-react';
import type { Transaction, PaginatedResponse } from '@/types/farm';

export default function TransactionIndex({ transactions, type }: { transactions: PaginatedResponse<Transaction>; type?: string }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Finance', href: '/transactions' }]}>
            <Head title="Transactions" />
            <div className="space-y-6">
                <div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Transactions</h1><p className="text-muted-foreground">Manage income and expenses</p></div><div className="flex gap-2"><Button asChild variant="outline"><Link href="/transactions/create/income"><Plus className="w-4 h-4 mr-2"/>Add Income</Link></Button><Button asChild><Link href="/transactions/create/expense"><Plus className="w-4 h-4 mr-2"/>Add Expense</Link></Button></div></div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                        <tbody className="bg-white divide-y divide-gray-200">{transactions.data.map((t) => (<tr key={t.id} className="hover:bg-gray-50"><td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{t.type}</span></td><td className="px-6 py-4">{t.type === 'income' ? t.income_category?.name : t.expense_category?.name}</td><td className="px-6 py-4 font-medium">${t.amount.toFixed(2)}</td><td className="px-6 py-4">{t.transaction_date}</td><td className="px-6 py-4"><Link href={`/transactions/${t.id}`} className="text-blue-600">View</Link></td></tr>))}</tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
