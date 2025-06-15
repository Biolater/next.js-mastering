import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="p-4">
          <SidebarTrigger />
        </div>
        <div className="p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;