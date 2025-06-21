import {
  Car,
  Film,
  Home,
  LayoutDashboard,
  Lightbulb,
  Palette,
  Settings,
  Shirt,
  ShoppingCart,
  Utensils,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getDashboardData } from '@/lib/data';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { CategoryPieChart } from '@/components/dashboard/category-pie-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { CategorizeExpenseDialog } from '@/components/dashboard/categorize-expense-dialog';

export default function FinTrackDashboard() {
  const { stats, spending, transactions, categories } = getDashboardData();
  const categoryNames = categories.map((c) => c.name);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-xl font-semibold font-headline">FinTrack</h1>
            </div>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <ShoppingCart />
                <span>Transactions</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Palette />
                <span>Categories</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarFooter>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/100x100.png" alt="@shadcn" data-ai-hint="person face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Jane Doe</p>
                <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-background flex flex-col">
          <header className="flex items-center justify-between p-4 border-b sm:p-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
            </div>
            <CategorizeExpenseDialog categories={categoryNames} />
          </header>
          <main className="flex-1 p-4 overflow-y-auto sm:p-6">
            <div className="grid gap-6">
              <StatsCards data={stats} />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <SpendingChart data={spending} />
                </div>
                <div className="lg:col-span-2">
                  <CategoryPieChart data={spending} />
                </div>
              </div>
              <RecentTransactions data={transactions} />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
