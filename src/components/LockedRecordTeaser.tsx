import React from 'react';
import { Lock } from 'lucide-react';

interface LockedRecordRowProps {
  label: string;
  sublabel?: string;
  blurredValue?: string;
  recordCountText?: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export const LockedRecordRow: React.FC<LockedRecordRowProps> = ({
  label,
  sublabel,
  blurredValue = 'CONFIDENTIAL RECORD DATA',
  recordCountText = 'Unlock',
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex items-center justify-between p-3 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] hover:border-[#013479]/40 hover:bg-[#F3F6FA] transition-all cursor-pointer overflow-hidden shadow-2xs gap-3"
    >
      {/* Left Column: Icon + Label + Sublabel */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-lg bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0 border border-[#024EB6]/15 group-hover:scale-105 transition-transform">
          <Icon className="w-4 h-4 text-[#013479]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-[#17211D] truncate leading-tight">
            {label}
          </div>
          {sublabel && (
            <div className="text-sm text-[#4B5A54] font-medium truncate mt-0.5 leading-tight">
              {sublabel}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Unlock Badge */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Unlock Lock Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAFAF7] group-hover:bg-[#E6E9E4] text-[#17211D] border border-[#E6E9E4] text-sm font-semibold shrink-0 shadow-2xs transition-all">
          <Lock className="w-3.5 h-3.5 text-[#4B5A54] shrink-0" />
          <span>{recordCountText}</span>
        </div>
      </div>
    </div>
  );
};
