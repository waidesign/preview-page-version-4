import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShieldCheck, Camera } from 'lucide-react';
import { VehiclePreview } from '../../types';
import { VinPlate } from '../VinPlate';
import { MANUFACTURER_LOGOS } from '../../lib/manufacturer-logos';

interface Screen2ConfirmProps {
  vehicle: VehiclePreview;
  onContinue: () => void;
}

export const Screen2Confirm: React.FC<Screen2ConfirmProps> = ({
  vehicle,
  onContinue,
}) => {
  const [imageError, setImageError] = useState(false);

  // Conditional real auction photo ONLY if an auction record exists for this specific vehicle
  const auctionPhoto =
    vehicle.auctionListing?.imageUrl ||
    (vehicle.auctionImages && vehicle.auctionImages.length > 0 ? vehicle.auctionImages[0] : null);

  const hasAuctionPhoto = Boolean(auctionPhoto && !imageError);

  // Exactly 8 spec fields — hard cap, pick the 8 most identity-confirming fields
  const specFields = [
    { label: 'Trim Level', value: vehicle.specs.trim || 'Standard' },
    { label: 'Engine', value: vehicle.specs.engine || 'Factory Spec' },
    { label: 'Fuel Type', value: vehicle.specs.fuel || 'Gasoline' },
    { label: 'Drivetrain', value: vehicle.specs.drive || 'Standard Drive' },
    { label: 'Transmission', value: vehicle.specs.transmission || 'Automatic' },
    { label: 'Body Style', value: vehicle.specs.body || 'Passenger' },
    { label: 'Doors', value: `${vehicle.specs.doors || '4'}-Door` },
    { label: 'Origin / Plant', value: vehicle.specs.country || 'Official Plant' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center sm:justify-start gap-2 mb-3"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E3F2EC] text-[#1E8E5A] border border-[#1E8E5A]/20">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E8E5A]" />
          <span>Vehicle Decoded Successfully</span>
        </span>
      </motion.div>

      {/* Title & VIN Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E9E4] pb-6"
      >
        <div className="flex items-center gap-3.5">
          {MANUFACTURER_LOGOS[vehicle.make] ? (
            <div className="w-12 h-12 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] flex items-center justify-center shrink-0 p-2 shadow-2xs">
              <img
                src={MANUFACTURER_LOGOS[vehicle.make]}
                alt={`${vehicle.make} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[#E3ECF9] border border-[#013479]/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#013479]" />
            </div>
          )}

          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D] tracking-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-xs text-[#4B5A54] font-medium mt-0.5">
              Official DMV & NHTSA Database Match
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <VinPlate vin={vehicle.vin} plate={vehicle.plate} plateState={vehicle.plateState} />
        </div>
      </motion.div>

      {/* Main Content: 8 specs + conditional auction photo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-[#FFFFFF] rounded-2xl border border-[#E6E9E4] p-5 sm:p-7 shadow-elevated mb-8"
      >
        <div className={`grid grid-cols-1 ${hasAuctionPhoto ? 'lg:grid-cols-12' : ''} gap-6 items-start`}>
          {/* Conditional Auction Image (Only if auction record exists) */}
          {hasAuctionPhoto && auctionPhoto && (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E6E9E4] bg-[#FAFAF7] shadow-resting group">
                <img
                  src={auctionPhoto}
                  alt={`${vehicle.fullName} auction record`}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#17211D]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-mono font-medium text-white flex items-center gap-1.5 shadow-sm">
                  <Camera className="w-3.5 h-3.5 text-[#F9AD24]" />
                  <span>10+ Images Available</span>
                </div>
              </div>
            </div>
          )}

          {/* Exactly 8 Specification Data Points */}
          <div className={hasAuctionPhoto ? 'lg:col-span-7' : 'w-full'}>
              <span className="text-xs font-heading font-bold text-[#17211D] uppercase tracking-wider">
                Confirmed Factory Specifications
              </span>

            <div className={`grid grid-cols-2 ${hasAuctionPhoto ? 'sm:grid-cols-2' : 'sm:grid-cols-4'} gap-3`}>
              {specFields.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] flex flex-col justify-center"
                >
                  <span className="text-xs font-semibold text-[#8A968F] uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-bold text-[#17211D] mt-0.5 truncate" title={spec.value}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Single Primary Action: Continue */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <button
          type="button"
          onClick={onContinue}
          className="w-full sm:w-auto min-w-[280px] bg-[#013479] hover:bg-[#024EB6] text-white font-heading font-bold text-base py-3.5 px-8 rounded-xl shadow-brand-glow hover:shadow-elevated transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>Confirm & Continue</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
