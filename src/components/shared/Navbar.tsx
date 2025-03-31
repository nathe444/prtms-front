import { Bell, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useLogoutMutation } from "@/store/apis/auth/authApi";
import { clearUser} from "@/store/apis/auth/authSlice";
import { toast } from "sonner";

export default function Navbar() {
  const location = useLocation();
  const User = useSelector((state:RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [logout  ] = useLogoutMutation();



  const handleLogout = async ()=>{
    try {
      await logout().unwrap();
      dispatch(clearUser());
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 h-10 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="lg:hidden">
          <button className="bg-white shadow-md rounded-full animate-bounce hover:animate-none transition-all duration-300">
            <Menu size={22} className="text-teal-600" />
          </button>
        </SidebarTrigger>
        <span className="text-xs md:text-md font-semibold text-black/50">
          {location.pathname.replace(/\//g, " ").charAt(1).toUpperCase() + location.pathname.slice(1).replace(/\//g, " ").slice(1)}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-slate-600">
          <Bell size={20} />
        </Button>

        <div className="flex items-center space-x-2">
          <img
            src="https://ui-avatars.com/api/?name=Patient+User"
            alt="User"
            className="h-5 w-5 md:h-7 md:w-7 rounded-full"
          />
          <span className="hidden  md:text-sm  font-medium text-slate-700">
            {User?.firstName + " " + User?.fatherName}
          </span>
        </div>

        <Button variant="ghost" size="icon" className="text-slate-600">
          <Settings size={20} />
        </Button>

        <Button
          variant="destructive"
          size="icon"
          className="text-teal-600 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="hidden text-2xl">Logout</span>
        </Button>
      </div>
    </header>
  );
}
