import { Home, MessageCircle, History, StickyNote, Settings } from "lucide-react";
import { useLocation } from "wouter";

const navItems = [
  { path: "/", icon: Home, label: "Home", testId: "nav-home" },
  { path: "/chat", icon: MessageCircle, label: "Chat", testId: "nav-chat" },
  { path: "/history", icon: History, label: "History", testId: "nav-history" },
  { path: "/notes", icon: StickyNote, label: "Notes", testId: "nav-notes" },
  { path: "/settings", icon: Settings, label: "Settings", testId: "nav-settings" },
];

export function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="sticky bottom-0 z-50 glassmorphism border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ path, icon: Icon, label, testId }) => {
            const isActive = location === path || (path !== "/" && location.startsWith(path));
            
            return (
              <button
                key={path}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? "text-blue-400" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setLocation(path)}
                data-testid={testId}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
