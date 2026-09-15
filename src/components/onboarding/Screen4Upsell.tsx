import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  FileText,
  FileCheck2,
  Lock,
  ArrowRight,
  Sparkles,
  Check,
  TrendingUp,
} from 'lucide-react';
import { VehiclePreview } from '../../types';

interface Screen4UpsellProps {
  vehicle: VehiclePreview;
  hasWindowStickerAvailable: boolean;
  onUnlockReport: (selection: { includeSticker: boolean; price: number }) => void;
}

export const Screen4Upsell: React.FC<Screen4UpsellProps> = ({
  vehicle,
  hasWindowStickerAvailable = true,
  onUnlockReport,
}) => {
  const [includeSticker, setIncludeSticker] = useState<boolean>(false);

  const reportPrice = 19.99;
  const stickerAddonPrice = 9.99;
  const totalPrice = includeSticker ? reportPrice + stickerAddonPrice : reportPrice;

  // Single CTA handler
  const handlePrimaryClick = () => {
    onUnlockReport({
      includeSticker,
      price: Number(totalPrice.toFixed(2)),
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-center mb-6"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E3ECF9] text-[#013479] border border-[#013479]/20 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#013479]" />
          <span>Official Vehicle Records Ready</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D] tracking-tight">
          Unlock Full History & Valuation
        </h1>
        <p className="text-sm text-[#4B5A54] mt-1.5 max-w-md mx-auto">
          Instant PDF report delivery for {vehicle.year} {vehicle.make} {vehicle.model}
        </p>
      </motion.div>

      {/* Main Monetization Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="bg-[#FFFFFF] rounded-2xl border border-[#E6E9E4] p-5 sm:p-7 shadow-elevated mb-6 space-y-5"
      >
        {/* Item 1: Vehicle History Report */}
        <div className="p-4 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0 border border-[#013479]/15">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-[#17211D]">
                  Vehicle History Report
                </h3>
                <span className="text-xs font-mono font-semibold text-[#1E8E5A] bg-[#E3F2EC] px-2 py-0.5 rounded-md">
                  Ready
                </span>
              </div>
              <p className="text-xs text-[#4B5A54] mt-0.5">
                Title brands, salvage checks, accident records, odometer rollback audit, and past owners.
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-[#1E8E5A] font-semibold">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> NMVTIS Database
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Insurance Total Loss
                </span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E6E9E4]">
            <div className="text-lg font-heading font-extrabold text-[#17211D]">
              $19.99
            </div>
            <span className="text-xs text-[#8A968F]">One-time</span>
          </div>
        </div>

        {/* Item 2: Market Value Partial / Blurred Value Teaser */}
        <div className="p-4 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4]">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#024EB6]" />
              <h4 className="font-heading font-bold text-sm text-[#17211D]">
                Market Value Appraisal (Teaser)
              </h4>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#8A968F] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E6E9E4]">
              <Lock className="w-3 h-3 text-[#8A968F]" />
              Included with Report
            </span>
          </div>

          <p className="text-xs text-[#4B5A54] mb-3">
            Real-time private party and dealer trade-in valuations based on current auction comps.
          </p>

          {/* Blurred Tease Box */}
          <div className="relative overflow-hidden rounded-lg bg-[#FFFFFF] border border-[#E6E9E4] p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E3ECF9] flex items-center justify-center text-[#013479] shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#8A968F] block">
                  Estimated Private Party Range:
                </span>
                {/* Visual partial blurred tease */}
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-base font-bold text-[#17211D]">
                    ${vehicle.marketValueLow ? Math.floor(vehicle.marketValueLow / 1000) : '14'},
                  </span>
                  <span className="font-mono text-base font-bold text-[#17211D] blur-[5px] select-none bg-[#E6E9E4]/60 px-2 rounded">
                    {vehicle.marketValueLow ? String(vehicle.marketValueLow % 1000).padStart(3, '0') : '850'}
                  </span>
                  <span className="text-xs text-[#8A968F] font-bold">–</span>
                  <span className="font-mono text-base font-bold text-[#17211D]">
                    ${vehicle.marketValueHigh ? Math.floor(vehicle.marketValueHigh / 1000) : '18'},
                  </span>
                  <span className="font-mono text-base font-bold text-[#17211D] blur-[5px] select-none bg-[#E6E9E4]/60 px-2 rounded">
                    {vehicle.marketValueHigh ? String(vehicle.marketValueHigh % 1000).padStart(3, '0') : '420'}
                  </span>
                </div>
              </div>
            </div>

            <span className="text-xs font-heading font-semibold text-[#024EB6] hidden sm:inline-block">
              Full breakdown in report
            </span>
          </div>
        </div>

        {/* Item 3: Window Sticker Optional Add-on (if available) */}
        {hasWindowStickerAvailable && (
          <label
            htmlFor="sticker-checkbox"
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
              includeSticker
                ? 'border-[#013479] bg-[#E3ECF9]/30 shadow-resting'
                : 'border-[#E6E9E4] bg-[#FAFAF7] hover:border-[#8A968F]/60'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                id="sticker-checkbox"
                type="checkbox"
                checked={includeSticker}
                onChange={(e) => setIncludeSticker(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#013479] rounded border-[#8A968F] focus:ring-[#013479] cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-[#17211D]">
                    Add Original Factory Window Sticker (Monroney)
                  </span>
                  <span className="text-xs font-mono font-bold text-[#C97A12] bg-[#FEF6EB] border border-[#F9AD24]/30 px-1.5 py-0.5 rounded">
                    +${stickerAddonPrice}
                  </span>
                </div>
                <p className="text-xs text-[#4B5A54] mt-0.5">
                  Original MSRP, standard features list, optional packages, and original factory options.
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  includeSticker
                    ? 'bg-[#013479] text-white'
                    : 'bg-[#E6E9E4] text-[#4B5A54]'
                }`}
              >
                {includeSticker ? 'Added' : 'Add'}
              </span>
            </div>
          </label>
        )}

        {/* Total Summary */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E6E9E4]">
          <span className="text-sm font-heading font-bold text-[#4B5A54]">
            Total Due Today:
          </span>
          <span className="text-2xl font-heading font-extrabold text-[#17211D]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </motion.div>

      {/* Single Primary Action: Unlock Report (No competing action, no Garage messaging) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.16 }}
        className="flex flex-col items-center"
      >
        <button
          type="button"
          onClick={handlePrimaryClick}
          className="w-full bg-[#013479] hover:bg-[#024EB6] text-white font-heading font-bold text-base py-4 px-8 rounded-xl shadow-brand-glow hover:shadow-elevated transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>
            Unlock {includeSticker ? 'Report & Window Sticker' : 'Vehicle Report'} — ${totalPrice.toFixed(2)}
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#8A968F]">
          <span>Instant Download</span>
          <span>•</span>
          <span>100% Money-Back Guarantee</span>
          <span>•</span>
          <span>Secure 256-Bit Encryption</span>
        </div>
      </motion.div>
      </div>
    </div>
  );
};
