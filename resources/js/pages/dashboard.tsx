import { Head, router } from '@inertiajs/react';
import {
    ArrowDownRight,
    ArrowUpRight,
    Boxes,
    Leaf,
    PiggyBank,
    Tractor,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { dashboard } from '@/routes';

type DashboardProps = {
    farms: Array<{ id: number; name: string }>;
    selectedFarmId: number | null;
    summary: {
        total_animals: number;
        active_crops: number;
        inventory_count: number;
        inventory_value: number;
        income_total: number;
        expense_total: number;
    };
    recentActivities: {
        tasks: Array<{
            id: number;
            title: string;
            status: string;
            created_at: string;
        }>;
        transactions: Array<{
            id: number;
            type: 'income' | 'expense';
            amount: number;
            transaction_date: string;
        }>;
    };
};

export default function Dashboard({
    farms,
    selectedFarmId,
    summary,
    recentActivities,
}: DashboardProps) {
    const net = summary.income_total - summary.expense_total;

    const handleFarmChange = (farmId: string) => {
        router.visit(dashboard(), {
            data: { farm_id: farmId },
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: dashboard() }]}>
            <Head title="Dashboard" />

            <div className="mx-auto w-full max-w-7xl space-y-6 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Farm Dashboard</h1>
                        <p className="text-muted-foreground">
                            Live operational overview for your selected farm.
                        </p>
                    </div>
                    <div className="w-full md:w-80">
                        <Select
                            value={selectedFarmId?.toString()}
                            onValueChange={handleFarmChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select farm" />
                            </SelectTrigger>
                            <SelectContent>
                                {farms.map((farm) => (
                                    <SelectItem
                                        key={farm.id}
                                        value={farm.id.toString()}
                                    >
                                        {farm.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        title="Total Animals"
                        value={summary.total_animals.toLocaleString()}
                        icon={<Tractor className="h-4 w-4" />}
                    />
                    <SummaryCard
                        title="Active Crops"
                        value={summary.active_crops.toLocaleString()}
                        icon={<Leaf className="h-4 w-4" />}
                    />
                    <SummaryCard
                        title="Inventory"
                        value={`${summary.inventory_count} items`}
                        subtitle={`Value qty: ${summary.inventory_value.toFixed(2)}`}
                        icon={<Boxes className="h-4 w-4" />}
                    />
                    <SummaryCard
                        title="Net Finance"
                        value={`$${net.toFixed(2)}`}
                        subtitle={`Income $${summary.income_total.toFixed(2)} • Expense $${summary.expense_total.toFixed(2)}`}
                        icon={<PiggyBank className="h-4 w-4" />}
                    />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border bg-card p-4 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold">
                            Recent Tasks
                        </h2>
                        {recentActivities.tasks.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No recent tasks.
                            </p>
                        ) : (
                            <ul className="space-y-3">
                                {recentActivities.tasks.map((task) => (
                                    <li
                                        key={task.id}
                                        className="flex items-center justify-between rounded-md border p-3"
                                    >
                                        <span className="font-medium">
                                            {task.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground capitalize">
                                            {task.status.replace('_', ' ')}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="rounded-xl border bg-card p-4 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold">
                            Recent Transactions
                        </h2>
                        {recentActivities.transactions.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No recent transactions.
                            </p>
                        ) : (
                            <ul className="space-y-3">
                                {recentActivities.transactions.map(
                                    (transaction) => (
                                        <li
                                            key={transaction.id}
                                            className="flex items-center justify-between rounded-md border p-3"
                                        >
                                            <div className="flex items-center gap-2">
                                                {transaction.type ===
                                                'income' ? (
                                                    <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                                                )}
                                                <span className="text-sm capitalize">
                                                    {transaction.type}
                                                </span>
                                            </div>
                                            <span className="font-medium">
                                                $
                                                {Number(
                                                    transaction.amount,
                                                ).toFixed(2)}
                                            </span>
                                        </li>
                                    ),
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function SummaryCard({
    title,
    value,
    subtitle,
    icon,
}: {
    title: string;
    value: string;
    subtitle?: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>{title}</span>
                {icon}
            </div>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle ? (
                <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
        </div>
    );
}
