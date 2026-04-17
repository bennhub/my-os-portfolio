import {
  AudioLines,
  Bot,
  Briefcase,
  Building2,
  Bug,
  Code,
  File,
  Film,
  Globe,
  Mail,
  Mic,
  Radio,
  Terminal,
  User,
  Zap,
} from 'lucide-react'
import { ClipboardList } from 'lucide-react'
import type { ReactNode } from 'react'

export interface IconDefinition {
  id: string
  label: string
  icon: ReactNode
  badgeClassName: string
  category?: string
  desktopFeatured?: boolean
  storeTitle?: string
  storeDescription?: string
  externalUrl?: string
  actionLabel?: string
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
    badgeClassName: 'bg-blue-500 text-white',
    category: 'Builder & Automation',
    desktopFeatured: true,
    storeTitle: 'Code Practice',
    storeDescription: 'An in-browser coding workspace for JavaScript exercises and learning flows.',
    actionLabel: 'Open Window'
  },
  {
    id: 'browser',
    label: 'Agent',
    icon: <Globe className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-cyan-500 text-white',
    category: 'Builder & Automation',
    desktopFeatured: false,
    storeTitle: 'Agent',
    storeDescription: 'A browser-style app surface for AI-assisted workflows and experiments.',
    actionLabel: 'Open Window'
  },
  {
    id: 'automation',
    label: 'Automation Projects',
    icon: <Bug className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-lime-500 text-slate-950',
    category: 'Builder & Automation',
    desktopFeatured: true,
    storeTitle: 'Automation Projects',
    storeDescription: 'Hands-on QA automation demos, command surfaces, and testing workflows.',
    actionLabel: 'Open Window'
  },
  {
    id: 'app-ai-test-code-dojo',
    label: 'AI Test Code Dojo',
    icon: <Bot className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-violet-600 text-white',
    category: 'Builder & Automation',
    desktopFeatured: true,
    storeTitle: 'AI Test Code Dojo',
    storeDescription: 'An AI sandbox for testing code prompts, experiments, and dojo-style practice flows.',
    externalUrl: 'https://bennhub.github.io/ai-sandboxer/',
    actionLabel: 'Launch App'
  },
  {
    id: 'app-gab-lab-ai',
    label: 'Gab Lab AI',
    icon: <Mic className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-sky-600 text-white',
    category: 'Builder & Automation',
    desktopFeatured: true,
    storeTitle: 'Gab Lab AI',
    storeDescription: 'An AI speech support app built to help with guided speaking and communication practice.',
    externalUrl: 'https://bennhub.github.io/Gab-Lab-AI/',
    actionLabel: 'Launch App'
  },
  {
    id: 'media',
    label: 'Media Showcase',
    icon: <Film className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-rose-500 text-white',
    category: 'Creative & Media',
    desktopFeatured: false,
    storeTitle: 'Media Showcase',
    storeDescription: 'A focused hub for music, video, and audio-driven creative work.',
    actionLabel: 'Open Window'
  },
  {
    id: 'app-groove-slider',
    label: 'Hayzer Apps',
    icon: <Zap className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-amber-500 text-slate-950',
    category: 'Audio Projects',
    desktopFeatured: true,
    storeTitle: 'Hayzer Apps',
    storeDescription: 'A lightning-fast showcase hub for Hayzer audio and visual app experiments.',
    externalUrl: 'https://hayzer.app/',
    actionLabel: 'Launch App'
  },
  {
    id: 'app-indigenous-directory',
    label: 'Indigenous Directory',
    icon: <Building2 className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-teal-500 text-white',
    category: 'Web Projects',
    desktopFeatured: true,
    storeTitle: 'Indigenous Directory',
    storeDescription: 'A searchable directory for Indigenous business listings across Canada.',
    externalUrl: 'https://bennhub.github.io/indigenousbusinessdirectory/',
    actionLabel: 'Launch App'
  },
  {
    id: 'app-craftqa',
    label: 'CraftQA',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 sm:h-5 sm:w-5"
        aria-hidden="true"
      >
        <path d="M9 9.5C9 7.6 10.34 6 12 6s3 1.6 3 3.5" />
        <path d="M5 13.5c1.8-2.1 11.2-2.1 14 0" />
        <path d="M7 13.5 6 16" />
        <path d="M12 13.5v3" />
        <path d="m17 13.5 1 2.5" />
        <ellipse cx="12" cy="11.5" rx="7" ry="2.5" />
      </svg>
    ),
    badgeClassName: 'bg-slate-900 text-emerald-300',
    category: 'Web Projects',
    desktopFeatured: true,
    storeTitle: 'CraftQA',
    storeDescription: 'A QA-focused site showcasing CraftQA with a playful retro sci-fi tone.',
    externalUrl: 'https://bennhub.github.io/craftqa/',
    actionLabel: 'Launch App'
  },
  {
    id: 'chopblock',
    label: 'ChopBlock',
    icon: <AudioLines className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-purple-500 text-white',
    category: 'Audio Projects',
    desktopFeatured: true,
    storeTitle: 'ChopBlock',
    storeDescription: 'An audio chopping and beat-making tool with a tactile music workflow.',
    externalUrl: 'https://chopblock.hayzer.app/',
    actionLabel: 'Launch App'
  },
  {
    id: 'app-rec-fx',
    label: 'Rec FX',
    icon: <Radio className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-rose-500 text-white',
    category: 'Audio Projects',
    desktopFeatured: true,
    storeTitle: 'Rec FX',
    storeDescription: 'A browser recorder with live effects, exports, and shareable recordings.',
    externalUrl: 'https://bennhub.github.io/RecFX/',
    actionLabel: 'Launch App'
  },
  {
    id: 'app-audioblaster',
    label: 'Beat Block Player',
    icon: <AudioLines className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-cyan-500 text-white',
    category: 'Audio Projects',
    desktopFeatured: true,
    storeTitle: 'Beat Block Player',
    storeDescription: 'A retro-styled audio player with playlists, sharing, and bold UI.',
    externalUrl: 'https://bennhub.github.io/block-beat-audio-player/',
    actionLabel: 'Launch App'
  },
  {
    id: 'app-audio-paint',
    label: 'Beat Brush',
    icon: <AudioLines className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-indigo-500 text-white',
    category: 'Audio Projects',
    desktopFeatured: true,
    storeTitle: 'Beat Brush',
    storeDescription: 'Interactive painting mixed with sound synthesis and audio-reactive visuals.',
    externalUrl: 'https://beatbrush.hayzer.app/',
    actionLabel: 'Launch App'
  },
  {
    id: 'app-jazz-guitar',
    label: 'Jazz Guitar',
    icon: <Radio className="h-5 w-5 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-emerald-600 text-white',
    category: 'Audio Projects',
    desktopFeatured: false,
    storeTitle: 'Jazz Guitar',
    storeDescription: 'An interactive learning tool for chord progressions and guitar practice.',
    externalUrl: 'https://bennhub.github.io/jazz-guitar-progression-app/',
    actionLabel: 'Launch App'
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
    id: 'terminal',
    label: 'Terminal',
    icon: <Terminal className="h-6 w-6 sm:h-5 sm:w-5" />,
    badgeClassName: 'bg-slate-800 text-white'
  }
]

export const desktopDockIcons = dockIcons.filter((icon) =>
  ['about', 'work-experience', 'projects', 'contact', 'terminal'].includes(icon.id)
)

const combinedIcons = [...dockIcons, ...desktopAppIcons, ...desktopPrimaryIcons]

export const iconRegistry = combinedIcons.reduce<Record<string, IconDefinition>>((acc, icon) => {
  acc[icon.id] = icon
  return acc
}, {})

// Filter out keyboard-requiring apps for mobile
const mobileFilteredIcons = combinedIcons.filter(icon =>
  !['terminal', 'vscode', 'browser', 'app-craftqa', 'resume'].includes(icon.id)
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
