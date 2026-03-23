import React from 'react';
import Image from 'next/image';
import { Github, ExternalLink, Play, Image as ImageIcon } from 'lucide-react';
import { portfolio } from "../data/portfolio";

interface Project {
  title: string;
  description: string;
  deployedUrl: string;
  githubUrl?: string;
  youtubeUrl?: string;
  imageUrl?: string;
  technologies: string[];
}

const Projects: React.FC = () => {
  const renderProjects = (projects: Project[]) =>
    projects.map((project, index) => (
      <div
        key={index}
        className="bg-white/90 dark:bg-gray-800/90 rounded-2xl border border-gray-200 dark:border-gray-700 
          shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm
          w-full max-w-none"
      >
        <div className="flex flex-col xl:flex-row h-full">
          {/* Left side - Demo/Preview */}
          <div className="xl:w-1/2 w-full relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800">
            <div className="aspect-video relative overflow-hidden">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-600 dark:to-gray-700">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              
              {/* Clickable overlay for video */}
              {project.youtubeUrl && (
                <a
                  href={project.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/10 hover:bg-black/30 flex items-center justify-center transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </a>
              )}
            </div>
            
            {/* Technology badges */}
            <div className="p-3 sm:p-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full
                      whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Project details */}
          <div className="xl:w-1/2 w-full p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                {project.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl 
                    animate-shimmer border border-slate-800 
                    bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]
                    text-slate-400 transition-all duration-300 flex-1 group
                    hover:shadow-lg hover:shadow-slate-500/25 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform group-hover:scale-110" />
                  <span className="text-xs sm:text-sm">Live Demo</span>
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl 
                      animate-shimmer border border-slate-800 
                      bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]
                      text-slate-400 transition-all duration-300 flex-1 group
                      hover:shadow-lg hover:shadow-slate-500/25 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform group-hover:scale-110" />
                    <span className="text-xs sm:text-sm">Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-white">
          Featured Projects
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
          QA work, creative audio tools, and personal web projects from {portfolio.name}.
        </p>
      </div>

      {/* Main Projects Grid */}
      <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
        {renderProjects(portfolio.projects)}
      </div>
    </div>
  );
};

export default Projects;
