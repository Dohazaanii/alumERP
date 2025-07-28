'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  BotMessageSquare,
  FileText,
  LayoutDashboard,
  Package,
  ShoppingCart,
  UsersRound,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/customers', label: 'Clients', icon: UsersRound },
  { href: '/orders', label: 'Commandes', icon: ShoppingCart },
  { href: '/inventory', label: 'Stock', icon: Package },
  { href: '/invoices', label: 'Factures', icon: FileText },
  { href: '/stock-advisor', label: 'AI Advisor', icon: BotMessageSquare },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar
        className="border-r bg-sidebar text-sidebar-foreground"
        collapsible="icon"
      >
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2 group/logo" aria-label='AluManager Home'>
             <svg
                className="size-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3v18h18" />
                <path d="M18.7 3.3a2.4 2.4 0 0 1 3 3L12 16l-4 4H3v-5l9.3-9.3a2.4 2.4 0 0 1 3-3Z" />
              </svg>
            <span className="font-bold text-lg text-foreground group-data-[collapsible=icon]:hidden group-hover/logo:text-primary transition-colors">
              AluManager
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {menuItems.map(({ href, label, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    href === '/' ? pathname === '/' : pathname.startsWith(href)
                  }
                  tooltip={{
                    children: label,
                    className: "bg-sidebar text-sidebar-foreground border-sidebar-border"
                  }}
                >
                  <Link href={href}>
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
        </SidebarFooter>
      </Sidebar>
      <main className="flex flex-1 flex-col">
        {children}
      </main>
    </SidebarProvider>
  );
}
