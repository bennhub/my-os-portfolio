'use client';

interface WelcomeOverlayProps {
  onClose: () => void;
}

export default function WelcomeOverlay({ onClose }: WelcomeOverlayProps) {
  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[28px] border border-white/30 bg-white/18 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur-2xl sm:p-8">
        <div className="space-y-4">
          <span className="inline-flex rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
            Portfolio Intro
          </span>
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Welcome to Ben Neilson&apos;s Portfolio OS
            </h1>
            <p className="text-sm leading-6 text-white/84 sm:text-base">
              This is my interactive portfolio. The desktop icons and apps here are real
              projects I&apos;ve designed and built, not placeholder shortcuts. Open them to
              explore my work.
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/68 sm:max-w-[16rem]">
              Start with About, Projects, or any app icon on the desktop.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:scale-[1.01] hover:bg-slate-100"
            >
              Enter Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
