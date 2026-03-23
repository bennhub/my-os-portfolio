import { portfolio } from "../data/portfolio";

const ProfileCard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          {portfolio.name}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium px-4">
          {portfolio.title}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-300">
          <a
            className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href={portfolio.linkedInUrl}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href={portfolio.portfolioUrl}
            target="_blank"
            rel="noreferrer"
          >
            {portfolio.portfolioUrl.replace(/^https?:\/\//, "")}
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href={portfolio.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed max-w-4xl mx-auto px-4 text-sm sm:text-base">
          {portfolio.heroBlurb}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            About
          </h3>
          <div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            {portfolio.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Snapshot
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Hometown</p>
              <p>{portfolio.hometown}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Current Location</p>
              <p>{portfolio.location}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Fun Fact</p>
              <p>{portfolio.funFact}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Hobbies</p>
              <p>{portfolio.hobbies.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          Experience Overview
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          {portfolio.experienceOverview}
        </p>
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
            What I enjoy about SQA
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
            {portfolio.workValues.map((value) => (
              <li
                key={value}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-3"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          Technical Expertise
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
          {portfolio.skillGroups.map((group) => (
            <div
              key={group.title}
              className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 rounded-lg"
            >
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {group.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
