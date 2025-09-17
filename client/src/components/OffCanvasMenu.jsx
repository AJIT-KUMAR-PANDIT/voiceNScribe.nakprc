import { Home, MessageCircle, History, StickyNote, Settings, LayoutDashboard, Search, LayoutTemplate, UserCircle, X } from "lucide-react";
import { useLocation } from "wouter";

const navItems = [
  { path: "/", icon: Home, label: "Home", testId: "nav-home" },
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard", testId: "nav-dashboard" },
  { path: "/search", icon: Search, label: "Search", testId: "nav-search" },
  { path: "/templates", icon: LayoutTemplate, label: "Templates", testId: "nav-templates" },
  { path: "/profile", icon: UserCircle, label: "Profile", testId: "nav-profile" },
  { path: "/chat", icon: MessageCircle, label: "Chat", testId: "nav-chat" },
  { path: "/history", icon: History, label: "History", testId: "nav-history" },
  { path: "/notes", icon: StickyNote, label: "Notes", testId: "nav-notes" },
  { path: "/settings", icon: Settings, label: "Settings", testId: "nav-settings" },
];

export function OffCanvasMenu({ isOpen, onClose }) {
  const [location, setLocation] = useLocation();

  const handleNavigation = (path) => {
    setLocation(path);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out bg-background md:hidden`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-foreground">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex flex-col items-center space-y-4 py-8">
        {navItems.map(({ path, icon: Icon, label, testId }) => {
          const isActive = location === path || (path !== "/" && location.startsWith(path));
          return (
            <button
              key={path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg w-full max-w-xs justify-center ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
              onClick={() => handleNavigation(path)}
              data-testid={testId}
            >
              <Icon className="w-5 h-5" />
              <span className="text-lg font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}