import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/shared/Sidebar";
import Navbar from "./components/shared/Navbar";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Pass state and toggle function to sidebar */}
        <AppSidebar />

        <div className="flex flex-col flex-1 overflow-hidden lg:ml-0">
          <Navbar />
          
          <main className="flex-grow p-4 bg-slate-50">
            {/* Sidebar toggle button */}
           
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
