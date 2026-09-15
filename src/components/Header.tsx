import React, { useState } from 'react';
import { Image as ImageIcon, Menu, X, ChevronDown, Info } from 'lucide-react';
import { VinSearchBar } from './VinSearchBar';

interface PreviewSampleOption {
  id: string;
  label: string;
}

interface HeaderProps {
  onSearch: (query: string, searchType: 'vin' | 'plate', state?: string) => void;
  onLogoClick?: () => void;
  onOpenSignup: () => void;
  onOpenLogin: () => void;
  isLoading?: boolean;
  previewSamples?: PreviewSampleOption[];
  activePreviewSampleId?: string;
  onSelectPreviewSample?: (id: string) => void;
}

// This preview page has no logged-in state of its own — signed-in users are handled
// entirely by the separate Garage/member dashboard app it will eventually link out to.
export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onLogoClick,
  onOpenSignup,
  onOpenLogin,
  isLoading,
  previewSamples,
  activePreviewSampleId,
  onSelectPreviewSample,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E6E9E4] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo Placeholder */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLogoClick?.();
            }}
            className="flex items-center text-[#17211D] group"
          >
            <div className="h-9 px-3 rounded-xl bg-[#FAFAF7] border-2 border-dashed border-[#8A968F]/70 flex items-center justify-center gap-2 group-hover:border-[#013479] group-hover:bg-[#E3ECF9]/40 transition-all shadow-2xs">
              <ImageIcon className="w-4 h-4 text-[#4B5A54] group-hover:text-[#013479] shrink-0" />
              <span className="text-sm font-mono font-bold text-[#4B5A54] tracking-wider group-hover:text-[#013479] uppercase">
                Logo Placeholder
              </span>
            </div>
          </a>
        </div>

        {/* Center: Search Bar on Desktop */}
        <div className="hidden lg:flex items-center justify-center flex-1 max-w-lg">
          <VinSearchBar onSearch={onSearch} isLoading={isLoading} />
        </div>

        {/* Actions — desktop/tablet only, collapsed into the hamburger menu on mobile */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Preview sample switcher — lets reviewers flip between preview page versions */}
          {previewSamples && previewSamples.length > 1 && onSelectPreviewSample && (
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="relative">
                <select
                  value={activePreviewSampleId}
                  onChange={(e) => onSelectPreviewSample(e.target.value)}
                  className="appearance-none bg-[#FAFAF7] border border-[#E6E9E4] text-[#4B5A54] text-sm font-medium rounded-lg pl-3 pr-8 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#013479]"
                >
                  {previewSamples.map((sample) => (
                    <option key={sample.id} value={sample.id}>
                      {sample.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4B5A54]" />
              </div>
              <span className="relative inline-flex shrink-0 cursor-help group">
                <Info className="w-4 h-4 text-[#8A968F]" />
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg bg-[#17211D] text-white text-sm leading-snug px-2.5 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50 pointer-events-none text-center">
                  This is a sample selector for reviewing multiple preview versions — it will not be part of the actual design.
                </span>
              </span>
            </div>
          )}

          {/* Log in quiet text link */}
          <button
            onClick={onOpenLogin}
            className="text-sm font-semibold text-[#4B5A54] hover:text-[#013479] px-2 py-1 transition-colors cursor-pointer"
          >
            Log in
          </button>

          {/* Sign up free button */}
          <button
            onClick={onOpenSignup}
            className="text-sm font-bold text-[#FFFFFF] bg-[#013479] hover:bg-[#024EB6] border border-[#013479] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs active:opacity-90"
          >
            Sign up free
          </button>
        </div>

        {/* Hamburger menu toggle — mobile only */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7] hover:bg-[#FFFFFF] text-[#17211D] transition-all cursor-pointer shadow-2xs active:opacity-90 shrink-0"
          aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
          aria-expanded={showMobileMenu}
        >
          {showMobileMenu ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {showMobileMenu && (
        <>
          <div
            className="sm:hidden fixed inset-0 top-16 bg-[#17211D]/20 z-30 animate-fade-in"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="sm:hidden absolute top-full left-0 right-0 bg-[#FFFFFF] border-b border-[#E6E9E4] shadow-elevated z-40 animate-slide-up">
            <div className="px-4 py-3 flex flex-col gap-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Preview sample switcher — lets reviewers flip between preview page versions */}
              {previewSamples && previewSamples.length > 1 && onSelectPreviewSample && (
                <div className="flex items-center gap-1 bg-[#FAFAF7] p-1 rounded-lg border border-[#E6E9E4] mb-1">
                  {previewSamples.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => {
                        onSelectPreviewSample(sample.id);
                        setShowMobileMenu(false);
                      }}
                      className={`flex-1 px-2.5 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                        activePreviewSampleId === sample.id
                          ? 'bg-[#FFFFFF] text-[#013479] shadow-sm font-bold border border-[#E6E9E4]'
                          : 'text-[#4B5A54] hover:text-[#17211D]'
                      }`}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                  onOpenSignup();
                  setShowMobileMenu(false);
                }}
                className="w-full text-sm font-bold text-[#FFFFFF] bg-[#013479] hover:bg-[#024EB6] border border-[#013479] px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs active:opacity-90"
              >
                Sign up free
              </button>
              <button
                onClick={() => {
                  onOpenLogin();
                  setShowMobileMenu(false);
                }}
                className="w-full text-sm font-semibold text-[#4B5A54] hover:text-[#17211D] px-4 py-2 rounded-xl border border-[#E6E9E4] transition-colors cursor-pointer"
              >
                Log in
              </button>
            </div>
          </div>
        </>
      )}
    </header>

    {/* Spacer — the header is now fixed (out of document flow), so this reserves its height to stop content from sliding underneath it */}
    <div className="h-16" aria-hidden="true" />

    {/* Mobile search bar secondary row — scrolls away with content instead of staying pinned, so the sticky header doesn't eat up mobile viewport height */}
    <div className="lg:hidden px-4 pb-3 pt-3 border-b border-[#E6E9E4] bg-[#FAFAF7]/50">
      <VinSearchBar onSearch={onSearch} isLoading={isLoading} />
    </div>
    </>
  );
};

