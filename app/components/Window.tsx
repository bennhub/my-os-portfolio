import { useState, useRef, useEffect, useCallback } from "react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onPositionChange?: (windowId: string, position: { bottom: number; width: number; height: number }) => void;
}

const MENU_BAR_HEIGHT = 32;
const SIDE_DRAG_WIDTH = 14;

export default function Window({ id, title, children, onClose, onPositionChange }: WindowProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeOffset, setResizeOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [initialViewportHeight, setInitialViewportHeight] = useState(0);

  const windowRef = useRef<HTMLDivElement>(null);

  const clampPosition = useCallback((nextX: number, nextY: number) => {
    const isMobileView = window.innerWidth <= 768;
    const menuBarHeight = isMobileView ? 44 : 32; // Mobile: 44px, Desktop: 32px
    const dockHeight = isMobileView ? (keyboardOpen ? 0 : 100) : 80; // No dock space when keyboard is open
    const maxX = Math.max(0, window.innerWidth - size.width);
    const maxY = Math.max(menuBarHeight, window.innerHeight - dockHeight - 10); // Extra margin

    return {
      x: Math.min(Math.max(0, nextX), maxX),
      y: Math.min(Math.max(menuBarHeight, nextY), maxY),
    };
  }, [size.width, keyboardOpen]);

  const updateDeviceType = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);

    if (width <= 480) {
      const menuBarHeight = 44;
      const dockHeight = 100; // Approximate mobile dock height
      const availableHeight = window.innerHeight - menuBarHeight - dockHeight - 20; // 20px margins
      setSize({ width: width * 0.95, height: Math.min(availableHeight, window.innerHeight * 0.75) });
      setPosition({ x: width * 0.025, y: 54 }); // 44px menu bar + 10px spacing
    } else if (width <= 768) {
      const menuBarHeight = 44;
      const dockHeight = 90; // Approximate tablet dock height
      const availableHeight = window.innerHeight - menuBarHeight - dockHeight - 20; // 20px margins
      setSize({ width: width * 0.9, height: Math.min(availableHeight, window.innerHeight * 0.65) });
      setPosition({ x: width * 0.05, y: 54 }); // 44px menu bar + 10px spacing
    } else if (width <= 1024) {
      setSize({ width: 700, height: 500 });
      setPosition({ x: 50, y: 60 });
    } else {
      setSize({ width: 800, height: 600 });
      setPosition({ x: 50, y: 60 });
    }
  };

  // Track window position for dock collision detection
  useEffect(() => {
    if (onPositionChange) {
      const windowBottom = window.innerHeight - (position.y + size.height);
      onPositionChange(id, {
        bottom: windowBottom,
        width: size.width,
        height: size.height
      });
    }
  }, [position, size, id, onPositionChange]);

  useEffect(() => {
    updateDeviceType();

    const handleResize = () => {
      updateDeviceType();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-maximize on mobile/tablet for app-like experience
  useEffect(() => {
    const isMobileOrTablet = window.innerWidth <= 768;
    if (isMobileOrTablet && !isMaximized && !isMinimized) {
      // Small delay to ensure window is properly initialized
      const timer = setTimeout(() => {
        const menuBarHeight = 44; // Mobile menu bar height
        setPosition({ x: 0, y: menuBarHeight });
        setSize({
          width: window.innerWidth,
          height: window.innerHeight - menuBarHeight,
        });
        setIsMaximized(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isMaximized, isMinimized]); // Run when mobile state or maximize/minimize state changes

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isMinimized) {
        setIsMinimized(false);
      }
      if (isMaximized) {
        setIsMaximized(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isMinimized, isMaximized]);

  // Keyboard detection for mobile devices
  useEffect(() => {
    if (!isMobile) return;

    setInitialViewportHeight(window.innerHeight);

    const handleViewportChange = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;

      // If viewport height decreased by more than 150px, assume keyboard is open
      if (heightDifference > 150) {
        setKeyboardOpen(true);
        // Adjust window position to stay above keyboard
        setPosition(prevPosition => {
          const menuBarHeight = 44;
          const availableSpace = currentHeight - menuBarHeight - 20; // 20px margin

          return {
            x: prevPosition.x,
            y: Math.max(menuBarHeight, Math.min(prevPosition.y, availableSpace - size.height))
          };
        });
      } else {
        setKeyboardOpen(false);
      }
    };

    window.addEventListener("resize", handleViewportChange);
    // Also listen for orientationchange which can help on some devices
    window.addEventListener("orientationchange", () => {
      setTimeout(handleViewportChange, 100);
    });

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
    };
  }, [isMobile, initialViewportHeight, size.height]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const nextPosition = clampPosition(
          e.clientX - dragOffset.x,
          e.clientY - dragOffset.y
        );
        setPosition(nextPosition);
      }

      if (isResizing && windowRef.current) {
        setSize({
          width: e.clientX - windowRef.current.offsetLeft - resizeOffset.x,
          height: e.clientY - windowRef.current.offsetTop - resizeOffset.y,
        });
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, dragOffset, isResizing, resizeOffset, size.width, clampPosition]);

  const startDragging = (clientX: number, clientY: number) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleDragPointerDown = (e: React.PointerEvent) => {
    startDragging(e.clientX, e.clientY);
  };

  const handleMaximize = () => {
    if (windowRef.current) {
      setPosition({ x: 0, y: MENU_BAR_HEIGHT });
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - MENU_BAR_HEIGHT,
      });
      setIsMaximized(true);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    if (windowRef.current) {
      updateDeviceType();
      setIsMaximized(false);
      setIsMinimized(true);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isMobile || !windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    setResizeOffset({
      x: e.clientX - rect.right,
      y: e.clientY - rect.bottom,
    });
    setIsResizing(true);
  };

  const stopHeaderAction = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white/25 dark:bg-black/25 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 transition-all duration-300 ${
        isMobile ? "rounded-lg" : "rounded-xl"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: isMobile ? "300px" : "400px",
        minHeight: isMobile ? "200px" : "300px",
        maxWidth: isMobile ? "100vw" : "none",
        maxHeight: isMobile ? "100vh" : "none",
        transition:
          isMaximized || isMinimized
            ? "width 0.3s ease, height 0.3s ease"
            : "none",
      }}
    >
      <div
        className="absolute left-0 top-8 bottom-0 z-10 cursor-move touch-none"
        style={{ width: `${SIDE_DRAG_WIDTH}px` }}
        onPointerDown={handleDragPointerDown}
      />
      <div
        className="absolute right-0 top-8 bottom-0 z-10 cursor-move touch-none"
        style={{ width: `${SIDE_DRAG_WIDTH}px` }}
        onPointerDown={handleDragPointerDown}
      />

      <div
        className="relative z-20 flex h-10 items-center justify-between border-b border-white/10 bg-gray-100/80 px-3 backdrop-blur-sm transition-colors duration-300 dark:border-white/5 dark:bg-gray-800/80 sm:h-11 sm:px-4"
      >
        <div
          className="absolute inset-y-0 left-28 right-0 cursor-move touch-none sm:left-32"
          onPointerDown={handleDragPointerDown}
        />
        <div className="relative z-20 flex items-center space-x-2.5 sm:space-x-3">
          <button
            className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600 sm:h-5 sm:w-5"
            onPointerDown={stopHeaderAction}
            onClick={onClose}
          >
            <X className="h-3.5 w-3.5 text-white sm:h-3 sm:w-3" />
          </button>

          <button
            className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600 sm:h-5 sm:w-5"
            onPointerDown={stopHeaderAction}
            onClick={handleMinimize}
          >
            <Minus className="h-3.5 w-3.5 text-white sm:h-3 sm:w-3" />
          </button>

          <button
            className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 transition-colors hover:bg-green-600 sm:h-5 sm:w-5"
            onPointerDown={stopHeaderAction}
            onClick={handleMaximize}
          >
            <Square className="h-3.5 w-3.5 text-white sm:h-3 sm:w-3" />
          </button>
        </div>
        <div className="pointer-events-none relative z-20 px-4 text-xs text-gray-600 truncate dark:text-gray-300 sm:text-sm">
          {title}
        </div>
      </div>

      <div className="h-[calc(100%-2.5rem)] overflow-auto bg-white/50 text-gray-800 backdrop-blur-md transition-colors duration-300 dark:bg-black/50 dark:text-gray-200 sm:h-[calc(100%-2.75rem)]">
        {children}
      </div>

      {!isMobile && (
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-20"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}
