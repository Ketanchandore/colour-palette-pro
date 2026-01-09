import { ReactNode } from "react";
import { Sidebar, MobileHeader, DesktopSidebarToggle } from "./Sidebar";
import { SidebarProvider, useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

function MainContent({ children }: MainLayoutProps) {
  const { isOpen } = useSidebar();
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileHeader />
      <DesktopSidebarToggle />
      
      <main 
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          "pt-14 lg:pt-0", // Add top padding for mobile header
          isOpen ? "lg:pl-64" : "lg:pl-0"
        )}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}
