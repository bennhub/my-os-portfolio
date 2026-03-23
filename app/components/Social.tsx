import {
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  ExternalLink,
  Camera,
} from "lucide-react";
import { portfolio } from "../data/portfolio";

const socialLinks = [
  {
    icon: <Github className="w-6 h-6" />,
    label: "GitHub",
    url: portfolio.githubUrl,
    color: "hover:text-gray-800 dark:hover:text-gray-200",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    label: "LinkedIn",
    url: portfolio.linkedInUrl,
    color: "hover:text-gray-800 dark:hover:text-gray-200",
  },
  {
    icon: <Camera className="w-6 h-6" />,
    label: "Flickr",
    url: portfolio.flickrUrl,
    color: "hover:text-gray-800 dark:hover:text-gray-200",
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    label: "Instagram",
    url: portfolio.instagramUrl,
    color: "hover:text-gray-800 dark:hover:text-gray-200",
  },
  {
    icon: <ExternalLink className="w-6 h-6" />,
    label: "Portfolio",
    url: portfolio.portfolioUrl,
    color: "hover:text-gray-800 dark:hover:text-gray-200",
  },
  {
    icon: <ExternalLink className="w-6 h-6" />,
    label: "CraftQA",
    url: portfolio.consultingUrl,
    color: "hover:text-gray-800 dark:hover:text-gray-200",
  },
];

const ConnectWithMe = () => {
  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          Let&apos;s Connect
        </h1>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="grid gap-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url.startsWith('http') || link.url.startsWith('mailto:') ? link.url : `https://${link.url}`}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className={`flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600 w-full min-w-0 overflow-hidden
                transition-all duration-300 hover:shadow-md ${link.color}
                bg-white dark:bg-gray-800 group hover:border-gray-300 dark:hover:border-gray-500`}
            >
              <div className="shrink-0 p-2 sm:p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 group-hover:scale-110 transition-transform border border-gray-200 dark:border-gray-600">
                {link.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {link.label}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-all sm:break-words">
                  {link.url}
                </p>
              </div>
              <ArrowRight className="hidden sm:block w-5 h-5 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 dark:text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectWithMe;
