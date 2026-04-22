import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    CheckSquare,
    DollarSign,
    FolderGit2,
    LayoutGrid,
    Package,
    ShoppingCart,
    Sprout,
    Tractor,
    Beef,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

type PageProps = {
    auth: {
        permissions: string[];
    };
};

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const permissions = auth.permissions ?? [];

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
    ];

    const farmNavItems: NavItem[] = [
        ...(permissions.includes('view farms')
            ? [{ title: 'Farms', href: '/farms', icon: Tractor }]
            : []),
        ...(permissions.includes('view animals')
            ? [{ title: 'Livestock', href: '/animals', icon: Beef }]
            : []),
        ...(permissions.includes('view crop cycles')
            ? [{ title: 'Crops', href: '/crops', icon: Sprout }]
            : []),
        ...(permissions.includes('view inventory')
            ? [{ title: 'Inventory', href: '/inventory', icon: Package }]
            : []),
        ...(permissions.includes('view transactions')
            ? [{ title: 'Finance', href: '/transactions', icon: DollarSign }]
            : []),
        ...(permissions.includes('view tasks')
            ? [{ title: 'Tasks', href: '/tasks', icon: CheckSquare }]
            : []),
        ...(permissions.includes('view orders')
            ? [{ title: 'Sales', href: '/orders', icon: ShoppingCart }]
            : []),
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {farmNavItems.length > 0 ? (
                    <NavMain items={farmNavItems} />
                ) : null}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
