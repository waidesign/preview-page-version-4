import React from 'react';
import { Bookmark, ArrowRight, X } from 'lucide-react';

interface ReturningUserBannerProps {
  onOpenSignup: () => void;
  onDismiss?: () => void;
}

export const ReturningUserBanner: React.FC<ReturningUserBannerProps> = ({ onOpenSignup, onDismiss }) => {
  return (
    <div className="w-full bg-[#E3ECF9] border-b border-[#024EB6]/20 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-sm text-[#013479]">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-[#013479] text-[#FFFFFF]">
            <Bookmark className="w-3.5 h-3.5 text-[#F9AD24]" />
          </div>
          <span className="font-medium">
            <strong className="font-semibold">Welcome back!</strong> You&apos;ve looked up <span className="font-mono font-semibold">3 vehicles</span> recently. Create a free account to park them all in one garage.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSignup}
            className="inline-flex items-center gap-1 text-sm font-semibold bg-[#013479] hover:bg-[#024EB6] text-[#FFFFFF] px-3 py-1 rounded-md transition-colors cursor-pointer"
          >
            <span>Save All to My Garage</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-[#024EB6] hover:text-[#013479] p-1 cursor-pointer"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
