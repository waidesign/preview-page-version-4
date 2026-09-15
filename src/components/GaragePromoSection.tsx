import React from 'react';
import {
  Search,
  Bookmark,
  Cpu,
  AlertTriangle,
  Wrench,
  TrendingUp,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { VehiclePreview } from '../types';

interface GaragePromoSectionProps {
  vehicle: VehiclePreview;
  onOpenSignup: () => void;
}

export const GaragePromoSection: React.FC<GaragePromoSectionProps> = ({
  vehicle,
  onOpenSignup,
}) => {
  const benefits = [
    { label: 'Unlimited VIN & plate lookups', icon: Search },
    { label: 'Save vehicles permanently to My Garage', icon: Bookmark },
    { label: 'Complete technical decode data & specs', icon: Cpu },
    { label: 'Automatic safety recall alerts', icon: AlertTriangle },
    { label: 'Recommended maintenance schedule tracking', icon: Wrench },
    { label: 'Live market value monitoring & depreciation', icon: TrendingUp },
    { label: 'Original window stickers when available', icon: FileText },
    { label: 'Full history reports accessible anytime', icon: ShieldCheck },
  ];

  return (
    <section className="w-full py-12 md:py-16 border-t border-[#E6E9E4]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
        
        {/* Left Column: Copy & Benefits */}
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D] tracking-tight leading-tight">
            One garage for every car in your life
          </h2>

          <p className="text-sm text-[#4B5A54] mt-3 leading-relaxed">
            Stop losing track of specs, recalls, and maintenance. When you save your <strong>{vehicle.make} {vehicle.model}</strong>, we build its permanent digital binder so you can access everything in seconds.
          </p>

          {/* 8 Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            {benefits.map((b, i) => {
              const IconComp = b.icon;
              return (
                <div key={i} className="flex items-start gap-2 text-sm text-[#17211D]">
                  <div className="p-1 rounded bg-[#E3ECF9] text-[#013479] shrink-0 mt-0.5">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium leading-snug">{b.label}</span>
                </div>
              );
            })}
          </div>

          {/* Action + Honest label in 2 rows */}
          <div className="pt-2 flex flex-col items-start gap-2">
            <button
              onClick={onOpenSignup}
              className="w-full sm:w-auto bg-[#013479] hover:bg-[#024EB6] text-[#FFFFFF] font-bold text-sm px-5 py-3 rounded-xl border border-[#013479] shadow-2xs transition-all cursor-pointer inline-flex items-center justify-center gap-2 active:opacity-90"
            >
              <span>Create Free Garage Account</span>
            </button>
            <span className="text-sm font-mono text-[#4B5A54] pl-1">
              Free forever • No credit card
            </span>
          </div>
        </div>

        {/* Right Column: Members Area Preview */}
        <div className="w-full">
          <img
            src="/images/members-area.webp"
            alt="My Garage members area preview"
            className="w-full h-auto rounded-2xl"
          />
        </div>

      </div>
    </section>
  );
};
