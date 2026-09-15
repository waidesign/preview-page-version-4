import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { VehiclePreview } from '../types';
import { PRICING } from '../lib/mock-data';

interface PurchaseRailProps {
  vehicle: VehiclePreview;
  onSelectOption: (optionType: 'report' | 'sticker' | 'bundle', quantity?: number) => void;
}

export const PurchaseRail: React.FC<PurchaseRailProps> = ({
  vehicle,
  onSelectOption,
}) => {
  const [reportQty, setReportQty] = useState<number>(1);
  const [stickerQty, setStickerQty] = useState<number>(0);

  // Pricing for each report quantity (1-5)
  const reportPricingMap: Record<number, { total: number; perUnit: number; tag: string | null }> = {
    1: { total: 19.99, perUnit: 19.99, tag: null },
    2: { total: 34.99, perUnit: 17.50, tag: null },
    3: { total: 39.99, perUnit: 13.33, tag: 'Popular — Save 33%' },
    4: { total: 54.99, perUnit: 13.75, tag: null },
    5: { total: 59.99, perUnit: 12.00, tag: 'Best Value — Save 40%' },
  };

  // Calculate Report total
  const getReportTotal = (qty: number) => {
    return reportPricingMap[qty]?.total ?? 19.99 * qty;
  };

  // Pricing for each sticker quantity (0-5)
  const stickerPricingMap: Record<number, { total: number; perUnit: number; tag: string | null }> = {
    0: { total: 0, perUnit: 0, tag: null },
    1: { total: 9.99, perUnit: 9.99, tag: null },
    2: { total: 17.99, perUnit: 9.00, tag: null },
    3: { total: 24.99, perUnit: 8.33, tag: 'Popular — Save 33%' },
    4: { total: 29.99, perUnit: 7.50, tag: null },
    5: { total: 34.99, perUnit: 7.00, tag: 'Best Value — Save 40%' },
  };

  // Calculate Sticker total
  const getStickerTotal = (qty: number) => {
    return stickerPricingMap[qty]?.total ?? (qty > 0 ? 9.99 * qty : 0);
  };

  const reportPrice = getReportTotal(reportQty);
  const stickerPrice = getStickerTotal(stickerQty);
  const totalPrice = Number((reportPrice + stickerPrice).toFixed(2));

  // Savings calculation vs separate retail prices ($19.99 per report + $19.99 per sticker)
  const standaloneFullPrice = (reportQty * 19.99) + (stickerQty * 19.99);
  const totalSavings = Number((standaloneFullPrice - totalPrice).toFixed(2));

  // Primary CTA Button Package Summary Generator
  const getCtaText = () => {
    if (reportQty === 1 && stickerQty === 1) {
      return 'Report + Sticker Bundle';
    }
    if (reportQty > 0 && stickerQty > 0) {
      return `${reportQty}x Reports + ${stickerQty}x Stickers`;
    }
    if (reportQty > 0) {
      return `${reportQty > 1 ? `${reportQty}x ` : ''}History Report`;
    }
    if (stickerQty > 0) {
      return `${stickerQty > 1 ? `${stickerQty}x ` : ''}Window Sticker`;
    }
    return 'Package';
  };

  const handleCtaClick = () => {
    if (reportQty > 0 && stickerQty > 0) {
      onSelectOption('bundle', reportQty);
    } else if (stickerQty > 0) {
      onSelectOption('sticker', stickerQty);
    } else {
      onSelectOption('report', reportQty);
    }
  };

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6E9E4] p-5 shadow-elevated space-y-4">
      {/* Title & Trust Header */}
      <div className="border-b border-[#E6E9E4] pb-3.5">
        <h3 className="text-xl font-heading font-bold text-[#17211D] tracking-tight">
          Get {vehicle.year} {vehicle.make} {vehicle.model} History Report
        </h3>
        <p className="text-sm text-[#4B5A54] mt-1 font-medium">
          Instant PDF delivery • 100% money-back accuracy guarantee
        </p>
      </div>

      <div className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-heading font-extrabold text-base text-[#17211D] tracking-tight">
            Vehicle History Report
          </span>
          <div className="flex items-center gap-2">
            {reportQty > 0 && (
              <span className="text-sm text-[#8A968F] line-through font-mono font-semibold">
                ${(reportQty * 29.99).toFixed(2)}
              </span>
            )}
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg font-mono font-extrabold text-base sm:text-lg shadow-2xs transition-all ${
              reportQty > 0
                ? 'bg-[#013479]/10 text-[#013479] border border-[#013479]/20'
                : 'bg-[#FAFAF7] text-[#8A968F] border border-[#E6E9E4]'
            }`}>
              ${reportPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Stepper Row */}
        <div className="flex items-center gap-3">
          {/* Minus Button */}
          <button
            type="button"
            onClick={() => setReportQty(q => Math.max(1, q - 1))}
            disabled={reportQty <= 1}
            className="w-10 h-10 rounded-xl border-2 border-[#E6E9E4] bg-white text-[#17211D] text-xl font-bold flex items-center justify-center hover:border-[#013479]/50 hover:bg-[#E3ECF9]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            −
          </button>

          {/* Quantity Display */}
          <div className={`flex-1 flex flex-row items-center justify-center gap-2 py-2 px-3 rounded-xl border-2 text-center transition-all ${
            reportQty > 0
              ? 'bg-[#E3ECF9] border-[#013479]/30 text-[#013479]'
              : 'bg-[#FAFAF7] border-[#E6E9E4] text-[#8A968F]'
          }`}>
            <span className="text-xl font-black">{reportQty}</span>
            <span className="text-base font-bold">
              {reportQty === 1 ? 'Report' : 'Reports'}
            </span>
          </div>

          {/* Plus Button */}
          <button
            type="button"
            onClick={() => setReportQty(q => Math.min(5, q + 1))}
            disabled={reportQty >= 5}
            className="w-10 h-10 rounded-xl border-2 border-[#E6E9E4] bg-white text-[#17211D] text-xl font-bold flex items-center justify-center hover:border-[#013479]/50 hover:bg-[#E3ECF9]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            +
          </button>
        </div>

        {/* Dynamic Discount Badge */}
        {reportPricingMap[reportQty]?.tag && (
          <div className={`flex items-center justify-center py-1.5 rounded-lg text-sm font-bold ${
            reportQty === 5
              ? 'bg-[#E3F2EC] text-[#1E8E5A] border border-[#1E8E5A]/20'
              : 'bg-[#FFF4E3] text-[#C97A12] border border-[#C97A12]/20'
          }`}>
            {reportPricingMap[reportQty]?.tag}
          </div>
        )}
      </div>

      {/* 2. WINDOW STICKER QUANTITY PACKAGES CARD (Directly Under Report Card) */}
      <div className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-heading font-extrabold text-base text-[#17211D] tracking-tight">
            Window Sticker
          </span>
          <div className="flex items-center gap-2">
            {stickerQty > 0 && (
              <span className="text-sm text-[#8A968F] line-through font-mono font-semibold">
                ${(stickerQty * 19.99).toFixed(2)}
              </span>
            )}
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg font-mono font-extrabold text-base sm:text-lg shadow-2xs transition-all ${
              stickerQty > 0
                ? 'bg-[#C97A12]/10 text-[#C97A12] border border-[#C97A12]/20'
                : 'bg-[#FAFAF7] text-[#8A968F] border border-[#E6E9E4]'
            }`}>
              ${stickerPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Stepper Row */}
        <div className="flex items-center gap-3">
          {/* Minus Button */}
          <button
            type="button"
            onClick={() => setStickerQty(q => Math.max(0, q - 1))}
            disabled={stickerQty <= 0}
            className="w-10 h-10 rounded-xl border-2 border-[#E6E9E4] bg-white text-[#17211D] text-xl font-bold flex items-center justify-center hover:border-[#C97A12]/50 hover:bg-[#FFF7ED]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            −
          </button>

          {/* Quantity Display */}
          <div className={`flex-1 flex flex-row items-center justify-center gap-2 py-2 px-3 rounded-xl border-2 text-center transition-all ${
            stickerQty > 0
              ? 'bg-[#FFF7ED] border-[#C97A12]/30 text-[#C97A12]'
              : 'bg-[#FAFAF7] border-[#E6E9E4] text-[#8A968F]'
          }`}>
            <span className="text-xl font-black">{stickerQty}</span>
            <span className="text-base font-bold">
              {stickerQty === 1 ? 'Sticker' : 'Stickers'}
            </span>
          </div>

          {/* Plus Button */}
          <button
            type="button"
            onClick={() => setStickerQty(q => Math.min(5, q + 1))}
            disabled={stickerQty >= 5}
            className="w-10 h-10 rounded-xl border-2 border-[#E6E9E4] bg-white text-[#17211D] text-xl font-bold flex items-center justify-center hover:border-[#C97A12]/50 hover:bg-[#FFF7ED]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            +
          </button>
        </div>

        {/* Dynamic Discount Badge */}
        {stickerPricingMap[stickerQty]?.tag && (
          <div className={`flex items-center justify-center py-1.5 rounded-lg text-sm font-bold ${
            stickerQty === 5
              ? 'bg-[#E3F2EC] text-[#1E8E5A] border border-[#1E8E5A]/20'
              : 'bg-[#FFF4E3] text-[#C97A12] border border-[#C97A12]/20'
          }`}>
            {stickerPricingMap[stickerQty]?.tag}
          </div>
        )}
      </div>

      {/* SAVINGS BADGE BAR */}
      {totalSavings > 0 && (
        <div className="px-3 py-2 rounded-lg bg-[#E3F2EC] border border-[#1E8E5A]/20 flex items-center justify-between text-sm text-[#1E8E5A] font-semibold">
          <span>Package Savings Applied:</span>
          <span className="font-mono font-bold">Save ${totalSavings.toFixed(2)}</span>
        </div>
      )}

      {/* PRIMARY PAID CTA BUTTON (Compact Split Layout) */}
      <button
        onClick={handleCtaClick}
        className="w-full bg-[#013479] hover:bg-[#024EB6] text-white py-3 px-3.5 rounded-xl border border-[#013479] shadow-2xs transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group active:opacity-90 text-left"
      >
        <span className="text-sm font-bold truncate">
          Get {getCtaText()}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-mono font-extrabold text-sm sm:text-base bg-white/15 px-2 py-0.5 rounded-md border border-white/20">
            ${totalPrice.toFixed(2)}
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
      </button>



      {/* Compact Competitor Price Callout */}
      <div className="p-3 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] text-sm space-y-1">
        <div className="flex items-center justify-between font-semibold">
          <span className="text-[#4B5A54]">Carfax Single Report:</span>
          <span className="font-mono text-[#C2453B] line-through">$44.99</span>
        </div>
        <div className="flex items-center justify-between font-bold text-[#1E8E5A]">
          <span>Our History Report:</span>
          <span className="font-mono text-[#013479]">{PRICING.HISTORY_REPORT.price}</span>
        </div>
        <p className="text-sm text-[#8A968F] pt-1 border-t border-[#E6E9E4]">
          ⚡ Save $25 (55% less) for official NMVTIS-backed data.
        </p>
      </div>

      {/* Trust Credibility Footer */}
      <div className="flex items-center justify-between text-sm text-[#8A968F] pt-1">
        <span className="flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-[#1E8E5A]" /> 256-Bit SSL Checkout
        </span>
        <span className="flex items-center gap-1 font-semibold text-[#17211D]">
          NMVTIS Approved
        </span>
      </div>
    </div>
  );
};
