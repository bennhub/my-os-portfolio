import type { PointerEvent as ReactPointerEvent } from 'react'
import { desktopAppIcons, desktopPrimaryIcons, iconRegistry, mobileIconOrder } from '../data/iconRegistry'
import { portfolio } from '../data/portfolio'

interface DesktopProps {
  openWindow: (id: string) => void
  mobileDockIconIds: string[]
  mobileDraggedIconId: string | null
  onMobileIconPointerDown: (id: string, event: ReactPointerEvent<HTMLButtonElement>) => void
  onMobileIconClick: (id: string) => void
}

export default function Desktop({
  openWindow,
  mobileDockIconIds,
  mobileDraggedIconId,
  onMobileIconPointerDown,
  onMobileIconClick
}: DesktopProps) {
  const desktopColumns = [
    desktopAppIcons.slice(0, Math.ceil(desktopAppIcons.length / 2)),
    desktopAppIcons.slice(Math.ceil(desktopAppIcons.length / 2))
  ].filter((column) => column.length > 0)

  const mobileDesktopIcons = mobileIconOrder
    .filter((id) => !mobileDockIconIds.includes(id))
    .map((id) => iconRegistry[id])
    .filter(Boolean)

  const renderIcon = ({ id, label, icon, badgeClassName }: (typeof desktopPrimaryIcons)[number]) => (
    <button
      key={id}
      className="flex flex-col items-center"
      onClick={() => openWindow(id)}
    >
      <div className="group flex flex-col items-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/55 bg-white/24 shadow-[0_10px_24px_rgba(15,23,42,0.18)] backdrop-blur-md transition duration-200 group-hover:scale-[1.08] group-hover:bg-white/30 sm:h-14 sm:w-14 sm:rounded-2xl dark:border-white/14 dark:bg-black/22 dark:group-hover:bg-black/28"
        >
          <div
            className={`flex h-[72%] w-[72%] items-center justify-center rounded-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_14px_rgba(15,23,42,0.22)] sm:rounded-[15px] ${badgeClassName}`}
          >
            {icon}
          </div>
        </div>
        <span className="mt-0.5 max-w-[80px] break-words rounded-md bg-black/30 px-1.5 py-0.5 text-center text-[11px] leading-tight text-white backdrop-blur-sm sm:mt-1 sm:max-w-[86px] sm:text-sm">
          {label}
        </span>
      </div>
    </button>
  )

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-12 z-10 px-4 sm:inset-x-auto sm:right-4 sm:top-20 sm:w-[22rem] sm:px-0">
        <div className="ml-auto max-w-sm rounded-[28px] border border-white/45 bg-black/18 p-4 text-white shadow-[0_20px_50px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
            {portfolio.name}&apos;s Portfolio OS
          </p>
          <p className="mt-2 text-sm font-medium leading-6 text-white/92 sm:text-[15px]">
            The icons here open real apps and projects I built.
          </p>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-[39%] flex justify-center px-3 sm:hidden"
        data-mobile-dropzone="desktop"
      >
        <div className="grid grid-cols-5 gap-x-3 gap-y-4 rounded-3xl px-2 py-3">
          {mobileDesktopIcons.map((iconItem) => {
            const isDragged = mobileDraggedIconId === iconItem.id

            return (
              <button
                key={iconItem.id}
                className={`flex flex-col items-center transition-opacity ${isDragged ? 'opacity-40' : ''}`}
                onClick={() => onMobileIconClick(iconItem.id)}
                onPointerDown={(event) => onMobileIconPointerDown(iconItem.id, event)}
              >
                <div className="group flex flex-col items-center">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/55 bg-white/24 shadow-[0_10px_24px_rgba(15,23,42,0.18)] backdrop-blur-md transition duration-200 group-hover:scale-[1.08] group-hover:bg-white/30 sm:h-14 sm:w-14 sm:rounded-2xl dark:border-white/14 dark:bg-black/22 dark:group-hover:bg-black/28"
                  >
                    <div
                      className={`flex h-[72%] w-[72%] items-center justify-center rounded-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_14px_rgba(15,23,42,0.22)] sm:rounded-[15px] ${iconItem.badgeClassName}`}
                    >
                      {iconItem.icon}
                    </div>
                  </div>
                  <span className="mt-0.5 max-w-[80px] break-words rounded-md bg-black/30 px-1.5 py-0.5 text-center text-[11px] leading-tight text-white backdrop-blur-sm sm:mt-1 sm:max-w-[86px] sm:text-sm">
                    {iconItem.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="absolute left-2 top-8 hidden gap-2 p-2 sm:left-4 sm:flex sm:gap-8 sm:p-4">
        {desktopColumns.map((column, index) => (
          <div key={index} className="flex flex-col gap-2 sm:gap-4">
            {column.map(renderIcon)}
          </div>
        ))}
      </div>
    </>
  )
}
