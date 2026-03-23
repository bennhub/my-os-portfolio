import Window from './Window'
import { portfolio } from "../data/portfolio";

interface ResumeWindowProps {
  onClose: () => void;
  onPositionChange?: (windowId: string, position: { bottom: number; width: number; height: number }) => void;
}

export default function ResumeWindow({ onClose, onPositionChange }: ResumeWindowProps) {
  return (
    <Window id="resume" title="Resume" onClose={onClose} onPositionChange={onPositionChange}>
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{portfolio.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">{portfolio.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {portfolio.location} • <a href={portfolio.linkedInUrl} target="_blank" rel="noreferrer" className="underline">LinkedIn</a> • <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="underline">GitHub</a>
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Summary</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {portfolio.experienceOverview}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Experience</h3>
          <div className="space-y-4">
            {portfolio.experiences.map((experience) => (
              <div key={`${experience.company}-${experience.period}`}>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {experience.role} — {experience.company}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {experience.period} | {experience.location}
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Links</h3>
          <div className="space-y-2 text-sm">
            <a
              href={portfolio.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-gray-700 dark:text-gray-300 underline"
            >
              Portfolio
            </a>
            <a
              href={portfolio.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-gray-700 dark:text-gray-300 underline"
            >
              GitHub
            </a>
            <a
              href={portfolio.linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-gray-700 dark:text-gray-300 underline"
            >
              LinkedIn
            </a>
            <a
              href={portfolio.consultingUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-gray-700 dark:text-gray-300 underline"
            >
              CraftQA
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {portfolio.skillGroups.flatMap((group) => group.items).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-200 dark:bg-gray-800 px-3 py-1 text-xs text-gray-700 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Window>
  )
}
