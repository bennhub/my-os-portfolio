import { Github } from "lucide-react";

interface AppEmbedProps {
  title: string;
  url: string;
  description: string;
  repoUrl?: string;
}

const normalizeAppUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (hostname === "craftqa.com") {
      return "https://bennhub.github.io/craftqa/";
    }

    return url;
  } catch {
    return url;
  }
};

export default function AppEmbed({ title, url, description, repoUrl }: AppEmbedProps) {
  const resolvedUrl = normalizeAppUrl(url);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 px-3 py-1.5">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
            {title} | <span className="font-normal text-gray-600 dark:text-gray-400">{description}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300 transition hover:border-slate-500 hover:text-slate-950 dark:hover:text-white"
            >
              <Github className="h-3.5 w-3.5" />
              Repo
            </a>
          ) : null}
          <a
            href={resolvedUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300 transition hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
          >
            Open
          </a>
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-950">
        <iframe src={resolvedUrl} title={title} className="w-full h-full border-0" />
      </div>
    </div>
  );
}
