import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import type { Transaction } from '@/types/farm';

export default function TransactionShow({ transaction }: { transaction: Transaction }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Finance', href: '/transactions' }, { title: `Transaction #${transaction.id}`, href: `/transactions/${transaction.id}` }]}>
            <Head title={`Transaction #${transaction.id}`} />
            <div className="space-y-6">
                <div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold">Transaction #{transaction.id}</h1><p className={`text-xl ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>${transaction.amount.toFixed(2)}</p></div></div>
                <div className="bg-white p-6 rounded-lg shadow"><div className="grid grid-cols-2 gap-4"><div><p className="text-sm text-gray-500">Type</p><p className="font-medium capitalize">{transaction.type}</p></div><div><p className="text-sm text-gray-500">Category</p><p className="font-medium">{transaction.type === 'income' ? transaction.income_category?.name : transaction.expense_category?.name}</p></div><div><p className="text-sm text-gray-500">Date</p><p className="font-medium">{transaction.transaction_date}</p></div><div><p className="text-sm text-gray-500">Reference</p><p className="font-medium">{transaction.reference || '-'}</p></div></div><div className="mt-4"><p className="text-sm text-gray-500">Description</p><p className="font-medium">{transaction.description || '-'}</p></div></div>
            </div>
        </AppLayout>
    );
}
