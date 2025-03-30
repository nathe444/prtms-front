import { Link } from "react-router-dom";
import {
  Home,
  User,
  FileText,
  BarChart2,
  Shield,
  HelpCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

// Menu items with Ethiopian context
const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Medical Records", url: "/records", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart2 },
  { title: "Security", url: "/security", icon: Shield },
  { title: "Support", url: "/support", icon: HelpCircle },
];

export function AppSidebar() {
  const {
    // state,
    // open,
    // setOpen,
    // openMobile,
    isMobile,
    setOpenMobile,
    // toggleSidebar,
  } = useSidebar()

  return (
    <Sidebar
      className={`bg-white shadow-lg transition-all duration-300 ease-in-out transform lg:translate-x-0 fixed lg:relative z-50`}
    >
      <div className="flex items-center space-x-2 p-4 border-b bg-teal-50 mb-5">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Ethiopia.svg/1200px-Flag_of_Ethiopia.svg.png"
          alt="Ethiopian Health"
          className="h-10 w-10 rounded-full animate-pulse"
        />
        <h2 className="text-xl  font-bold text-teal-800">ሀኪሞች ሲስተም</h2>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="hover:bg-teal-50">
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="flex items-center group py-6"
                      onClick={() => {
                        if (isMobile) {
                          setOpenMobile(false)
                        }
                      }}
                    >
                      <item.icon className="mr-2 text-slate-500 group-hover:text-teal-600 transition-colors" />
                      <span className="group-hover:text-teal-800 transition-colors ">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}