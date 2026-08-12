'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Camera, Link2, MapPin, Music } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import SplashModal from './SplashModal';
import mePhoto from '@/public/me-splash-sticker.jpg';

type ModalKey = 'resume' | 'bio' | 'hobbies';

interface SplashPageProps {
  onEnter: () => void;
}

// ── Modal content components ──────────────────────────────────────

function ResumeContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">{portfolio.name}</h3>
        <p className="text-white/55 text-sm mt-0.5">
          QA Engineer · {portfolio.yearsExperience} years · {portfolio.location}
        </p>
      </div>

      <p className="text-sm text-white/70 leading-relaxed">{portfolio.experienceOverview}</p>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-1 top-1 bottom-1 w-px bg-gradient-to-b from-[#4FB8A6]/70 via-white/15 to-transparent" />

        <div className="space-y-7">
          {portfolio.experiences.map((exp) => (
            <div key={`${exp.company}-${exp.period}`} className="relative pl-7">
              {/* Timeline dot */}
              <span className="absolute left-0 top-1 w-2 h-2 rounded-full bg-[#4FB8A6] ring-4 ring-[#4FB8A6]/20" />

              <p className="text-[10px] font-semibold text-[#4FB8A6] uppercase tracking-widest">
                {exp.period}
              </p>
              <p className="font-semibold text-white text-sm mt-1">
                {exp.role} — {exp.company}
              </p>
              <p className="text-xs text-white/45 mt-0.5">{exp.location}</p>
              <ul className="mt-2 space-y-1">
                {exp.bullets.map((b) => (
                  <li key={b} className="text-sm text-white/65 list-disc ml-4">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] text-white/35 uppercase tracking-widest mb-3">Skills</p>
        <div className="flex flex-wrap gap-2">
          {portfolio.skillGroups.flatMap((g) => g.items).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/65"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BioContent() {
  return (
    <div className="space-y-5">
      {/* Thumbnail photo beside name */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#4FB8A6]">
          <Image
            src={mePhoto}
            alt="Ben Neilson"
            fill
            className="object-cover object-top"
          />
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{portfolio.name}</p>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5">QA Engineer · Musician</p>
        </div>
      </div>

      <blockquote className="text-base sm:text-lg font-medium text-white leading-snug border-l-2 border-[#4FB8A6] pl-4 italic">
        &ldquo;{portfolio.heroBlurb}&rdquo;
      </blockquote>

      <div className="space-y-3">
        {portfolio.about.map((p) => (
          <p key={p} className="text-sm text-white/70 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {/* Links — placeholders for now */}
      <div className="space-y-2 pt-3 border-t border-white/10">
        {/* TODO: add real links, then remove `hidden` */}
        <a
          href="#"
          className="hidden items-center gap-2 text-sm text-white/70 hover:text-[#4FB8A6] transition-colors duration-150"
        >
          <Link2 className="w-3.5 h-3.5 text-[#4FB8A6] flex-shrink-0" />
          yourlink.com (placeholder)
        </a>
        <a
          href="#"
          className="hidden items-center gap-2 text-sm text-white/70 hover:text-[#4FB8A6] transition-colors duration-150"
        >
          <Link2 className="w-3.5 h-3.5 text-[#4FB8A6] flex-shrink-0" />
          yourlink.com (placeholder)
        </a>
        <p className="flex items-center gap-2 text-sm text-white/70">
          <MapPin className="w-3.5 h-3.5 text-[#4FB8A6] flex-shrink-0" />
          {portfolio.hometown} → {portfolio.location}
        </p>
      </div>

      <div className="bg-white/[0.07] rounded-xl p-4 border border-white/10">
        <p className="text-[10px] text-white/35 uppercase tracking-widest mb-2">Fun Fact</p>
        <p className="text-sm text-white/75">{portfolio.funFact}</p>
      </div>

      {portfolio.splashBioVideoUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10">
          <iframe
            src={portfolio.splashBioVideoUrl}
            title="Ben's video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

function HobbiesContent() {
  return (
    <div className="space-y-5">
      {/* Photography */}
      <div className="rounded-xl border border-[#4FB8A6]/40 bg-white/[0.04] p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#4FB8A6]" />
          <h3 className="text-white font-semibold">Photography</h3>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">
          Five years behind a DSLR, mostly landscapes, nature, and travel shots. A lot of it
          comes from time spent on my piece of land on the Gulf Islands and hiking around BC.
        </p>
        <a
          href={portfolio.flickrUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4FB8A6] text-[#4FB8A6] text-sm font-medium hover:bg-[#4FB8A6]/10 hover:scale-105 transition-all duration-200"
        >
          View on Flickr →
        </a>
      </div>

      {/* Music */}
      <div className="rounded-xl border border-[#4FB8A6]/40 bg-white/[0.04] p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-[#4FB8A6]" />
          <h3 className="text-white font-semibold">Music</h3>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">
          Self-taught guitarist since age 10, studied at Columbia Academy. These days I produce
          beats and build audio apps that merge my technical and creative sides, under the alias
          B.Hayes.
        </p>
        <a
          href={portfolio.bandcampUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4FB8A6] text-[#4FB8A6] text-sm font-medium hover:bg-[#4FB8A6]/10 hover:scale-105 transition-all duration-200"
        >
          Open Bandcamp →
        </a>
      </div>

      {/* Hobbies chips */}
      <div>
        <p className="text-[10px] text-[#4FB8A6] uppercase tracking-widest mb-3">Also into</p>
        <div className="flex flex-wrap gap-2">
          {portfolio.hobbies.map((h) => (
            <span
              key={h}
              className="px-3 py-1 rounded-full bg-white/5 border border-[#4FB8A6]/50 text-xs text-white/80"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main splash component ─────────────────────────────────────────

const modalTitles: Record<ModalKey, string> = {
  resume: 'Work Experience',
  bio: 'About Me',
  hobbies: 'Some Hobbies & Interests of Mine',
};

const modalButtons: { key: ModalKey; label: string }[] = [
  { key: 'resume', label: 'Work Experience' },
  { key: 'bio', label: 'About Me' },
  { key: 'hobbies', label: 'Hobbies' },
];

const socialLinks = [
  { href: portfolio.githubUrl, icon: <Github className="w-5 h-5" />, label: 'GitHub' },
  { href: portfolio.linkedInUrl, icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
  { href: portfolio.flickrUrl, icon: <Camera className="w-5 h-5" />, label: 'Flickr' },
];

export default function SplashPage({ onEnter }: SplashPageProps) {
  const [leaving, setLeaving] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onEnter, 550);
  };

  return (
    <div
      className={`fixed inset-0 z-[250] overflow-y-auto transition-opacity duration-500 ease-in-out ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #111827 0%, #060709 100%)' }}
    >
      <div className="flex flex-col items-center justify-center min-h-full px-4 sm:px-6 py-4 sm:py-6 gap-2.5 sm:gap-3">

        {/* Title + subtitle */}
        <div className="text-center flex-shrink-0">
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-none">
            Hi, I&apos;m Ben
          </h1>
          <p className="mt-[5px] text-white text-sm sm:text-lg font-light tracking-wide">
            QA Engineer&nbsp;&nbsp;·&nbsp;&nbsp;Creative Coder&nbsp;&nbsp;·&nbsp;&nbsp;Musician
          </p>
        </div>

        {/* Modal trigger buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 flex-shrink-0">
          {modalButtons.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveModal(key)}
              className="px-4 py-1.5 rounded-lg bg-white/[0.07] backdrop-blur-md text-[#4FB8A6] text-xs sm:text-sm font-medium hover:bg-white/15 hover:scale-110 transition-all duration-200 text-center whitespace-nowrap"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Photo + interactive phone hotspot, with social links stretched to match its width */}
        <div className="flex flex-col gap-2 sm:gap-3 flex-shrink min-h-0">
          {/* Wrapper matches the photo's intrinsic 838x1117 ratio so % coords below line up with the phone in the image */}
          <div className="relative h-[36vh] sm:h-[46vh] aspect-[838/1117]">
            <Image
              src={mePhoto}
              alt="Ben Neilson holding up a phone showing his portfolio app"
              fill
              priority
              className="object-contain object-bottom border-b border-[#4FB8A6] drop-shadow-2xl select-none pointer-events-none"
            />

            {/* Interactive hotspot over the phone screen in the photo */}
            <button
              type="button"
              onClick={handleEnter}
              aria-label="Click the phone to see my projects"
              className="group absolute left-[25%] top-[45%] w-[21%] h-[33%] rounded-[22%] cursor-pointer"
            >
              <span className="absolute inset-0 rounded-[22%] ring-2 ring-[#FFE066]/80 animate-phone-pulse" />
              <span className="absolute inset-0 rounded-[22%] bg-white/0 group-hover:bg-white/15 group-active:bg-white/25 transition-colors duration-150" />
            </button>

            {/* Desktop: arrow to the left of the phone, pointing right at the hand/phone */}
            <div
              className="hidden sm:flex absolute items-center gap-3 pointer-events-none"
              style={{ left: '23%', top: '61%', transform: 'translate(-100%, -50%)' }}
            >
              <p className="text-white text-sm font-medium leading-snug text-right max-w-[140px] text-shadow">
                Click here to see projects
              </p>
              <div className="animate-bounce-x drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
                <svg width="52" height="22" viewBox="0 0 52 22" fill="none" aria-hidden="true">
                  <path
                    d="M4 11H50M50 11L38 4M50 11L38 18"
                    stroke="black"
                    strokeWidth="4.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 11H50M50 11L38 4M50 11L38 18"
                    stroke="#FFE066"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Mobile: arrow + text tucked inside the image bounds, just below the phone */}
            <div
              className="sm:hidden absolute flex flex-col items-center gap-0.5 pointer-events-none"
              style={{ left: '35.5%', top: '80%', transform: 'translateX(-50%)' }}
            >
              <div className="animate-bounce drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
                <svg width="16" height="22" viewBox="0 0 20 28" fill="none" aria-hidden="true">
                  <path
                    d="M10 2V26M10 2L4 10M10 2L16 10"
                    stroke="black"
                    strokeWidth="4.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 2V26M10 2L4 10M10 2L16 10"
                    stroke="#FFE066"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-white text-[10px] font-medium whitespace-nowrap text-shadow">
                Click here to see projects
              </p>
            </div>
          </div>

          {/* Social icon links — stretched to span the photo's exact width */}
          <div className="flex items-center justify-between flex-shrink-0">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-[#4FB8A6] hover:text-white transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Modals */}
      <SplashModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal ? modalTitles[activeModal] : ''}
      >
        {activeModal === 'resume' && <ResumeContent />}
        {activeModal === 'bio' && <BioContent />}
        {activeModal === 'hobbies' && <HobbiesContent />}
      </SplashModal>
    </div>
  );
}
