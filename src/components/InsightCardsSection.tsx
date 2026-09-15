import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Gauge,
  DollarSign,
  Sparkles,
  Zap,
  Gavel,
  Lock,
  CreditCard,
  Users,
  Palette,
  Sliders,
  Shield,
  TrendingUp,
  Wrench,
  Check,
  X
} from 'lucide-react';
import { VehiclePreview } from '../types';
import { PRICING } from '../lib/mock-data';
import { LockedRecordRow } from './LockedRecordTeaser';
import { EstimatedMarketValueSection } from './EstimatedMarketValueSection';

const WHAT_WE_CHECK_FOR = [
  'Ownership History', 'Odometer Readings', 'Title Information', 'Accident History',
  'Junk & Salvage', 'Total Loss History', 'Theft & Recovery', 'Auction Records',
  'Recalls & Defects', 'Lien & Loan', 'Market Value', 'Vehicle Specifications',
];

interface InsightCardsSectionProps {
  vehicle: VehiclePreview;
  savedToGarage?: boolean;
  onOpenSignup: () => void;
  onSelectPurchase: (packageType: 'report' | 'sticker' | 'bundle', price: number, label: string) => void;
  onOpenSampleReport?: () => void;
}

export const InsightCardsSection: React.FC<InsightCardsSectionProps> = ({
  vehicle,
  savedToGarage = false,
  onOpenSignup,
  onSelectPurchase,
  onOpenSampleReport,
}) => {
  const [showChecklist, setShowChecklist] = useState(false);
  const dataPoints = [
    {
      title: 'Accident & Damage',
      sub: '0 Total loss / structural incidents',
      icon: ShieldAlert,
      color: 'text-[#013479]',
      status: 'Clean',
    },
    {
      title: 'Odometer & Mileage',
      sub: 'Verified rollback-free readings',
      icon: Gauge,
      color: 'text-[#013479]',
      status: 'Verified',
    },
    {
      title: 'Auction History',
      sub: 'Prior salvage & wholesale sales',
      icon: Gavel,
      color: 'text-[#013479]',
      status: 'Checked',
    },
    {
      title: 'Title & Brand Check',
      sub: 'Clean title, 0 flood/junk brands',
      icon: ShieldCheck,
      color: 'text-[#013479]',
      status: 'Clean Title',
    },
    {
      title: 'Theft Records',
      sub: 'National NICB stolen audit',
      icon: Lock,
      color: 'text-[#013479]',
      status: 'Clear',
    },
    {
      title: 'Lien & Loan',
      sub: 'Active financial encumbrances',
      icon: CreditCard,
      color: 'text-[#013479]',
      status: 'No Lien',
    },
    {
      title: 'Ownership & Sales',
      sub: '2 Previous owners, registration timeline',
      icon: Users,
      color: 'text-[#013479]',
      status: '2 Owners',
    },
    {
      title: 'Market Value',
      sub: `$${vehicle.marketValueLow.toLocaleString()} – $${vehicle.marketValueHigh.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-[#C97A12]',
      status: 'Valued',
    },
  ];
  // dataPoints is retained for potential future use

  const windowStickerPoints = [
    {
      title: 'MSRP & Pricing',
      sub: 'Base price + option costs',
      icon: DollarSign,
      color: 'text-[#C97A12]',
      status: 'Factory MSRP',
    },
    {
      title: 'Colors & Paint Codes',
      sub: 'Exact exterior & interior colors',
      icon: Palette,
      color: 'text-[#013479]',
      status: 'Paint Codes',
    },
    {
      title: 'Standard Features',
      sub: 'Factory safety & powertrain list',
      icon: Sliders,
      color: 'text-[#013479]',
      status: 'Standard',
    },
    {
      title: 'Options & Packages',
      sub: 'Installed factory packages',
      icon: Sparkles,
      color: 'text-[#C97A12]',
      status: 'Packages',
    },
    {
      title: 'EPA Fuel Economy',
      sub: 'City/Highway MPG ratings',
      icon: Zap,
      color: 'text-[#013479]',
      status: 'EPA MPG',
    },
    {
      title: 'NHTSA Safety Ratings',
      sub: '5-Star crash & rollover scores',
      icon: ShieldCheck,
      color: 'text-[#013479]',
      status: '5-Star',
    },
    {
      title: 'Warranty Coverage',
      sub: 'Bumper-to-bumper & powertrain',
      icon: Shield,
      color: 'text-[#013479]',
      status: 'Coverage',
    },
    {
      title: 'Build & Specs',
      sub: 'Engine, ratios & assembly plant',
      icon: Wrench,
      color: 'text-[#013479]',
      status: 'Specs',
    },
  ];

  return (
    <>
    <section className="w-full">

      {/* Section Title */}
      <div className="mb-6 sm:mb-8 text-left">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D]">
          Available Records for {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>
        <p className="text-sm text-[#4B5A54] mt-1">
          Click any locked record row to unlock full report details and original documentation.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="space-y-6">
        
        {/* TOP ROW: Main Cards with Locked-Record Teaser Pattern in 1 Single Column */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* Main Card 1: Vehicle History Report */}
          <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#013479]/40 p-5 sm:p-6 shadow-elevated flex flex-col justify-between relative overflow-hidden group hover:border-[#013479] transition-all h-full">
            <div className="relative">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#17211D] leading-tight">
                    Vehicle History Report
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-lg font-mono font-bold text-[#013479]">
                    {PRICING.HISTORY_REPORT.price}
                  </span>
                  <div className="text-sm font-bold text-[#1E8E5A]">
                    55% Off Carfax ($44.99)
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#4B5A54] leading-relaxed mb-4">
                Official national audit covering DMV title brands, total loss accidents, odometer rollback checks, salvage auctions, and financial liens.{' '}
                <button
                  type="button"
                  onClick={() => setShowChecklist(true)}
                  className="font-semibold text-[#013479] hover:underline cursor-pointer inline-block"
                >
                  What we check for?
                </button>
              </p>              {/* Locked Record Teaser Rows */}
              <div className="space-y-2.5 mb-6">
                <LockedRecordRow
                  label="Accident & Damage"
                  sublabel="0 structural or flood incidents"
                  blurredValue="NO STRUCTURAL DAMAGE RECORDED"
                  recordCountText="Unlock"
                  icon={ShieldAlert}
                  onClick={onOpenSignup}
                />
                <LockedRecordRow
                  label="Odometer & Mileage"
                  sublabel="Verified mileage readings"
                  blurredValue="READING: 146,032 MILES"
                  recordCountText="Unlock"
                  icon={Gauge}
                  onClick={onOpenSignup}
                />
                <LockedRecordRow
                  label="Title & Brand Check"
                  sublabel="Clean title, 0 salvage brands"
                  blurredValue="TITLE: CLEAN / NO SALVAGE BRAND"
                  recordCountText="Unlock"
                  icon={ShieldCheck}
                  onClick={onOpenSignup}
                />
                <LockedRecordRow
                  label="Auction History"
                  sublabel="Auction records + 10+ photos"
                  blurredValue="LISTING DATE: 05/26/2026"
                  recordCountText="Unlock"
                  icon={Gavel}
                  onClick={onOpenSignup}
                />
                <LockedRecordRow
                  label="Lien & Loan Records"
                  sublabel="0 active liens or loans"
                  blurredValue="LIEN STATUS: CLEAR / NO ACTIVE LOAN"
                  recordCountText="Unlock"
                  icon={CreditCard}
                  onClick={onOpenSignup}
                />
              </div>
            </div>            {/* CTA Buttons */}
            <div className="relative flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E6E9E4]">
              <button
                onClick={() => onSelectPurchase('report', 19.99, 'Vehicle History Report')}
                className="w-full sm:w-auto flex-1 bg-[#013479] hover:bg-[#024EB6] text-white font-bold text-sm py-3 px-4 rounded-xl border border-[#013479] shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2 group/btn active:opacity-90 whitespace-nowrap"
              >
                <span>Get Vehicle History Report — {PRICING.HISTORY_REPORT.price}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://detailedvehiclehistory.com/report/vin/3FA6P0RU9HR306143"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 bg-[#FAFAF7] hover:bg-[#E6E9E4] text-[#17211D] font-semibold text-sm rounded-xl border border-[#E6E9E4] shadow-2xs transition-all cursor-pointer whitespace-nowrap active:opacity-90 inline-flex items-center justify-center text-center"
              >
                Preview Sample
              </a>
            </div>
          </div>

          {/* Main Card 2: Original Window Sticker */}
          <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#FFD601]/40 p-5 sm:p-6 shadow-elevated flex flex-col justify-between relative overflow-hidden group hover:border-[#FFD601] transition-all h-full">
            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-[#E6E9E4]">
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#17211D]">
                    Original Window Sticker
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-lg font-mono font-bold text-[#17211D]">
                    {PRICING.WINDOW_STICKER.price}
                  </span>
                  <div className="text-sm text-[#8A968F]">
                    Factory Reproduction
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#4B5A54] leading-relaxed mb-4">
                100% accurate OEM window sticker reproduction detailing factory MSRP, installed option packages, paint codes, interior trim, fuel economy, and safety ratings.
              </p>

              {/* Locked Window Sticker Rows */}
              <div className="space-y-2.5 mb-6">
                {windowStickerPoints.map((pt, i) => (
                  <LockedRecordRow
                    key={i}
                    label={pt.title}
                    sublabel={pt.sub}
                    icon={pt.icon}
                    recordCountText="Unlock"
                    onClick={() => onSelectPurchase('sticker', 9.99, 'Window Sticker')}
                  />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="relative flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E6E9E4]">
              <button
                onClick={() => onSelectPurchase('sticker', 9.99, 'Window Sticker')}
                className="w-full sm:w-auto flex-1 bg-[#FFD700] hover:bg-[#ECC100] text-[#17211D] font-bold text-sm py-3 px-4 rounded-xl border border-[#FFD700] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 group/btn active:opacity-90 whitespace-nowrap"
              >
                <span>Get Sticker — {PRICING.WINDOW_STICKER.price}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform shrink-0" />
              </button>
              <a
                href="https://detailedvehiclehistory.com/sticker/vin/1G6DV1EP6E0129658-8C228C22-0505-719F-E6A9-AA15132DFB43"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 bg-[#FAFAF7] hover:bg-[#E6E9E4] text-[#17211D] font-semibold text-sm rounded-xl border border-[#E6E9E4] shadow-2xs transition-all cursor-pointer whitespace-nowrap active:opacity-90 inline-flex items-center justify-center text-center"
              >
                Preview Sample
              </a>
            </div>
          </div>

        </div>

        {/* BUNDLE BANNER STRIP */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#013479] via-[#024EB6] to-[#013479] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <Sparkles className="w-5 h-5 text-[#FFD700]" />
            </div>
            <div>
              <div className="font-heading font-bold text-base sm:text-lg">
                Get Both: History Report + Window Sticker Bundle
              </div>
              <p className="text-sm text-white/80 font-medium">
                Save $10.00 instantly when you purchase both reports together for {PRICING.BUNDLE.price}!
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectPurchase('bundle', 29.98, 'Report + Sticker Bundle')}
            className="w-full sm:w-auto bg-[#FFD700] hover:bg-[#ECC100] text-[#17211D] font-heading font-bold text-sm px-5 py-3 rounded-xl border border-[#FFD700] transition-all cursor-pointer whitespace-nowrap shadow-sm flex items-center justify-center gap-2 shrink-0 active:opacity-90"
          >
            <span>Get Bundle — {PRICING.BUNDLE.price}</span>
            <ArrowRight className="w-4 h-4 text-[#17211D]" />
          </button>
        </div>

        {/* Estimated Market Value Section */}
        <EstimatedMarketValueSection
          vehicle={vehicle}
          savedToGarage={savedToGarage}
          onTrackValueInGarage={onOpenSignup}
        />

      </div>
    </section>

    {/* "What we check for?" popup */}
    {showChecklist && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17211D]/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setShowChecklist(false)}
      >
        <div
          className="bg-[#FFFFFF] w-full max-w-2xl rounded-2xl border border-[#E6E9E4] shadow-2xl p-6 sm:p-8 relative animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowChecklist(false)}
            aria-label="Close"
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#FAFAF7] border border-[#E6E9E4] flex items-center justify-center text-[#4B5A54] hover:text-[#17211D] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="font-heading font-bold text-lg text-[#17211D] mb-4">
            We check for
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3">
            {WHAT_WE_CHECK_FOR.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-sm text-[#013479] font-medium whitespace-nowrap">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

