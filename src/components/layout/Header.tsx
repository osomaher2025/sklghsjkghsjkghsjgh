
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { Bell, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Get the page title based on the current path
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "My Profile";
      case "/security":
        return "Security";
      case "/job-posts":
        return "Job Posts";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-10">
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="text-gray-600 lg:hidden mr-4"
      >
        <Menu className="h-6 w-6" />
      </button>

      <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>

      <div className="ml-auto flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-600 hover:text-gray-800 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="py-2 px-4 border-b">
              <h3 className="font-medium">Notifications</h3>
            </div>
            <DropdownMenuItem className="py-2 px-4 cursor-default">
              <div>
                <p className="font-medium">New Application</p>
                <p className="text-sm text-gray-500">Jane Doe applied for Frontend Developer</p>
                <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 px-4 cursor-default">
              <div>
                <p className="font-medium">Job Post Expiring</p>
                <p className="text-sm text-gray-500">UX Designer post expires tomorrow</p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 px-4 cursor-default">
              <div>
                <p className="font-medium">Interview Scheduled</p>
                <p className="text-sm text-gray-500">Interview with John Smith at 2:00 PM</p>
                <p className="text-xs text-gray-400 mt-1">Yesterday</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 border-t text-center">
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                View all notifications
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
