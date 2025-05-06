"use client"
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";  
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export default function DashboardLayout({ children }) {

  const {user, logout} = useAuth()

  const capitalize = (str) => {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (

    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col flex-1">
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          <div className="ml-auto flex items-center gap-2 px-4">
            <span className="hidden sm:block text-sm font-semibold">Welcome <span className="text-blue-600 hover:underline">{capitalize(user)}</span></span>
            
            <img
              src="https://i.pravatar.cc/40"
              alt="User Profile"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <Button  
              onClick={() => logout()} 
              className="bg-red-600"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider> 
  );
}
