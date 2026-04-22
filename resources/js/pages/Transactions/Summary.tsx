import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { FinancialSummary } from '@/types/farm';

export default function TransactionSummary({ summary, month }: { summary: FinancialSummary; month: string }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Finance', href: '/transactions' }, { title: 'Summary', href: '/transactions/summary' }]}>
            <Head title="Financial Summary" />
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Financial Summary - {month}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow"><p className="text-sm text-gray-500">Total Income</p><p className="text-3xl font-bold text-green-600">${summary.total_income.toFixed(2)}</p></div>
                    <div className="bg-white p-6 rounded-lg shadow"><p className="text-sm text-gray-500">Total Expenses</p><p className="text-3xl font-bold text-red-600">${summary.total_expense.toFixed(2)}</p></div>
                    <div className="bg-white p-6 rounded-lg shadow"><p className="text-sm text-gray-500">Net</p><p className={`text-3xl font-bold ${summary.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>${summary.net.toFixed(2)}</p></div>
                </div>
            </div>
        </AppLayout>
    );
}
