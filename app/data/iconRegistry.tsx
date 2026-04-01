import {
  AudioLines,
  Briefcase,
  Bug,
  Code,
  File,
  Film,
  Globe,
  Mail,
  Radio,
  SlidersHorizontal,
  Terminal,
  User,
} from 'lucide-react'
import { ClipboardList } from 'lucide-react'
import type { ReactNode } from 'react'

export interface IconDefinition {
  id: string
  label: string
  icon: ReactNode
  badgeClassName: string
}

export const desktopPrimaryIcons: IconDefinition[] = [
  {
    id: 'about',
    label: 'About Me',
    icon: <User className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-sky-500 text-white'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <Briefcase className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-orange-500 text-white'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: <Mail className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-emerald-500 text-white'
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: <File className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-slate-700 text-white'
  },
  {
    id: 'work-experience',
    label: 'QA Life',
    icon: <ClipboardList className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-fuchsia-500 text-white'
  }
]

export const desktopAppIcons: IconDefinition[] = [
  {
    id: 'vscode',
    label: 'Code Practice',
    icon: <Code className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-blue-500 text-white'
  },
  {
    id: 'browser',
    label: 'Agent',
    icon: <Globe className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-cyan-500 text-white'
  },
  {
    id: 'automation',
    label: 'Automation Projects',
    icon: <Bug className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-lime-500 text-slate-950'
  },
  {
    id: 'media',
    label: 'Media Showcase',
    icon: <Film className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-rose-500 text-white'
  },
  {
    id: 'app-groove-slider',
    label: 'Hayzer Apps',
    icon: <SlidersHorizontal className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-amber-500 text-slate-950'
  },
  {
    id: 'chopblock',
    label: 'ChopBlock',
    icon: <AudioLines className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-purple-500 text-white'
  },
  {
    id: 'app-rec-fx',
    label: 'Rec FX',
    icon: <Radio className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-rose-500 text-white'
  },
  {
    id: 'app-audioblaster',
    label: 'Beat Block Player',
    icon: <AudioLines className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-cyan-500 text-white'
  },
  {
    id: 'app-audio-paint',
    label: 'Beat Brush',
    icon: <AudioLines className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-indigo-500 text-white'
  },
  {
    id: 'app-jazz-guitar',
    label: 'Jazz Guitar',
    icon: <Radio className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-emerald-600 text-white'
  }
]

export const dockIcons: IconDefinition[] = [
  {
    id: 'about',
    label: 'About',
    icon: <User className="h-6 w-6 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-sky-500 text-white'
  },
  {
    id: 'work-experience',
    label: 'QA Life',
    icon: <ClipboardList className="h-6 w-6 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-fuchsia-500 text-white'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <Briefcase className="h-6 w-6 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-orange-500 text-white'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: <Mail className="h-6 w-6 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-emerald-500 text-white'
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: <File className="h-6 w-6 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-slate-700 text-white'
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: <Terminal className="h-6 w-6 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-slate-800 text-white'
  }
]

export const desktopDockIcons = dockIcons.filter((icon) =>
  ['about', 'work-experience', 'projects', 'contact', 'resume', 'terminal'].includes(icon.id)
)

const combinedIcons = [...dockIcons, ...desktopAppIcons, ...desktopPrimaryIcons]

export const iconRegistry = combinedIcons.reduce<Record<string, IconDefinition>>((acc, icon) => {
  acc[icon.id] = icon
  return acc
}, {})

// Filter out keyboard-requiring apps for mobile
const mobileFilteredIcons = combinedIcons.filter(icon =>
  !['terminal', 'vscode'].includes(icon.id)
)

export const mobileIconOrder = mobileFilteredIcons.reduce<string[]>((acc, icon) => {
  if (!acc.includes(icon.id)) {
    acc.push(icon.id)
  }
  return acc
}, [])

export const mobileDockDefaultIds = dockIcons
  .filter(icon => !['terminal', 'vscode'].includes(icon.id))
  .slice(0, 6)
  .map((icon) => icon.id)
