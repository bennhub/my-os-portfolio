import React from "react";
import { portfolio } from "../data/portfolio";

const WorkExperience: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          QA Life
        </h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {portfolio.experienceOverview}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {portfolio.workValues.map((value) => (
            <div
              key={value}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-950/30 p-4 text-sm text-gray-700 dark:text-gray-300"
            >
              {value}
            </div>
          ))}
        </div>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          {portfolio.experiences.map((experience) => (
            <div
              key={`${experience.company}-${experience.period}`}
              className="border-l-4 border-gray-300 dark:border-gray-600 pl-4"
            >
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                {experience.role} — {experience.company}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {experience.period} | {experience.location}
              </p>
              {experience.highlights && (
                <div className="mt-2 space-y-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {experience.highlights.map((highlight) => (
                    <p key={highlight}>{highlight}</p>
                  ))}
                </div>
              )}
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                {experience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
