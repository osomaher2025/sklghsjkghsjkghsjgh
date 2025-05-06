
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { cn } from "@/lib/utils";
import { 
  User, 
  Shield, 
  Briefcase, 
  Settings,
  ChevronLeft
} from "lucide-react";

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { currentUser } = useAppSelector((state) => state.user);

  const menuItems = [
    {
      title: "My Profile",
      path: "/",
      icon: <User className="w-5 h-5 mr-2" />,
    },
    {
      title: "Security",
      path: "/security",
      icon: <Shield className="w-5 h-5 mr-2" />,
    },
    {
      title: "Job Posts",
      path: "/job-posts",
      icon: <Briefcase className="w-5 h-5 mr-2" />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground fixed lg:relative z-30 h-screen transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-0 lg:w-16 overflow-hidden"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between h-16 px-4">
          {open ? (
            <div className="flex items-center">
              <img 
                src="/placeholder.svg" 
                alt="Company Logo" 
                className="h-8 w-8 rounded-md"
              />
              <span className="ml-2 font-semibold text-lg">Azure Co.</span>
            </div>
          ) : (
            <img 
              src="/placeholder.svg" 
              alt="Company Logo" 
              className="h-8 w-8 rounded-md mx-auto"
            />
          )}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="text-sidebar-foreground lg:block hidden"
          >
            <ChevronLeft className={cn("transform transition-transform", !open && "rotate-180")} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-2 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-white"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/70"
                  )}
                >
                  {item.icon}
                  {open && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {open && currentUser && (
          <div className="px-4 py-2 border-t border-sidebar-border">
            <div className="flex items-center">
              <img
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-2">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-sidebar-foreground/80">{currentUser.position}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
