"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play, X } from "lucide-react";

export default function AutomationLab() {
  const [showLauncherDemo, setShowLauncherDemo] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="h-full overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Automation Lab
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Ben&apos;s QA tools and workflow demos
            </h2>
            <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
              This window is for hands-on automation projects, command surfaces, and test tooling demos.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                    Featured
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Playwright Command Center
                  </h3>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    A command-driven QA launcher for running targeted Playwright suites, reviewing output, and surfacing artifacts.
                  </p>
                </div>
              </div>

              <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
                Built to make automation runs easier to demo, repeat, and inspect without dropping straight into the terminal.
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowLauncherDemo(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  <Play className="h-4 w-4" />
                  Open Launcher
                </button>
                <a
                  href="https://github.com/bennhub/playwright-command-center"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Repo
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-5 dark:border-slate-700 dark:bg-slate-900/50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Next Slot
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                More Automation Projects
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                This area is ready for additional test harnesses, experiment runners, reporting tools, or API automation demos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showLauncherDemo ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/70 p-3 sm:p-6 backdrop-blur-sm">
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#0b0f14] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-100">Playwright Command Center</p>
                <p className="text-xs text-slate-400">Launcher demo</p>
              </div>
              <button
                type="button"
                onClick={() => setShowLauncherDemo(false)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-[#0b0f14]">
              <Image
                src="/Projects/playwrite command center.gif"
                alt="Playwright Command Center demo"
                fill
                priority
                unoptimized
                className="object-contain object-center"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
