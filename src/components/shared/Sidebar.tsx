import { Link } from "react-router-dom";
import {
  Home,
  User,
  FileText,
  BarChart2,
  Shield,
  HelpCircle,
  X,
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
  { title: "Staffs", url: "/staffs", icon: User },
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
  } = useSidebar();

  return (
    <Sidebar
      className={`bg-white border-black/10 shadow-xl transition-all duration-300 ease-in-out transform lg:translate-x-0 fixed lg:relative z-50`}
    >
      <div className="flex items-center justify-between space-x-2 p-4 border-b border-black/10 bg-teal-50 mb-5 h-20">
        <h2 className="text-xl font-bold text-teal-800">ሀኪሞች ሲስተም</h2>
        {isMobile && (
          <button
            onClick={() => setOpenMobile(false)}
            className="text-teal-800 hover:bg-teal-100 rounded-full p-1 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={24} cursor="pointer" />
          </button>
        )}
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
                          setOpenMobile(false);
                        }
                      }}
                    >
                      <item.icon className="mr-2 text-slate-500 group-hover:text-teal-600 transition-colors" />
                      <span className="group-hover:text-teal-800 transition-colors font-semibold">
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
