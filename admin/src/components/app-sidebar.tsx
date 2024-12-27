import {
  Truck,
  WarehouseIcon,
  Home,
  UserRound,
  Users,
  User,
} from "lucide-react";
import ProfileButton from "@/layouts/components/ProfileButton";
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
    url: "/home",
    icon: Home,
  },
  {
    title: "Warehouses",
    url: "#",
    icon: WarehouseIcon,
  },
  {
    title: "Managers",
    url: "#",
    icon: UserRound,
  },
  {
    title: "Employees",
    url: "#",
    icon: Users,
  },
  {
    title: "Vendors",
    url: "#",
    icon: User,
  },
  {
    title: "Vehicles",
    url: "#",
    icon: Truck,
  },
];

export function AppSidebar() {
  return (
    <div>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl w-full ">
              MoveIt - Admin
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-6">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span className="text-lg">{item.title}</span>
                      </a>
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
