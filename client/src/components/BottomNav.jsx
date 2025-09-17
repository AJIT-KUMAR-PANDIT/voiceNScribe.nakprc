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
      {/* Backdrop - only covers the area above the dock */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        style={{ bottom: "120px" }} // Leave space for the dock + labels
        onClick={onClose}
      />

      {/* Menu */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-4 sm:p-6 m-4 max-w-xs sm:max-w-sm w-full mb-32">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-base sm:text-lg">
            More Apps
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
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
                className={`flex flex-col items-center space-y-2 p-2 sm:p-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`}
                data-testid={testId}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${color} flex items-center justify-center shadow-lg relative`}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60" />
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 drop-shadow-sm" />
                </div>
                <span className="text-white text-xs font-medium text-center leading-tight">
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

export default function BottomNav({ setOverflowNavItems, overflowItems = [] }) {
  const [location, navigate] = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [visibleNavItems, setVisibleNavItems] = useState([]);
  const [overflowNavItems, setOverflowNavItemsLocal] = useState([]);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const dockRef = useRef(null);

  // Calculate which items fit in the dock based on screen width
  const calculateFittingItems = useCallback(() => {
    if (!dockRef.current) return;

    const containerWidth = window.innerWidth;
    const isSmallScreen = containerWidth < 640; // sm breakpoint
    const itemWidth = isSmallScreen ? 56 : 64; // Smaller on mobile
    const gap = isSmallScreen ? 6 : 8;
    const padding = isSmallScreen ? 24 : 32;
    const menuButtonWidth = 72;

    // Always reserve space for menu button on mobile
    const availableWidth =
      containerWidth - padding - (isSmallScreen ? menuButtonWidth : 0);
    const maxVisibleItems = Math.floor(availableWidth / (itemWidth + gap));

    // On mobile, show fewer items to ensure menu button is always visible
    const actualMaxItems = isSmallScreen
      ? Math.min(maxVisibleItems, 4)
      : maxVisibleItems;

    const newVisibleItems = navItems.slice(0, Math.max(1, actualMaxItems));
    const newOverflowItems = navItems.slice(actualMaxItems);

    setVisibleNavItems(newVisibleItems);
    setOverflowNavItemsLocal(newOverflowItems);

    if (setOverflowNavItems) {
      setOverflowNavItems(newOverflowItems);
    }
  }, [setOverflowNavItems]);

  useEffect(() => {
    calculateFittingItems();
    const handleResize = () => calculateFittingItems();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateFittingItems]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleMenuToggle = () => {
    setShowOverflowMenu(!showOverflowMenu);
  };

  const getIconScale = (index) => {
    if (hoveredIndex === -1 || window.innerWidth < 640) return 1; // Disable scaling on mobile

    const distance = Math.abs(index - hoveredIndex);
    const maxScale = 1.4; // Reduced for better mobile experience
    const minScale = 1;

    if (distance === 0) return maxScale;
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.1;

    return minScale;
  };

  const getIconTransform = (index) => {
    const scale = getIconScale(index);
    const translateY = scale > 1.1 ? -8 : 0; // Reduced movement
    return `scale(${scale}) translateY(${translateY}px)`;
  };

  const showMenuButton = overflowNavItems.length > 0 || window.innerWidth < 640;

  return (
    <>
      {/* Bottom Navigation Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-2 sm:pb-4 px-2 sm:px-4">
        <div
          ref={dockRef}
          className="relative flex flex-col items-center"
          onMouseMove={(e) => {
            if (window.innerWidth >= 640) {
              setHoveredIndex(-1); // Reset on mouse move to calculate properly
            }
          }}
          onMouseLeave={() => setHoveredIndex(-1)}
        >
          {/* Combined Icon Container with integrated labels */}
          <div
            className="flex items-end justify-evenly px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl w-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
              minWidth: "320px",
              maxWidth: "95vw",
            }}
          >
            {/* Dock background glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-xl sm:rounded-2xl pointer-events-none" />

            {visibleNavItems.map(
              ({ path, icon: Icon, label, testId, color }, index) => {
                const isActive =
                  location === path ||
                  (path !== "/" && location.startsWith(path));

                return (
                  <div
                    key={path}
                    className="relative flex flex-col items-center gap-1"
                    onMouseEnter={() => {
                      if (window.innerWidth >= 640) {
                        setHoveredIndex(index);
                      }
                    }}
                  >
                    {/* Tooltip on hover - Desktop only */}
                    {hoveredIndex === index && window.innerWidth >= 640 && (
                      <div className="absolute -top-16 px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 whitespace-nowrap z-10">
                        {label}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
                      </div>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-lg" />
                    )}

                    <button
                      className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-200 ease-out hover:shadow-lg group ${color}`}
                      onClick={() => handleNavigation(path)}
                      data-testid={testId}
                      style={{
                        transform: getIconTransform(index),
                        transformOrigin: "bottom center",
                      }}
                    >
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60" />

                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 drop-shadow-sm" />

                      {/* Reflection effect */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent rounded-b-lg sm:rounded-b-xl" />
                    </button>

                    {/* Label directly below icon */}
                    <span
                      className={`text-xs font-medium text-center transition-all duration-200 leading-3 ${
                        isActive ? "text-white" : "text-white/70"
                      } ${
                        hoveredIndex === index && window.innerWidth >= 640
                          ? "text-white font-semibold"
                          : ""
                      }`}
                      style={{
                        fontSize:
                          hoveredIndex === index && window.innerWidth >= 640
                            ? "0.65rem"
                            : "0.6rem",
                        maxWidth: "48px",
                        wordWrap: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      {label.length > 8 ? label.substring(0, 6) + ".." : label}
                    </span>
                  </div>
                );
              }
            )}

            {/* Show menu button if there are overflow items OR on mobile */}
            {showMenuButton && (
              <>
                {/* Divider - only show on desktop when there are visible items */}
                {visibleNavItems.length > 0 && window.innerWidth >= 640 && (
                  <div className="w-px h-12 sm:h-16 bg-white/20 mx-1 self-center" />
                )}

                {/* Menu button with label */}
                <div
                  className="relative flex flex-col items-center gap-1"
                  onMouseEnter={() => {
                    if (window.innerWidth >= 640) {
                      setHoveredIndex(visibleNavItems.length);
                    }
                  }}
                >
                  {/* Tooltip - Desktop only */}
                  {hoveredIndex === visibleNavItems.length &&
                    window.innerWidth >= 640 && (
                      <div className="absolute -top-16 px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
                        More Apps
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
                      </div>
                    )}

                  <button
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-200 ease-out hover:shadow-lg group ${
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
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60" />

                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 drop-shadow-sm" />

                    {/* Reflection effect */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent rounded-b-lg sm:rounded-b-xl" />
                  </button>

                  {/* Menu label directly below button */}
                  <span
                    className={`text-xs font-medium text-center transition-all duration-200 leading-3 ${
                      showOverflowMenu
                        ? "text-white font-semibold"
                        : "text-white/70"
                    } ${
                      hoveredIndex === visibleNavItems.length &&
                      window.innerWidth >= 640
                        ? "text-white font-semibold"
                        : ""
                    }`}
                    style={{
                      fontSize:
                        hoveredIndex === visibleNavItems.length &&
                        window.innerWidth >= 640
                          ? "0.65rem"
                          : "0.6rem",
                      maxWidth: "48px",
                    }}
                  >
                    Menu
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overflow Menu */}
      <OverflowMenu
        isOpen={showOverflowMenu}
        onClose={() => setShowOverflowMenu(false)}
        overflowItems={overflowNavItems}
        currentLocation={location}
        onNavigate={handleNavigation}
      />
    </>
  );
}
