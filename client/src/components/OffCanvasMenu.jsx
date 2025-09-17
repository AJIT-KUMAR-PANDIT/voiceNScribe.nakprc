import { X } from "lucide-react";
// import { useLocation } from "wouter"; // Removed useLocation as it's not needed here

export function OffCanvasMenu({ isOpen, onClose, overflowItems, currentLocation }) {
  // const [location, navigate] = useLocation(); // Removed as navigation is handled by prop

  const handleNavigation = (path) => {
    // navigate(path); // Removed as navigation is handled by prop
    onClose();
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transform ${isOpen ? "translate-y-0" : "translate-y-full"} transition-transform duration-300 ease-in-out md:hidden`}
    >
      <div
        className="relative flex flex-col items-center gap-1 px-2 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-t-2xl shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          boxShadow:
            "0 -20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-1 right-1 text-foreground p-1 rounded-full hover:bg-white/20 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Dock background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-t-2xl pointer-events-none" />

        <nav className="flex flex-wrap justify-center gap-2 py-2">
          {overflowItems.map(({ path, icon: Icon, label, testId }) => {
            const isActive =
              currentLocation === path ||
              (path !== "/" && currentLocation.startsWith(path));
            return (
              <button
                key={path}
                className={`relative w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ease-out hover:shadow-lg group ${
                  isActive ? "bg-blue-500" : "bg-gray-600"
                }`}
                onClick={() => handleNavigation(path)}
                data-testid={testId}
              >
                <Icon className="w-8 h-8 text-white relative z-10 drop-shadow-sm" />
                <span className="text-xs text-white mt-1">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
