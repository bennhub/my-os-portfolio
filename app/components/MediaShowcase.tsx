import { ExternalLink, Film, Music4, Radio } from "lucide-react";
import { portfolio } from "../data/portfolio";

export default function MediaShowcase() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Media Showcase</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          A focused window for music, videos, and audio app work instead of a novelty game.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-4">
            <Music4 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Latest Release
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {portfolio.music.latestRelease.title} by {portfolio.music.latestRelease.artist}
              </p>
            </div>
          </div>

          <div className="aspect-[16/11] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-black">
            <iframe
              src="https://bandcamp.com/EmbeddedPlayer/album=1711418830/size=large/bgcol=333333/linkcol=0f91ff/artwork=small/transparent=true/"
              title="Bandcamp player"
              className="w-full h-full"
            />
          </div>

          <a
            href={portfolio.bandcampUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm text-slate-100 transition hover:bg-slate-800"
          >
            <ExternalLink className="w-4 h-4" />
            Open Bandcamp
          </a>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Music Videos</h3>
          </div>
          <div className="space-y-3">
            {portfolio.music.videos.map((video) => (
              <a
                key={video.title}
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-950/30 p-4 transition hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-950/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{video.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{video.artist}</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{video.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 shrink-0 text-gray-500 dark:text-gray-400" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-4">
          <Radio className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Audio Apps</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolio.music.apps.map((app) => (
            <a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-950/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{app.title}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{app.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 text-gray-500 dark:text-gray-400" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
