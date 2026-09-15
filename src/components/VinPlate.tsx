import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface VinPlateProps {
  vin: string;
  plate?: string;
  plateState?: string;
}

export const VinPlate: React.FC<VinPlateProps> = ({ vin }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(vin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 my-3">
      {/* Stamped Metallic VIN Tag */}
      <div className="stamped-vin-plate inline-flex items-center max-w-full px-2.5 sm:px-4 py-2 rounded-lg text-sm font-mono tracking-wide sm:tracking-widest text-[#17211D] font-bold border border-[#C8CEB8] transition-all shadow-sm overflow-x-auto">
        {/* Metal rivet screw left */}
        <div className="w-2 h-2 rounded-full bg-[#B5BCB0] border border-[#8A968F] shadow-inner mr-2 sm:mr-2.5 shrink-0" title="Factory Rivet"></div>

        <span className="text-[#4B5A54] mr-1.5 sm:mr-2 text-sm font-sans uppercase font-bold tracking-wider select-none bg-[#D2D8CF]/60 px-1.5 py-0.5 rounded shrink-0">
          VIN
        </span>

        <span className="select-all font-mono font-bold tracking-[0.05em] sm:tracking-[0.12em] text-[#17211D] whitespace-nowrap">
          {vin}
        </span>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy VIN"
          title="Copy VIN to clipboard"
          className="ml-2 sm:ml-4 p-1.5 sm:px-2 sm:py-1 rounded-md bg-[#FFFFFF]/70 hover:bg-[#FFFFFF] text-[#013479] border border-[#C8CEB8] transition-all cursor-pointer flex items-center gap-1.5 text-sm font-sans font-semibold shadow-2xs hover:shadow-xs active:opacity-90 shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#013479]" />
              <span className="hidden sm:inline text-[#013479] font-sans text-sm font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#013479]" />
              <span className="hidden sm:inline text-sm font-sans text-[#013479]">Copy</span>
            </>
          )}
        </button>

        {/* Metal rivet screw right */}
        <div className="w-2 h-2 rounded-full bg-[#B5BCB0] border border-[#8A968F] shadow-inner ml-2 sm:ml-2.5 shrink-0" title="Factory Rivet"></div>
      </div>
    </div>
  );
};

