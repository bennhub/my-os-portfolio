import { useState, useEffect, useRef } from "react";
import {
  Wifi,
  WifiOff,
  BatteryFull,
  BatteryLow,
  BatteryCharging,
  Sun,
  Moon,
  Settings,
  Maximize2,
  Minimize2,
  LucideCopyright,
  ChevronDown,
  X
} from "lucide-react"; // Import close icon
import { useTheme } from "../contexts/ThemeContext";
import Calendar from "./Calendar";
import WallpaperSelector from "./WallpaperSel";
import useBatteryStatus from "../hooks/useBatteryStatus";
import { portfolio } from "../data/portfolio";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
interface MenuBarProps {
  switchWallpaper: (wallpaperSrc: string) => void; // Define the prop type
}

const MenuBar: React.FC<MenuBarProps> = ({ switchWallpaper }) => {
  const { theme, toggleTheme } = useTheme() as ThemeContextType;
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const batteryStatus = useBatteryStatus();
  const wifiStrength: number = 3;
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);

  

  const handleCloseWallpaperSelector = (): void => {
    setIsWallpaperSelectorOpen(false);
  };

  const handleSelectWallpaper = (wallpaper: string): void => {
    // Call the passed switchWallpaper function to change the wallpaper
    switchWallpaper(wallpaper);
    setIsWallpaperSelectorOpen(false); // Close the wallpaper selector after selection
  };
  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    if (deltaY > 0 && deltaY < 300 && drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (): void => {
    const deltaY = currentY.current - startY.current;
    if (!drawerRef.current) return;

    if (deltaY > 50) {
      setIsDrawerOpen(true);
      drawerRef.current.style.transform = 'translateY(100%)';
    } else {
      setIsDrawerOpen(false);
      drawerRef.current.style.transform = 'translateY(0)';
    }
  };

  const handleDrawerClose = (): void => {
    setIsDrawerOpen(false);
    if (drawerRef.current) {
      drawerRef.current.style.transform = 'translateY(-100%)';
    }
  };
  const handleOpenWallpaperSelector = (): void => {
    handleDrawerClose();
    setIsWallpaperSelectorOpen(true);
  };
  const handleCalendarClick = (): void => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleFullscreenToggle = async (): Promise<void> => {
    if (isFullscreen) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const renderBatteryIcon = (): React.ReactNode => {
    const { level, charging } = batteryStatus;
    
    if (charging) {
      return <BatteryCharging className="h-5 w-5 text-green-500 sm:h-4 sm:w-4" />;
    }
    
    if (level > 80)
      return <BatteryFull className="h-5 w-5 text-black dark:text-white sm:h-4 sm:w-4" />;
    if (level > 30)
      return <BatteryCharging className="h-5 w-5 text-black dark:text-white sm:h-4 sm:w-4" />;
    return <BatteryLow className="h-5 w-5 text-red-500 sm:h-4 sm:w-4" />;
  };

  const renderWifiIcon = (): React.ReactNode => {
    if (wifiStrength === 3) return <Wifi className="h-5 w-5 text-black dark:text-white sm:h-4 sm:w-4" />;
    if (wifiStrength === 2) return <Wifi className="h-5 w-5 text-yellow-500 sm:h-4 sm:w-4" />;
    if (wifiStrength === 1) return <Wifi className="h-5 w-5 text-red-500 sm:h-4 sm:w-4" />;
    return <WifiOff className="h-5 w-5 text-gray-500 sm:h-4 sm:w-4" />;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 h-11 sm:h-8 ${
          theme === "light"
            ? "bg-gradient-to-br from-white/70 to-gray-100/70 text-black"
            : "bg-gradient-to-br from-gray-900/70 to-gray-800/70 text-white"
        } z-50 flex items-center justify-between px-3 sm:px-4 backdrop-blur-xl transition-colors duration-300`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <span className="hidden text-xs sm:text-sm md:block">{portfolio.name}</span>
          <span className="text-sm md:hidden">{portfolio.shortName}</span>
          <LucideCopyright className="h-4 w-4 font-thin sm:h-4 sm:w-4"/>
          <span className="text-sm sm:text-sm">2026</span>
        </div>
        
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <ChevronDown className="h-6 w-6 sm:hidden" />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-1.5 transition-colors hover:bg-gray-200/50 dark:hover:bg-black/25 sm:p-1"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 sm:h-4 sm:w-4" />
            ) : (
              <Sun className="h-5 w-5 sm:h-4 sm:w-4" />
            )}
          </button>
          
          <button
            onClick={handleOpenWallpaperSelector}
            aria-label="Open settings"
            className="rounded-full p-1.5 transition-colors hover:bg-gray-200/50 dark:hover:bg-black/25 sm:p-1"
          >
            <Settings className="h-5 w-5 cursor-pointer transition-transform hover:scale-110 sm:h-4 sm:w-4" />
          </button>
          
          <div className="relative group">
            {renderBatteryIcon()}
            <span className="absolute left-1/2 top-7 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:top-7">
              {batteryStatus.level}% {batteryStatus.charging ? '⚡' : ''}
            </span>
          </div>

          <div className="relative group">
            {renderWifiIcon()}
            <span className="absolute left-1/2 top-7 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:top-7">
              {`${wifiStrength * 33}%`}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={handleCalendarClick}
              aria-label="Toggle calendar"
              className={`text-sm ${theme === "light" ? "text-black" : "text-white"} sm:text-sm`}
            >
              {formatDate(dateTime)}
            </button>
            {isCalendarOpen && (
              <div className="absolute top-6 sm:top-8 left-[0%] transform -translate-x-1/2 z-10 sm:block hidden">
                <Calendar />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              aria-label="Display time"
              className={`text-sm ${theme === "light" ? "text-black" : "text-white"} sm:text-sm`}
            >
              {formatTime(dateTime)}
            </button>
          </div>

          <button
            onClick={handleFullscreenToggle}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="p-0.5 sm:p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors hidden sm:block"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 sm:w-4 sm:h-4" />
            ) : (
              <Maximize2 className="w-4 h-4 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>

      <div
        ref={drawerRef}
        className={`fixed left-0 right-0 top-11 sm:hidden ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        } shadow-lg transition-transform duration-300 ease-in-out z-40`}
        style={{
          transform: isDrawerOpen ? 'translateY(100%)' : 'translateY(-100%)',
          height: 'auto',
          maxHeight: '80vh'
        }}
      >
        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{portfolio.name}</span>
            <div className="flex items-center space-x-1">
              <LucideCopyright className="h-3 w-3" />
              <span className="text-sm">2026</span>
            </div>
            <button onClick={handleDrawerClose} aria-label="Close Drawer" className="p-1 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
            
            
          <div className="flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"  onClick={handleOpenWallpaperSelector } >
          <Settings
            className="h-5 w-5"
          />
              <span>Change Background</span>
            </div>
            <div className="flex items-center space-x-3 p-3">
              {renderBatteryIcon()}
              <span>Battery: {batteryStatus.level}% {batteryStatus.charging ? '(Charging)' : ''}</span>
            </div>

            <div className="flex items-center space-x-3 p-3">
              {renderWifiIcon()}
              <span>WiFi Strength: {wifiStrength * 33}%</span>
            </div>

            <div className="p-3">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
      {isWallpaperSelectorOpen && (
        <WallpaperSelector
          onSelectWallpaper={handleSelectWallpaper}
          closeWindow={handleCloseWallpaperSelector}
        />
      )}
    </>
  );
};

export default MenuBar;
