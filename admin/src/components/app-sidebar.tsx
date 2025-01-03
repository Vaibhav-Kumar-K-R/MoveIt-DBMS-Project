import { Truck, WarehouseIcon, Home, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileButton from "@/layouts/components/ProfileButton";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Warehouses",
    url: "/dashboard/warehouses",
    icon: WarehouseIcon,
  },
  {
    title: "Managers",
    url: "/dashboard/managers",
    icon: UserRound,
  },
  {
    title: "Vehicles",
    url: "/dashboard/vehicles",
    icon: Truck,
  },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <div>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl text-center text-black w-full ">
              MoveIt - Admin
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-6">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={
                        pathname === item.url ? "bg-black text-white" : ""
                      }
                      asChild
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <ProfileButton></ProfileButton>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
