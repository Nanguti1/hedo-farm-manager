import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { FinancialTotals, MonthlyFinancialData } from '@/types/farm';

interface PageProps {
    monthlyData: MonthlyFinancialData[];
    totals: FinancialTotals;
    year: number;
}

export default function FinancialReport({ monthlyData, totals, year }: PageProps) {
    const years = [year - 1, year, year + 1];

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Reports', href: '/reports' },
                { title: 'Financial', href: '/reports/financial' },
            ]}
        >
            <Head title="Financial Report" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/reports" className="text-gray-400 hover:text-gray-600">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Financial Report</h1>
                            <p className="text-muted-foreground">Year {year}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {years.map((y) => (
                            <button
                                key={y}
                                onClick={() => router.get('/reports/financial', { year: y })}
                                className={`rounded px-3 py-1 text-sm ${
                                    y === year ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow hover:bg-gray-50'
                                }`}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="text-sm text-gray-500">Total Income</p>
                        <p className="text-3xl font-bold text-green-600">
                            ${totals.total_income.toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="text-sm text-gray-500">Total Expenses</p>
                        <p className="text-3xl font-bold text-red-600">
                            ${totals.total_expense.toFixed(2)}
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="text-sm text-gray-500">Net</p>
                        <p
                            className={`text-3xl font-bold ${
                                totals.net >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            ${totals.net.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Month
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Income
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Expenses
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Net
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {monthlyData.map((row) => {
                                const net = row.income - row.expense;
                                return (
                                    <tr key={row.month} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{row.month_name}</td>
                                        <td className="px-6 py-4 text-right text-green-700">
                                            ${row.income.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right text-red-600">
                                            ${row.expense.toFixed(2)}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-right font-medium ${
                                                net >= 0 ? 'text-green-700' : 'text-red-600'
                                            }`}
                                        >
                                            ${net.toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
