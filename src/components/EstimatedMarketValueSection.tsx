import React, { useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { VehiclePreview } from '../types';

interface EstimatedMarketValueSectionProps {
  vehicle: VehiclePreview;
  onTrackValueInGarage: () => void;
  savedToGarage?: boolean;
}

type VehicleCondition = 'outstanding' | 'clean' | 'average' | 'rough';

interface ConditionOption {
  id: VehicleCondition;
  label: string;
  badge: string;
  badgeType: 'top' | 'common' | 'fair' | 'rough';
  description: string;
  priceMultiplier: number;
}

export const EstimatedMarketValueSection: React.FC<EstimatedMarketValueSectionProps> = ({
  vehicle,
  onTrackValueInGarage,
  savedToGarage = false,
}) => {
  const [selectedCondition, setSelectedCondition] = useState<VehicleCondition>('clean');

  // Base clean market value (defaults to $7,330 for standard sample or average of vehicle range)
  const baseCleanPrice = vehicle.marketValueLow && vehicle.marketValueHigh
    ? Math.round((vehicle.marketValueLow + vehicle.marketValueHigh) / 2)
    : 7330;

  // Exact range for the top right badge
  const rangeLow = vehicle.id === 'ford-fusion-2017' ? 4338 : Math.round(baseCleanPrice * 0.59);
  const rangeHigh = vehicle.id === 'ford-fusion-2017' ? 8826 : Math.round(baseCleanPrice * 1.205);

  const conditionOptions: ConditionOption[] = [
    {
      id: 'outstanding',
      label: 'Outstanding',
      badge: 'Top 5%',
      badgeType: 'top',
      description: 'Outstanding Tier: Flawless mechanical condition, pristine cosmetic finish, complete maintenance records.',
      priceMultiplier: 1.0817, // ~$7,929
    },
    {
      id: 'clean',
      label: 'Clean',
      badge: 'Most Common',
      badgeType: 'common',
      description: 'Clean Tier: Minor normal wear, clean title history, reliable mechanical condition.',
      priceMultiplier: 1.0, // ~$7,330
    },
    {
      id: 'average',
      label: 'Average',
      badge: 'Fair Market',
      badgeType: 'fair',
      description: 'Average Tier: Moderate cosmetic wear, mechanically sound, regular service history.',
      priceMultiplier: 0.8776, // ~$6,433
    },
    {
      id: 'rough',
      label: 'Rough',
      badge: 'Needs Work',
      badgeType: 'rough',
      description: 'Rough Tier: Significant cosmetic or mechanical wear, needs reconditioning work.',
      priceMultiplier: 0.7348, // ~$5,386
    },
  ];

  const currentOption = conditionOptions.find((c) => c.id === selectedCondition) || conditionOptions[1];
  
  // Calculate price points for current condition
  const privatePartyPrice = Math.round(baseCleanPrice * currentOption.priceMultiplier);
  const dealerRetailPrice = Math.round(privatePartyPrice * 1.1225);
  const dealerTradeInPrice = Math.round(privatePartyPrice * 0.8368);

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6E9E4] p-5 sm:p-7 shadow-elevated transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E6E9E4]">
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#17211D]">
            Estimated Market Value
          </h2>
          <p className="text-sm text-[#4B5A54] mt-1 leading-relaxed">
            Real-time valuation based on actual dealer sales, auction logs &amp; current inventory for this{' '}
            <span className="font-semibold text-[#17211D]">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>.
          </p>
        </div>

        {/* Range Badge */}
        <div className="bg-[#FAFAF7] border border-[#E6E9E4] rounded-xl px-4 py-2 text-left sm:text-right shrink-0">
          <div className="text-[10px] font-mono font-bold text-[#8A968F] uppercase tracking-wider">
            Market Value Range
          </div>
          <div className="text-base sm:text-lg font-heading font-bold text-[#013479] mt-0.5">
            ${rangeLow.toLocaleString()} – ${rangeHigh.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Select Vehicle Condition subheader */}
      <div className="pt-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-[#4B5A54] tracking-wider uppercase">
            Select Vehicle Condition:
          </span>
          <span className="text-xs text-[#8A968F] hidden sm:inline-block">
            Click to view valuation details by tier
          </span>
        </div>

        {/* Condition Pills / Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {conditionOptions.map((opt) => {
            const isSelected = selectedCondition === opt.id;
            const approxPrice = Math.round(baseCleanPrice * opt.priceMultiplier);

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedCondition(opt.id)}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-[#013479] bg-[#FFFFFF] shadow-sm ring-1 ring-[#013479]/20'
                    : 'border border-[#E6E9E4] bg-[#FAFAF7] hover:bg-[#FFFFFF] hover:border-[#8A968F]/60'
                }`}
              >
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="text-sm font-bold text-[#17211D]">
                    {opt.label}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected && opt.id === 'clean'
                        ? 'bg-[#013479] text-white'
                        : isSelected
                        ? 'bg-[#013479]/10 text-[#013479]'
                        : 'bg-[#E6E9E4]/70 text-[#4B5A54]'
                    }`}
                  >
                    {opt.badge}
                  </span>
                </div>
                <div className="text-xs font-mono font-semibold text-[#4B5A54]">
                  ~${approxPrice.toLocaleString()}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Detailed Valuation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mt-6">
        {/* Card 1: Dealer Retail */}
        <div className="rounded-2xl border border-[#E6E9E4] bg-[#FAFAF7]/50 p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-[#17211D]">
              Dealer Retail
            </h3>
            <p className="text-xs text-[#4B5A54] mt-1 leading-snug">
              Typical lot price with dealer prep &amp; warranty
            </p>
          </div>
          <div>
            <div className="my-4 border-t border-[#E6E9E4]" />
            <div className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D]">
              ${dealerRetailPrice.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-[#1E8E5A]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs font-semibold">Includes reconditioning margin</span>
            </div>
          </div>
        </div>

        {/* Card 2: Private Party (Centerpiece Highlighted) */}
        <div className="rounded-2xl border-2 border-[#013479] bg-[#FFFFFF] p-5 sm:p-6 shadow-sm flex flex-col justify-between relative">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#013479]">
              Private Party
            </h3>
            <p className="text-xs text-[#4B5A54] mt-1 leading-snug">
              Recommended target price when buying or selling directly
            </p>
          </div>
          <div>
            <div className="my-4 border-t border-[#013479]/20" />
            <div className="text-3xl sm:text-4xl font-heading font-bold text-[#013479]">
              ${privatePartyPrice.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-[#4B5A54] mt-1.5">
              Recommended fair market transaction price
            </div>
          </div>
        </div>

        {/* Card 3: Dealer Trade-In */}
        <div className="rounded-2xl border border-[#E6E9E4] bg-[#FAFAF7]/50 p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-[#17211D]">
              Dealer Trade-In
            </h3>
            <p className="text-xs text-[#4B5A54] mt-1 leading-snug">
              Wholesale offer from dealers for hassle-free trade
            </p>
          </div>
          <div>
            <div className="my-4 border-t border-[#E6E9E4]" />
            <div className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D]">
              ${dealerTradeInPrice.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-[#4B5A54] mt-1.5">
              Wholesale base estimate
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tier Explanation & Action Bar — hidden once vehicle is already saved to garage */}
      {!savedToGarage && (
        <div className="mt-6 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5 text-xs text-[#4B5A54]">
            <ShieldCheck className="w-4 h-4 text-[#013479] shrink-0 mt-0.5 sm:mt-0" />
            <span className="leading-snug">
              {currentOption.description}
            </span>
          </div>

          <button
            type="button"
            onClick={onTrackValueInGarage}
            className="w-full sm:w-auto bg-[#013479] hover:bg-[#024EB6] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#013479] shadow-2xs transition-all cursor-pointer whitespace-nowrap active:opacity-90 shrink-0 text-center"
          >
            Track Value Free in Garage
          </button>
        </div>
      )}
    </div>
  );
};
