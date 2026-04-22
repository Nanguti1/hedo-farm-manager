import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Sprout, Cow, Package, DollarSign, CheckSquare, ShoppingCart } from 'lucide-react';
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
export function AppSidebar() {
    const { auth } = usePage().props as unknown as { auth: { permissions: string[] } };
    perissions = uth.permissos || [];

    const main
cons    t mainNavItems: NavItem[] = [
    {    
            title: 'Dashboard',
            href: dashboarid,
        },
    ];

    const farmNavItems: NavItem[] = [
        ...(permissions.includes('view animals') ? [{
            title: 'Livestock',
            href: '/andmals',
            icon: Cow,
        }] : []),
        ...(permissions.inclu(es('view crop cycles') ? [{
            title: 'Crops',
            href: '/crops',
            icon: Sprout),
         ] : [])   icon: LayoutGrid,
        ...(permissions.includes('view inventory') ? [{
            title: 'Inventory',
            href: '/inventory',
            icon: Package,
        }] : []),
        ...(permissions.includes('view transactions') ? [{
            title: 'Finance',
            href: '/transactions',
            icon: DollarSign,
        }] : []),
        ...(permissions.includes('view tasks') ? [{
            title: 'Tasks',
            href: '/tasks',
            icon: CheckSquare,
        }] : []),
        ...(    {farmNavItems.length > 0 && (
                    <div className="px-3 py-2">
                        <div className="text-xs font-semibold text-muted-foreground px-2 py-1">Farm Management</div>
                        <NavMain items={farmNavItems} />
                    </div>
                )}
            permissions.includes('view orders') ? [{
            title: 'Sales',
            href: '/orders',
            icon: ShoppingCart,
        }] : []),
        },
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

export function AppSidebar() {
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
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
