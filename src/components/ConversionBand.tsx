import React from 'react';
import { VehiclePreview } from '../types';

interface ConversionBandProps {
  vehicle: VehiclePreview;
  onOpenSignup: () => void;
  onSaveToGarage?: () => void;
}

export const ConversionBand: React.FC<ConversionBandProps> = ({
  vehicle,
  onOpenSignup,
  onSaveToGarage,
}) => {
  const handleSaveClick = onSaveToGarage || onOpenSignup;

  return (
    <section className="w-full bg-[#E3ECF9] border-y border-[#024EB6]/20 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#17211D] tracking-tight mb-3">
          Get Full Vehicle History for Your {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>

        <p className="text-sm sm:text-base text-[#4B5A54] max-w-2xl mx-auto mb-8 leading-relaxed">
          Unlock complete NMVTIS title records, total loss &amp; accident history, odometer readings, and auction records for your <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong> with instant PDF delivery.
        </p>

        {/* Primary Conversion Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenSignup}
            className="w-full sm:w-auto bg-[#013479] hover:bg-[#024EB6] text-white font-bold text-base px-8 py-3.5 rounded-xl border border-[#013479] shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2.5 group active:opacity-90"
          >
            <span>Get History Report — $19.99</span>
          </button>
          <button
            onClick={onOpenSignup}
            className="w-full sm:w-auto bg-[#FFD700] hover:bg-[#ECC100] text-[#17211D] font-bold text-base px-8 py-3.5 rounded-xl border border-[#FFD700] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 group active:opacity-90"
          >
            <span>Get Bundle — $29.98</span>
          </button>
        </div>

        <p className="text-sm text-[#4B5A54] font-medium font-mono mt-4">
          Instant PDF Download • Official NMVTIS Data • No Subscription Traps
        </p>

        {/* Save to Garage Alternative Card */}
        <div className="mt-10 pt-6 border-t border-[#024EB6]/15 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-white/70 backdrop-blur-xs rounded-2xl border border-white/90 shadow-2xs">
          <div className="text-center sm:text-left">
            <p className="text-sm sm:text-base font-bold text-[#17211D]">
              Not sure to get Full Report yet?
            </p>
            <p className="text-sm text-[#4B5A54] font-medium mt-0.5">
              Save this vehicle into Garage to keep track for free.
            </p>
          </div>
          <button
            onClick={handleSaveClick}
            className="w-full sm:w-auto bg-[#FAFAF7] hover:bg-[#E6E9E4] text-[#17211D] font-semibold text-sm px-5 py-2.5 rounded-xl border border-[#E6E9E4] shadow-2xs transition-all cursor-pointer shrink-0 text-center active:opacity-90"
          >
            Save to Garage (Free)
          </button>
        </div>

      </div>
    </section>
  );
};
