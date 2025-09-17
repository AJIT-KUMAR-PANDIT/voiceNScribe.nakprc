import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import {
  Home,
  MessageCircle,
  History,
  StickyNote,
  Settings,
  LayoutDashboard,
  Search,
  LayoutTemplate,
  UserCircle,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  {
    path: "/",
    icon: Home,
    label: "Home",
    testId: "nav-home",
    color: "bg-blue-500",
  },
  {
    path: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    testId: "nav-dashboard",
    color: "bg-purple-500",
  },
  {
    path: "/search",
    icon: Search,
    label: "Search",
    testId: "nav-search",
    color: "bg-green-500",
  },
  {
    path: "/templates",
    icon: LayoutTemplate,
    label: "Templates",
    testId: "nav-templates",
    color: "bg-orange-500",
  },
  {
    path: "/profile",
    icon: UserCircle,
    label: "Profile",
    testId: "nav-profile",
    color: "bg-pink-500",
  },
  {
    path: "/chat",
    icon: MessageCircle,
    label: "Chat",
    testId: "nav-chat",
    color: "bg-cyan-500",
  },
  {
    path: "/history",
    icon: History,
    label: "History",
    testId: "nav-history",
    color: "bg-yellow-500",
  },
  {
    path: "/notes",
    icon: StickyNote,
    label: "Notes",
    testId: "nav-notes",
    color: "bg-red-500",
  },
  {
    path: "/settings",
    icon: Settings,
    label: "Settings",
    testId: "nav-settings",
    color: "bg-gray-500",
  },
];

// Overflow Menu Component
function OverflowMenu({
  isOpen,
  onClose,
  overflowItems,
  currentLocation,
  onNavigate,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 m-4 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">More Apps</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {overflowItems.map(({ path, icon: Icon, label, testId, color }) => {
            const isActive =
              currentLocation === path ||
              (path !== "/" && currentLocation.startsWith(path));

            return (
              <button
                key={path}
                onClick={() => {
                  onNavigate(path);
                  onClose();
                }}
                className={`flex flex-col items-center space-y-2 p-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`}
                data-testid={testId}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-lg`}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60" />
                  <Icon className="w-6 h-6 text-white relative z-10 drop-shadow-sm" />
                </div>
                <span className="text-white text-xs font-medium text-center">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function BottomNav({
  onMenuToggle,
  isMenuOpen,
  setOverflowNavItems,
  overflowItems = [],
}) {
  const [location, navigate] = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleNavItems, setVisibleNavItems] = useState(navItems);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const dockRef = useRef(null);

  // Calculate which items fit in the dock based on screen width
  const calculateFittingItems = useCallback(() => {
    if (!dockRef.current) return;

    const containerWidth = dockRef.current.offsetWidth;
    const itemWidth = 64; // Width of each dock item
    const gap = 8; // Gap between items
    const padding = 32; // Padding on both sides
    const menuButtonWidth = overflowItems.length > 0 ? 72 : 0; // Menu button + divider width

    const availableWidth = containerWidth - padding - menuButtonWidth;
    const maxVisibleItems = Math.floor(availableWidth / (itemWidth + gap));

    const newVisibleItems = navItems.slice(0, Math.max(1, maxVisibleItems));
    const newOverflowItems = navItems.slice(maxVisibleItems);

    setVisibleNavItems(newVisibleItems);
    if (setOverflowNavItems) {
      setOverflowNavItems(newOverflowItems);
    }
  }, [setOverflowNavItems, overflowItems.length]);

  useEffect(() => {
    calculateFittingItems();
    const handleResize = () => calculateFittingItems();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateFittingItems]);

  const handleMouseMove = (e) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleMenuToggle = () => {
    setShowOverflowMenu(!showOverflowMenu);
    if (onMenuToggle) onMenuToggle();
  };

  const getIconScale = (index) => {
    if (hoveredIndex === -1) return 1;

    const distance = Math.abs(index - hoveredIndex);
    const maxScale = 1.6;
    const minScale = 1;

    if (distance === 0) return maxScale;
    if (distance === 1) return 1.3;
    if (distance === 2) return 1.1;

    return minScale;
  };

  const getIconTransform = (index) => {
    const scale = getIconScale(index);
    const translateY = scale > 1.2 ? -12 : 0;
    return `scale(${scale}) translateY(${translateY}px)`;
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4 ${
          isMenuOpen ? "hidden" : ""
        }`}
      >
        <div
          ref={dockRef}
          className="relative flex items-end gap-2 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(-1)}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
            minWidth: "320px",
            maxWidth: "90vw",
          }}
        >
          {/* Dock background glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-2xl pointer-events-none" />

          {visibleNavItems.map(
            ({ path, icon: Icon, label, testId, color }, index) => {
              const isActive =
                location === path ||
                (path !== "/" && location.startsWith(path));

              return (
                <div
                  key={path}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {/* Tooltip */}
                  {hoveredIndex === index && (
                    <div className="absolute -top-16 px-3 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 whitespace-nowrap z-10">
                      {label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
                    </div>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full shadow-lg animate-pulse" />
                  )}

                  <button
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ease-out hover:shadow-lg group ${color}`}
                    onClick={() => handleNavigation(path)}
                    data-testid={testId}
                    style={{
                      transform: getIconTransform(index),
                      transformOrigin: "bottom center",
                    }}
                  >
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60" />

                    <Icon className="w-6 h-6 text-white relative z-10 drop-shadow-sm" />

                    {/* Reflection effect */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent rounded-b-xl" />
                  </button>
                </div>
              );
            }
          )}

          {/* Show menu button and divider only if there are overflow items */}
          {overflowItems.length > 0 && (
            <>
              {/* Divider */}
              <div className="w-px h-8 bg-white/20 mx-1" />

              {/* Menu button */}
              <div
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredIndex(visibleNavItems.length)}
              >
                {/* Tooltip */}
                {hoveredIndex === visibleNavItems.length && (
                  <div className="absolute -top-16 px-3 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
                    More Apps
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
                  </div>
                )}

                <button
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ease-out hover:shadow-lg group ${
                    showOverflowMenu ? "bg-blue-500" : "bg-gray-600"
                  }`}
                  onClick={handleMenuToggle}
                  aria-label="Open menu"
                  style={{
                    transform: getIconTransform(visibleNavItems.length),
                    transformOrigin: "bottom center",
                  }}
                >
                  {/* Icon glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60" />

                  <Menu className="w-6 h-6 text-white relative z-10 drop-shadow-sm" />

                  {/* Reflection effect */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent rounded-b-xl" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overflow Menu */}
      <OverflowMenu
        isOpen={showOverflowMenu}
        onClose={() => setShowOverflowMenu(false)}
        overflowItems={overflowItems}
        currentLocation={location}
        onNavigate={handleNavigation}
      />
    </>
  );
}

