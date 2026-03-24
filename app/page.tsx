'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import MenuBar from "./components/MenuBar";
import Window from "./components/Window";
import { ThemeProvider } from "./contexts/ThemeContext";
import CodePracticeApp from "./components/VSCodeEditor";
import GeminiChat from "./components/BrowserWindow";
import Terminal from "./components/Terminal";
import ResumeWindow from "./components/ResumeWindow";
import ProfileCard from "./components/AboutMe";
import ConnectWithMe from "./components/Social";
import Projects from "./components/Project";
import WorkExperience from "./components/WorkExperience";
import type { ReactNode } from "react";
import AutomationLab from "./components/AutomationLab";
import MediaShowcase from "./components/MediaShowcase";
import AppEmbed from "./components/AppEmbed";
import { portfolio } from "./data/portfolio";
import { iconRegistry, mobileDockDefaultIds, mobileIconOrder } from "./data/iconRegistry";
import wallpaper from "@/public/wallpaper1.png";

interface WindowConfig {
  id: string;
  title: string;
  content: ReactNode;
  isResume?: boolean;
}

export default function Home() {
  const MOBILE_DOCK_LIMIT = 6;
  const [isMounted, setIsMounted] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeDockItem, setActiveDockItem] = useState<string | null>(null);
  const [wallpaper1, setWallpaper] = useState<string>(wallpaper.src);
  const [mobileDockIconIds, setMobileDockIconIds] = useState<string[]>(mobileDockDefaultIds);
  const [mobileDraggedIconId, setMobileDraggedIconId] = useState<string | null>(null);
  const [mobileDragPreview, setMobileDragPreview] = useState<{ x: number; y: number } | null>(null);
  const [dragMoved, setDragMoved] = useState(false);
  const dragPointerOffset = useRef({ x: 0, y: 0 });
  const suppressMobileClickRef = useRef(false);

  // Window tracking for dock auto-hide
  const [windowPositions, setWindowPositions] = useState<Record<string, { bottom: number; width: number; height: number }>>({});
  const [isDockHidden, setIsDockHidden] = useState(false);
  const [isDockOverridden, setIsDockOverridden] = useState(false);

  // Wallpapers are managed via WallpaperSelector; stored wallpaper src in state and localStorage

  useEffect(() => {
    setIsMounted(true);

    const savedWindows = localStorage.getItem("openWindows");
    if (savedWindows) setOpenWindows(JSON.parse(savedWindows));

    const savedWallpaper = localStorage.getItem("wallpaper");
    if (savedWallpaper) setWallpaper(savedWallpaper);

    const savedMobileDockIcons = localStorage.getItem("mobileDockIconIds");
    if (savedMobileDockIcons) {
      try {
        const parsed = JSON.parse(savedMobileDockIcons) as string[];
        const sanitized = parsed.filter((id, index) => iconRegistry[id] && parsed.indexOf(id) === index).slice(0, MOBILE_DOCK_LIMIT);
        setMobileDockIconIds(sanitized);
      } catch {
        setMobileDockIconIds(mobileDockDefaultIds);
      }
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("openWindows", JSON.stringify(openWindows));
  }, [openWindows, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("mobileDockIconIds", JSON.stringify(mobileDockIconIds));
  }, [mobileDockIconIds, isMounted]);

  const switchWallpaper = (wallpaperSrc: string) => {
    setWallpaper(wallpaperSrc);
    localStorage.setItem("wallpaper", wallpaperSrc);
  };

  const openWindow = useCallback((id: string) => {
    setOpenWindows((prev) =>
      prev.includes(id)
        ? [...prev.filter((windowId) => windowId !== id), id]
        : [...prev, id]
    );
  }, []);

  const removeWindowPosition = useCallback((windowId: string) => {
    setWindowPositions(prev => {
      const newPositions = { ...prev };
      delete newPositions[windowId];
      return newPositions;
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setActiveDockItem((prev) => (prev === id ? null : prev));
    removeWindowPosition(id);
  }, [removeWindowPosition]);

  const handleDockItemClick = useCallback((id: string) => {
    openWindow(id);
    setActiveDockItem(id);
  }, [openWindow]);

  const handleMobileIconClick = useCallback((id: string) => {
    if (suppressMobileClickRef.current) {
      suppressMobileClickRef.current = false;
      return;
    }

    openWindow(id);
    setActiveDockItem(id);
  }, [openWindow]);

  // Window tracking callbacks
  const updateWindowPosition = useCallback((windowId: string, position: { bottom: number; width: number; height: number }) => {
    setWindowPositions(prev => ({
      ...prev,
      [windowId]: position
    }));
  }, []);

  // Check for dock collision
  useEffect(() => {
    const COLLISION_THRESHOLD = 120; // Show dock when windows are this close to bottom

    const hasCollision = Object.values(windowPositions).some(window =>
      window.bottom <= COLLISION_THRESHOLD
    );

    // Only auto-hide if there's a collision and dock isn't overridden
    setIsDockHidden(hasCollision && !isDockOverridden);
  }, [windowPositions, isDockOverridden]);

  // Reset override when no more collisions
  useEffect(() => {
    const hasCollision = Object.values(windowPositions).some(window =>
      window.bottom <= 120
    );

    if (!hasCollision) {
      setIsDockOverridden(false);
    }
  }, [windowPositions]);

  const handleDockTabClick = useCallback(() => {
    setIsDockOverridden(true);
  }, []);

  const finishMobileDrag = useCallback(() => {
    setMobileDraggedIconId(null);
    setMobileDragPreview(null);
    setDragMoved(false);
  }, []);

  const handleMobileIconPointerDown = useCallback((id: string, event: React.PointerEvent<HTMLButtonElement>) => {
    if (window.innerWidth >= 640) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    dragPointerOffset.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    };

    setMobileDraggedIconId(id);
    setMobileDragPreview({
      x: bounds.left,
      y: bounds.top
    });
    setDragMoved(false);

    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handleMobileIconPointerMove = useCallback((event: PointerEvent) => {
    setMobileDragPreview((current) => {
      if (!current) {
        return current;
      }

      const nextPosition = {
        x: event.clientX - dragPointerOffset.current.x,
        y: event.clientY - dragPointerOffset.current.y
      };

      const hasMovedEnough =
        Math.abs(nextPosition.x - current.x) > 6 ||
        Math.abs(nextPosition.y - current.y) > 6;

      if (hasMovedEnough) {
        setDragMoved(true);
      }

      return nextPosition;
    });
  }, []);

  const moveMobileIconToDock = useCallback((id: string) => {
    setMobileDockIconIds((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id].slice(0, MOBILE_DOCK_LIMIT);
    });
  }, []);

  const moveMobileIconToDesktop = useCallback((id: string) => {
    setMobileDockIconIds((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  const handleGlobalMobilePointerUp = useCallback((event: PointerEvent) => {
    if (!mobileDraggedIconId) {
      return;
    }

    if (!dragMoved) {
      finishMobileDrag();
      return;
    }

    suppressMobileClickRef.current = true;
    window.setTimeout(() => {
      suppressMobileClickRef.current = false;
    }, 0);

    const dropTarget = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>("[data-mobile-dropzone]")
      ?.dataset.mobileDropzone;

    if (dropTarget === "dock") {
      moveMobileIconToDock(mobileDraggedIconId);
    } else if (dropTarget === "desktop") {
      moveMobileIconToDesktop(mobileDraggedIconId);
    }

    finishMobileDrag();
  }, [dragMoved, finishMobileDrag, mobileDraggedIconId, moveMobileIconToDesktop, moveMobileIconToDock]);

  useEffect(() => {
    if (!mobileDraggedIconId) {
      return;
    }

    window.addEventListener("pointermove", handleMobileIconPointerMove);
    window.addEventListener("pointercancel", finishMobileDrag);
    window.addEventListener("pointerup", handleGlobalMobilePointerUp);

    return () => {
      window.removeEventListener("pointermove", handleMobileIconPointerMove);
      window.removeEventListener("pointercancel", finishMobileDrag);
      window.removeEventListener("pointerup", handleGlobalMobilePointerUp);
    };
  }, [finishMobileDrag, handleGlobalMobilePointerUp, handleMobileIconPointerMove, mobileDraggedIconId]);

  const audioAppWindows = Object.fromEntries(
    portfolio.music.apps.map((app) => [
      app.id,
      {
        id: app.id,
        title: app.title,
        content: <AppEmbed title={app.title} url={app.url} description={app.description} />,
      },
    ])
  );

  const windowConfigs: Record<string, WindowConfig> = {
    about: {
      id: "about",
      title: "About Me",
      content: <ProfileCard />,
    },
    "work-experience": {
      id: "work-experience",
      title: "QA Life",
      content: <WorkExperience />,
    },
    projects: {
      id: "projects",
      title: "My Projects",
      content: <Projects />,
    },
    contact: {
      id: "contact",
      title: "Contact Me",
      content: <ConnectWithMe />,
    },
    vscode: {
      id: "vscode",
      title: "Code Practice",
      content: <CodePracticeApp />,
    },
    browser: {
      id: "browser",
      title: "Browser",
      content: <GeminiChat />,
    },
    automation: {
      id: "automation",
      title: "Automation Lab",
      content: <AutomationLab />,
    },
    terminal: {
      id: "terminal",
      title: "Terminal",
      content: <Terminal />,
    },
    resume: {
      id: "resume",
      title: "Resume",
      content: null,
      isResume: true,
    },
    media: {
      id: "media",
      title: "Media Showcase",
      content: <MediaShowcase />,
    },
    ...audioAppWindows,
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "t") openWindow("terminal");
  }, [openWindow]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!isMounted) return null;

  return (
    <ThemeProvider>
      <div
        className="relative min-h-screen min-w-full overflow-hidden bg-cover bg-center bg-no-repeat text-black transition-colors duration-300 dark:text-white"
        style={{ backgroundImage: `url(${wallpaper1})` }}
      >
        <MenuBar switchWallpaper={switchWallpaper} />
        <Desktop
          openWindow={openWindow}
          mobileDockIconIds={mobileDockIconIds}
          mobileDraggedIconId={mobileDraggedIconId}
          onMobileIconPointerDown={handleMobileIconPointerDown}
          onMobileIconClick={handleMobileIconClick}
        />

        {openWindows.map((windowId) => {
          const config = windowConfigs[windowId];
          if (!config) return null;

          if (config.isResume) {
            return <ResumeWindow key={windowId} onClose={() => closeWindow(windowId)} onPositionChange={updateWindowPosition} />;
          }

          return (
            <Window
              key={windowId}
              id={config.id}
              title={config.title}
              onClose={() => closeWindow(windowId)}
              onPositionChange={updateWindowPosition}
            >
              {config.content}
            </Window>
          );
        })}
        <Dock
          onDockItemClick={handleDockItemClick}
          activeItem={activeDockItem}
          mobileDockIconIds={mobileDockIconIds}
          mobileDraggedIconId={mobileDraggedIconId}
          onMobileIconPointerDown={handleMobileIconPointerDown}
          onMobileIconClick={handleMobileIconClick}
          isHidden={isDockHidden}
        />

        {/* Dock tab indicator when hidden */}
        {isDockHidden && (
          <div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 cursor-pointer"
            onClick={handleDockTabClick}
          >
            <div className="bg-gradient-to-br from-white/70 to-gray-100/70 dark:from-gray-900/70 dark:to-gray-800/70 backdrop-blur-xl border border-white/55 dark:border-white/20 rounded-t-2xl px-7 py-1.5 shadow-2xl hover:bg-gradient-to-br hover:from-white/80 hover:to-gray-100/80 dark:hover:from-gray-900/80 dark:hover:to-gray-800/80 transition-all duration-200 hover:scale-105">
              <div className="w-12 h-3 bg-gray-500 dark:bg-gray-400 rounded-full shadow-inner"></div>
            </div>
          </div>
        )}

        {mobileDraggedIconId && mobileDragPreview && mobileIconOrder.includes(mobileDraggedIconId) ? (
          <div
            className="pointer-events-none fixed z-[120] sm:hidden"
            style={{
              left: mobileDragPreview.x,
              top: mobileDragPreview.y
            }}
          >
            <div className="flex flex-col items-center opacity-90">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/55 bg-white/24 shadow-[0_10px_24px_rgba(15,23,42,0.18)] backdrop-blur-md dark:border-white/14 dark:bg-black/22">
                <div
                  className={`flex h-[72%] w-[72%] items-center justify-center rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_14px_rgba(15,23,42,0.22)] ${iconRegistry[mobileDraggedIconId].badgeClassName}`}
                >
                  {iconRegistry[mobileDraggedIconId].icon}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </ThemeProvider>
  );
}
