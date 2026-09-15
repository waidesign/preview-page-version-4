import React, { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import { FaqItem } from '../types';

interface FaqSectionProps {
  faqItems: FaqItem[];
  onOpenSampleReport: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqItems, onOpenSampleReport }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="w-full py-12 md:py-16 border-t border-[#E6E9E4]">
      
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D]">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#FFFFFF] rounded-xl border border-[#E6E9E4] overflow-hidden transition-all shadow-resting"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAFAF7]/60 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-heading font-semibold text-base text-[#17211D]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#8A968F] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#013479]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-[#4B5A54] leading-relaxed border-t border-[#E6E9E4]/60 bg-[#FAFAF7]/30">
                  <p>{item.answer}</p>
                  
                  {/* Quiet sample report link on questions regarding history report */}
                  {(item.question.toLowerCase().includes('history report') || item.question.toLowerCase().includes('sample')) && (
                    <div className="mt-3 pt-3 border-t border-[#E6E9E4]">
                      <button
                        onClick={onOpenSampleReport}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#013479] hover:underline cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#013479]" />
                        <span>See a sample history report →</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
