
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, User, Building, BarChart, Settings, LogOut, Menu, X, 
  CreditCard, Users, Search, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigation = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Properties", path: "/admin/properties", icon: Building },
    { name: "Agencies", path: "/admin/agencies", icon: Building },
    { name: "Agents", path: "/admin/agents", icon: User },
    { name: "Subscriptions", path: "/admin/subscriptions", icon: CreditCard },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-estate-50">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-estate-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-estate-100">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-estate-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RE</span>
              </div>
              <span className="font-semibold text-estate-900">RealEstate Admin</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                      location.pathname === item.path
                        ? "bg-estate-100 text-estate-900"
                        : "text-estate-600 hover:bg-estate-50 hover:text-estate-900"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-estate-100">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-estate-200 flex items-center justify-center">
                <User className="h-5 w-5 text-estate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-estate-900">Admin User</p>
                <p className="text-xs text-estate-500">admin@realestate.com</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4 justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-5 w-5 mr-3" />
              Log out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="h-16 bg-white border-b border-estate-100 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-2"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-estate-400" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Users className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