// Demo component to show the dock in action
export default function DockDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("/");
  const [overflowItems, setOverflowItems] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      {/* Content area */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Enhanced macOS Dock</h1>
          <p className="text-xl text-white/80 mb-8">
            Responsive dock with overflow handling and smooth magnification
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">Core Features</h2>
              <ul className="text-left space-y-2 text-white/90">
                <li>• Distance-based magnification effect</li>
                <li>• Responsive overflow handling</li>
                <li>• Smooth animations and transitions</li>
                <li>• Glassmorphism design</li>
                <li>• Interactive tooltips</li>
                <li>• Active state indicators</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">Overflow Menu</h2>
              <ul className="text-left space-y-2 text-white/90">
                <li>• Auto-calculates fitting items</li>
                <li>• Grid layout for overflow items</li>
                <li>• Modal overlay design</li>
                <li>• Consistent app icon styling</li>
                <li>• Touch-friendly interactions</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-sm text-white/60">
            <p>
              Current location:{" "}
              <span className="font-mono bg-white/10 px-2 py-1 rounded">
                {currentLocation}
              </span>
            </p>
            <p>
              Overflow items:{" "}
              <span className="font-mono bg-white/10 px-2 py-1 rounded">
                {overflowItems.length}
              </span>
            </p>
            <p className="mt-2">
              Resize the window to see overflow behavior in action!
            </p>
          </div>
        </div>
      </div>

      {/* The dock */}
      <BottomNav
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        currentLocation={currentLocation}
        setOverflowNavItems={setOverflowItems}
        overflowItems={overflowItems}
      />
    </div>
  );
}
