import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import Logout from "@/components/Logout";
export default function DashBoardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full mt-1.5">
        <div className="w-full flex px-3 justify-between ">
        <SidebarTrigger className="scale-150" />
        <Logout></Logout>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
