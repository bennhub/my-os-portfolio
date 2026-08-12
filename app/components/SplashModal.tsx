'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface SplashModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function SplashModal({ isOpen, onClose, title, children }: SplashModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[260] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[24px] border-2 border-[#4FB8A6] bg-black shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-base sm:text-lg">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors duration-150 p-1 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto max-h-[75vh] px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}
