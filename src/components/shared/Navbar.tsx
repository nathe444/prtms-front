import { 
  Bell, 
  LogOut, 
  Settings 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <SidebarTrigger
              className="lg:hidden"
            >
              <button className="p-2 bg-white shadow-md rounded-full animate-bounce hover:animate-none transition-all duration-300">
                <Menu size={24} className="text-teal-600" />
              </button>
            </SidebarTrigger>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-slate-800 ml-10">
          Ethiopian Health
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-slate-600">
          <Bell size={20} />
        </Button>

        <div className="flex items-center space-x-2">
          <img 
            src="https://ui-avatars.com/api/?name=Patient+User" 
            alt="User" 
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm font-medium text-slate-700">
            Patient User
          </span>
        </div>

        <Button variant="ghost" size="icon" className="text-slate-600">
          <Settings size={20} />
        </Button>

        <Button variant="destructive" size="sm" className='text-teal-600 cursor-pointer'>
          <LogOut size={16}  />
          Logout
        </Button>
      </div>
    </header>
  )
}