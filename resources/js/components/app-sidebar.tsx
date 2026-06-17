import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Beef,
    CalendarDays,
    CheckSquare,
    DollarSign,
    LayoutGrid,
    Layers,
    MapPin,
    Package,
    ShoppingCart,
    Sprout,
    Tractor,
    UserRound,
    Users,
    Shield,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
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
        ...(permissions.includes('view plantings')
            ? [
                  {
                      title: 'Plantings',
                      href: '/plantings',
                      icon: Sprout,
                      items: [
                          { title: 'Crops', href: '/crops' },
                          ...(permissions.includes('view grow locations')
                              ? [{ title: 'Locations', href: '/grow-locations' }]
                              : []),
                          { title: 'Crop Plan', href: '/plantings/plan' },
                          { title: 'Location Map', href: '/plantings/map' },
                          { title: 'Yield Comparison', href: '/plantings/yield-comparison' },
                      ],
                  },
              ]
            : []),
        ...(permissions.includes('view schedules')
            ? [{ title: 'Schedule', href: '/schedules', icon: CalendarDays }]
            : []),
        ...(permissions.includes('view tasks')
            ? [{ title: 'Tasks', href: '/tasks', icon: CheckSquare }]
            : []),
        ...(permissions.includes('view animals')
            ? [{ title: 'Livestock', href: '/animals', icon: Beef }]
            : []),
        ...(permissions.includes('view inventory')
            ? [{ title: 'Resources', href: '/inventory', icon: Package }]
            : []),
        ...(permissions.includes('view transactions')
            ? [{ title: 'Accounting', href: '/transactions', icon: DollarSign }]
            : []),
        ...(permissions.includes('view orders')
            ? [{ title: 'Market', href: '/orders', icon: ShoppingCart }]
            : []),
        ...(permissions.includes('view contacts')
            ? [{ title: 'Contacts', href: '/contacts', icon: Users }]
            : []),
        ...(permissions.includes('view users')
            ? [{ title: 'Users', href: '/users', icon: UserRound }]
            : []),
        ...(permissions.includes('manage roles')
            ? [{ title: 'Roles', href: '/roles', icon: Shield }]
            : []),
        ...(permissions.includes('view reports')
            ? [{ title: 'Reports', href: '/reports', icon: BarChart3 }]
            : []),
    ];


    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <div className="flex h-16 items-center px-2 group-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <Link href={dashboard()} prefetch className="flex items-center gap-2">
                        <AppLogo />
                    </Link>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label="Platform" />
                {farmNavItems.length > 0 ? (
                    <NavMain items={farmNavItems} label="Farm" />
                ) : null}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
