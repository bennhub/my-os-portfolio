import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { useState } from 'react'
import { desktopDockIcons, iconRegistry } from '../data/iconRegistry'


interface DockItemProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  icon: ReactNode;
  badgeClassName: string;
  className?: string;
  onPointerDown?: (event: ReactPointerEvent<HTMLButtonElement>) => void;
}

interface DockProps {
  onDockItemClick: (id: string) => void;
  activeItem: string | null;
  mobileDockIconIds: string[];
  mobileDraggedIconId: string | null;
  onMobileIconPointerDown: (id: string, event: ReactPointerEvent<HTMLButtonElement>) => void;
  onMobileIconClick: (id: string) => void;
  isHidden?: boolean;
}

const DockItem = ({ label, onClick, isActive, icon, badgeClassName, className, onPointerDown }: DockItemProps) => (
  <div className={`group relative flex flex-col items-center ${className ?? ''}`}>
    <button
      onClick={onClick}
      onPointerDown={onPointerDown}
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border bg-white/26 text-sm shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out
        group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-white/32
        sm:h-10 sm:w-10 sm:rounded-xl lg:h-12 lg:w-12 lg:rounded-2xl
        dark:bg-black/24 dark:group-hover:bg-black/30
        hover:shadow-xl
        ${isActive
          ? "border-blue-500/80 dark:border-blue-400/80 ring-2 ring-blue-400/40 dark:ring-blue-500/30"
          : "border-white/55 dark:border-white/14"}`}
    >
      <div
        className={`flex h-[76%] w-[76%] items-center justify-center rounded-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_14px_rgba(15,23,42,0.22)] sm:h-[68%] sm:w-[68%] sm:rounded-[12px] ${badgeClassName}`}
      >
        {icon}
      </div>
    </button>
    <div className="absolute -top-10 hidden scale-0 transition-all duration-200 z-50 sm:-top-10 sm:block group-hover:scale-100">
      <div className="relative px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        rounded-lg text-xs font-medium shadow-lg whitespace-nowrap">
        {label}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 
          bg-white dark:bg-gray-900 rotate-45"></div>
      </div>
    </div>
  </div>
)

export default function Dock({
  onDockItemClick,
  activeItem,
  mobileDockIconIds,
  mobileDraggedIconId,
  onMobileIconPointerDown,
  onMobileIconClick,
  isHidden = false
}: DockProps) {
  const [isHovering, setIsHovering] = useState(false);

  const shouldShowDock = !isHidden || isHovering;

  return (
    <div
      className={`fixed left-1/2 w-[calc(100vw-1rem)] max-w-[95vw] -translate-x-1/2 sm:w-auto transition-all duration-300 ease-out ${
        shouldShowDock
          ? 'bottom-2 sm:bottom-4'
          : '-bottom-20 sm:-bottom-24'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="flex min-h-[84px] items-center justify-center gap-2.5 px-3.5 py-2.5
        bg-gradient-to-br from-white/70 to-gray-100/70
        dark:from-gray-900/70 dark:to-gray-800/70
        backdrop-blur-xl rounded-2xl sm:gap-2 sm:px-4 sm:py-2 sm:rounded-xl shadow-2xl
        border border-black/5 dark:border-white/10
        transition-all duration-300 overflow-x-auto"
        data-mobile-dropzone="dock"
      >
        <div className="flex items-center justify-center gap-2.5 sm:hidden">
          {mobileDockIconIds.map((id) => {
            const iconItem = iconRegistry[id]
            if (!iconItem) {
              return null
            }

            return (
              <DockItem
                key={id}
                label={iconItem.label}
                onClick={() => onMobileIconClick(id)}
                isActive={activeItem === id}
                badgeClassName={iconItem.badgeClassName}
                icon={iconItem.icon}
                className={mobileDraggedIconId === id ? 'opacity-40' : ''}
                onPointerDown={(event) => onMobileIconPointerDown(id, event)}
              />
            )
          })}
        </div>

        {desktopDockIcons.map((iconItem) => (
          <DockItem
            key={iconItem.id}
            label={iconItem.label}
            onClick={() => onDockItemClick(iconItem.id)}
            isActive={activeItem === iconItem.id}
            badgeClassName={iconItem.badgeClassName}
            icon={iconItem.icon}
            className="hidden sm:flex"
          />
        ))}
      </div>
    </div>
  )
}
