import React, { useState, useRef, useEffect } from "react";
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

export function BottomNav({ onMenuToggle, isMenuOpen }) {
  const [location, setLocation] = useState("/");
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dockRef = useRef(null);

  const handleMouseMove = (e) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const getIconScale = (index) => {
    if (hoveredIndex === -1) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.3;
    if (distance === 2) return 1.1;
    return 1;
  };

  const getIconTransform = (index) => {
    const scale = getIconScale(index);
    const translateY = hoveredIndex === index ? -8 : 0;
    return `scale(${scale}) translateY(${translateY}px)`;
  };

  return (
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
        }}
      >
        {/* Dock background glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-2xl pointer-events-none" />

        {navItems.map(({ path, icon: Icon, label, testId, color }, index) => {
          const isActive =
            location === path || (path !== "/" && location.startsWith(path));
          const scale = getIconScale(index);

          return (
            <div
              key={path}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {/* Tooltip */}
              {hoveredIndex === index && (
                <div className="absolute -top-16 px-3 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
                  {label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
                </div>
              )}

              {/* Active indicator */}
              {isActive && (
                <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full shadow-lg animate-pulse" />
              )}

              <button
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ease-out ${color} hover:shadow-lg group`}
                onClick={() => setLocation(path)}
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
        })}

        {/* Divider */}
        <div className="w-px h-8 bg-white/20 mx-1" />

        {/* Menu button */}
        <div
          className="relative flex flex-col items-center"
          onMouseEnter={() => setHoveredIndex(navItems.length)}
        >
          {/* Tooltip */}
          {hoveredIndex === navItems.length && (
            <div className="absolute -top-16 px-3 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
              Menu
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
            </div>
          )}

          <button
            className="relative w-12 h-12 rounded-xl bg-gray-600 flex items-center justify-center transition-all duration-300 ease-out hover:shadow-lg group"
            onClick={onMenuToggle}
            aria-label="Open menu"
            style={{
              transform: getIconTransform(navItems.length),
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
      </div>
    </div>
  );
}
