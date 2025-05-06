
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { Bell, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

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
        <button className="text-gray-600 hover:text-gray-800 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
