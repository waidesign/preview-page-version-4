import React from 'react';
import { Check, X, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { PRICING } from '../lib/mock-data';

interface CompetitorComparisonProps {
  onSelectOption: (optionType: 'report' | 'sticker' | 'bundle') => void;
}

export const CompetitorComparison: React.FC<CompetitorComparisonProps> = ({
  onSelectOption,
}) => {
  const comparisonRows = [
    {
      feature: 'Single Vehicle History Report',
      us: PRICING.HISTORY_REPORT.price,
      carfax: '$44.99',
      highlight: true,
    },
    {
      feature: 'Real Auction Listing Photos',
      us: '10+ High-Res Photos',
      carfax: 'Rarely / Stock Photos',
      highlight: true,
    },
    {
      feature: 'Original Factory Window Sticker',
      us: 'Available ($9.99 Add-on)',
      carfax: 'Not Available',
      highlight: true,
    },
    {
      feature: 'Report + Sticker Bundle Discount',
      us: '$29.98 (Save $10)',
      carfax: 'No Bundle Discount',
      highlight: true,
    },
    {
      feature: 'Free My Garage Digital Specs',
      us: '100% Free Forever',
      carfax: 'Requires Purchase',
      highlight: false,
    },
    {
      feature: 'NMVTIS Title & Salvage Check',
      us: 'Included',
      carfax: 'Included',
      highlight: false,
    },
    {
      feature: 'Odometer Rollback & Mileage Verification',
      us: 'Included',
      carfax: 'Included',
      highlight: false,
    },
    {
      feature: 'Open Recall & Safety Alerts',
      us: 'Free Monitoring',
      carfax: 'Paid Only',
      highlight: false,
    },
  ];

  return (
    <section className="w-full py-6">
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3ECF9] text-[#013479] border border-[#024EB6]/20 text-sm font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL VALUE COMPARISON</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#17211D] tracking-tight">
          Why Pay $44.99? See How We Compare to Carfax
        </h2>
        <p className="text-sm text-[#4B5A54] mt-2 max-w-2xl mx-auto font-medium">
          Get official NMVTIS data, real auction photos, and window stickers for <strong>55% less</strong> than standard Carfax reports.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6E9E4] overflow-hidden shadow-elevated">
        <div className="grid grid-cols-12 bg-[#FAFAF7] border-b border-[#E6E9E4] p-4 text-sm font-heading font-bold uppercase tracking-wider text-[#17211D]">
          <div className="col-span-6 sm:col-span-6 text-left">Feature / Data Coverage</div>
          <div className="col-span-3 sm:col-span-3 text-center text-[#013479] bg-[#E3ECF9]/40 py-1.5 rounded-lg border border-[#024EB6]/10">
            Us (My Garage)
          </div>
          <div className="col-span-3 sm:col-span-3 text-center text-[#8A968F] py-1.5">
            Carfax
          </div>
        </div>

        <div className="divide-y divide-[#E6E9E4]">
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 p-3.5 sm:p-4 items-center text-sm transition-colors ${
                row.highlight ? 'bg-[#FAFAF7]/50' : 'bg-white'
              }`}
            >
              <div className="col-span-6 sm:col-span-6 font-medium text-[#17211D] pr-2">
                {row.feature}
              </div>

              <div className="col-span-3 sm:col-span-3 text-center font-bold text-[#013479] bg-[#E3ECF9]/20 py-1 rounded-md">
                {row.us.includes('Included') || row.us.includes('Free') ? (
                  <span className="inline-flex items-center justify-center gap-1 text-[#1E8E5A]">
                    <Check className="w-4 h-4 text-[#1E8E5A]" />
                    <span className="hidden sm:inline">{row.us}</span>
                  </span>
                ) : (
                  <span>{row.us}</span>
                )}
              </div>

              <div className="col-span-3 sm:col-span-3 text-center font-mono font-medium text-[#4B5A54]">
                {row.carfax === 'Not Available' || row.carfax === 'No Bundle Discount' ? (
                  <span className="inline-flex items-center justify-center gap-1 text-[#C2453B]">
                    <X className="w-4 h-4 text-[#C2453B]" />
                    <span className="hidden sm:inline">{row.carfax}</span>
                  </span>
                ) : row.carfax === 'Included' ? (
                  <span className="inline-flex items-center justify-center gap-1 text-[#8A968F]">
                    <Check className="w-4 h-4 text-[#8A968F]" />
                    <span className="hidden sm:inline">Included</span>
                  </span>
                ) : (
                  <span>{row.carfax}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Table Bottom Action Bar */}
        <div className="bg-[#FAFAF7] p-5 border-t border-[#E6E9E4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#4B5A54] font-medium text-center sm:text-left">
            <span className="font-bold text-[#17211D]">Guaranteed NMVTIS Official Data Source.</span>
            <br />
            Same underlying title & mileage records, fraction of the price.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onSelectOption('report')}
              className="flex-1 sm:flex-initial bg-[#013479] hover:bg-[#024EB6] text-white font-bold text-sm py-3 px-5 rounded-xl shadow-brand-glow transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Report — {PRICING.HISTORY_REPORT.price}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectOption('bundle')}
              className="flex-1 sm:flex-initial bg-[#FAFAF7] hover:bg-[#E6E9E4] text-[#17211D] font-bold text-sm py-3 px-4 rounded-xl border border-[#E6E9E4] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Bundle & Save — {PRICING.BUNDLE.price}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
