import React, { useState, useEffect } from 'react';
import { PRICING } from '../lib/mock-data';

interface StickyMobileCtaProps {
  onSelectOption: (optionType: 'report' | 'sticker' | 'bundle') => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({
  onSelectOption,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E6E9E4] p-3 shadow-elevated animate-slide-up"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={() => onSelectOption('report')}
          className="flex-1 bg-[#013479] hover:bg-[#024EB6] text-white font-bold text-sm px-3 py-2.5 rounded-xl border border-[#013479] shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1 active:opacity-90"
        >
          <span>Get Report — {PRICING.HISTORY_REPORT.price}</span>
        </button>

        <button
          onClick={() => onSelectOption('bundle')}
          className="flex-1 sm:flex-none bg-[#FFD700] hover:bg-[#ECC100] text-[#17211D] font-bold text-sm px-3 py-2.5 rounded-xl border border-[#FFD700] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0 active:opacity-90"
        >
          <span>Bundle — {PRICING.BUNDLE.price}</span>
        </button>
      </div>
    </div>
  );
};
