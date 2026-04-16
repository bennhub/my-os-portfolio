import React from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { desktopAppIcons } from "../data/iconRegistry";
import { portfolio } from "../data/portfolio";

interface Project {
  title: string;
  description: string;
  deployedUrl: string;
  githubUrl?: string;
  technologies: string[];
}

interface DesktopAppListing {
  id: string;
  title: string;
  description: string;
  href?: string;
  actionLabel: string;
}

interface ProjectsProps {
  openWindow: (id: string) => void;
}

const desktopAppListings: DesktopAppListing[] = [
  {
    id: "vscode",
    title: "Code Practice",
    description: "An in-browser coding workspace for JavaScript exercises and learning flows.",
    actionLabel: "Open Window",
  },
  {
    id: "browser",
    title: "Agent",
    description: "A browser-style app surface for AI-assisted workflows and experiments.",
    actionLabel: "Open Window",
  },
  {
    id: "automation",
    title: "Automation Projects",
    description: "Hands-on QA automation demos, command surfaces, and testing workflows.",
    actionLabel: "Open Window",
  },
  {
    id: "media",
    title: "Media Showcase",
    description: "A focused hub for music, video, and audio-driven creative work.",
    actionLabel: "Open Window",
  },
  {
    id: "app-groove-slider",
    title: "Groove Slider",
    description: "A slideshow PWA that syncs visuals with music and motion.",
    href: "https://hayzer.app/",
    actionLabel: "Launch App",
  },
  {
    id: "app-indigenous-directory",
    title: "Indigenous Directory",
    description: "A searchable directory for Indigenous business listings across Canada.",
    href: "https://bennhub.github.io/indigenousbusinessdirectory/",
    actionLabel: "Launch App",
  },
  {
    id: "chopblock",
    title: "ChopBlock",
    description: "An audio chopping and beat-making tool with a tactile music workflow.",
    href: "https://chopblock.hayzer.app/",
    actionLabel: "Launch App",
  },
  {
    id: "app-rec-fx",
    title: "Rec FX",
    description: "A browser recorder with live effects, exports, and shareable recordings.",
    href: "https://bennhub.github.io/RecFX/",
    actionLabel: "Launch App",
  },
  {
    id: "app-audioblaster",
    title: "Beat Block Player",
    description: "A retro-styled audio player with playlists, sharing, and bold UI.",
    href: "https://bennhub.github.io/block-beat-audio-player/",
    actionLabel: "Launch App",
  },
  {
    id: "app-audio-paint",
    title: "Beat Brush",
    description: "Interactive painting mixed with sound synthesis and audio-reactive visuals.",
    href: "https://beatbrush.hayzer.app/",
    actionLabel: "Launch App",
  },
  {
    id: "app-jazz-guitar",
    title: "Jazz Guitar",
    description: "An interactive learning tool for chord progressions and guitar practice.",
    href: "https://bennhub.github.io/jazz-guitar-progression-app/",
    actionLabel: "Launch App",
  },
];

const truncateDescription = (description: string) =>
  description.length > 120 ? `${description.slice(0, 117)}...` : description;

const Projects: React.FC<ProjectsProps> = ({ openWindow }) => {
  const appCards = desktopAppIcons
    .map((iconItem) => {
      const listing = desktopAppListings.find((item) => item.id === iconItem.id);
      if (!listing) return null;

      return (
        <article
          key={iconItem.id}
          className="min-w-[220px] max-w-[240px] rounded-[26px] border border-slate-200/80 bg-white/82 p-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.14)] dark:border-slate-700/70 dark:bg-slate-900/75"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-white/70 shadow-[0_10px_18px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950/70">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_6px_14px_rgba(15,23,42,0.18)] ${iconItem.badgeClassName}`}
              >
                {iconItem.icon}
              </div>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              Desktop
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              {listing.title}
            </h2>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              {truncateDescription(listing.description)}
            </p>
          </div>

          <div className="mt-5">
            {listing.href ? (
              <a
                href={listing.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                {listing.actionLabel}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => openWindow(listing.id)}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                {listing.actionLabel}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </article>
      );
    })
    .filter(Boolean);

  const projectCards = portfolio.projects.map((project: Project) => (
    <article
      key={project.title}
      className="flex h-full flex-col rounded-[26px] border border-slate-200/80 bg-white/82 p-5 shadow-[0_12px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.14)] dark:border-slate-700/70 dark:bg-slate-900/75"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {project.title}
          </h2>
          <p className="mt-2 min-h-[4.5rem] text-sm leading-6 text-slate-600 dark:text-slate-300">
            {truncateDescription(project.description)}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
          Project
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5 flex flex-wrap gap-2">
        <a
          href={project.deployedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          <ExternalLink className="h-4 w-4" />
          View App
        </a>
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
        ) : null}
      </div>
    </article>
  ));

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
      <div className="mb-8 rounded-[30px] border border-white/70 bg-gradient-to-br from-white/88 via-slate-50/84 to-orange-50/88 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:from-slate-900/85 dark:via-slate-900/80 dark:to-slate-800/80">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300">
            Portfolio App Store
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            Browse the desktop apps and project builds in one place
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            This window works like the OS storefront: every desktop app is listed here in a compact format,
            and the featured projects below link directly to the live builds.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Desktop Apps
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Every app currently living on the desktop.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            {appCards.length} apps
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {appCards}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Compact summaries with direct links to each live project.
            </p>
          </div>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
            {portfolio.projects.length} projects
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projectCards}
        </div>
      </section>
    </div>
  );
};

export default Projects;
