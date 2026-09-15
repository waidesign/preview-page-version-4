import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Search, ShieldCheck, ArrowRight, Image as ImageIcon, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { VehiclePreview } from '../types';
import { VinPlate } from './VinPlate';
import { MANUFACTURER_LOGOS } from '../lib/manufacturer-logos';

interface GarageCardProps {
  vehicle: VehiclePreview;
  savedToGarage?: boolean;
  onSaveToGarage: () => void;
}

export const GarageCard: React.FC<GarageCardProps> = ({
  vehicle,
  savedToGarage = false,
  onSaveToGarage,
}) => {
  const [imageError, setImageError] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // The auction-site listing photo (bid.cars) takes top priority, then sales-history
  // photos (only the first of either is shown); otherwise fall back to a slider through
  // the exterior + interior gallery photos.
  const auctionImage = vehicle.auctionListing?.imageUrl ?? vehicle.auctionImages?.[0];
  const isShowingAuctionListing = Boolean(vehicle.auctionListing) && auctionImage === vehicle.auctionListing?.imageUrl;
  const hasAuctionRecord = Boolean(vehicle.auctionListing) || Boolean(vehicle.auctionImages?.length);
  const galleryImages = [...(vehicle.exteriorImages ?? []), ...(vehicle.interiorImages ?? [])];
  const showSlider = !auctionImage && galleryImages.length > 1;
  const displayImage = auctionImage ?? galleryImages[galleryIndex] ?? vehicle.photoUrl;

  useEffect(() => {
    setImageError(false);
    setGalleryIndex(0);
  }, [vehicle.id]);

  const specFields = [
    { label: 'TRIM', value: vehicle.specs.trim },
    { label: 'ENGINE', value: vehicle.specs.engine },
    { label: 'FUEL', value: vehicle.specs.fuel },
    { label: 'DRIVE', value: vehicle.specs.drive },
    { label: 'TRANSMISSION', value: vehicle.specs.transmission },
    { label: 'BODY', value: vehicle.specs.body },
    { label: 'DOORS', value: vehicle.specs.doors },
    { label: 'ORIGIN', value: vehicle.specs.country },
  ];

  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Eyebrow Status */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-center gap-3 mb-3"
      >
        {/* Always the same badge — same green style, same text — regardless of vehicle status */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-[#E3F2EC] text-[#1E8E5A] border border-[#1E8E5A]/20">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E8E5A]" />
          <span>Records found for this vehicle</span>
        </span>
      </motion.div>

      {/* Main Vehicle Headline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mb-4"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Manufacturer logo — falls back to a placeholder icon when we don't have a logo asset for this make */}
          {MANUFACTURER_LOGOS[vehicle.make] ? (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] flex items-center justify-center shrink-0 p-2">
              <img
                src={MANUFACTURER_LOGOS[vehicle.make]}
                alt={`${vehicle.make} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#FAFAF7] border-2 border-dashed border-[#8A968F]/60 flex items-center justify-center shrink-0"
              title="Manufacturer logo placeholder"
            >
              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#8A968F]" />
            </div>
          )}

          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#17211D] tracking-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>

            {/* Metal VIN Plate — desktop only here, inline under the title */}
            <div className="hidden sm:block">
              <VinPlate vin={vehicle.vin} plate={vehicle.plate} plateState={vehicle.plateState} />
            </div>
          </div>
        </div>

        {/* Metal VIN Plate — mobile only, shown separately as its own full-width row below the logo + title */}
        <div className="sm:hidden">
          <VinPlate vin={vehicle.vin} plate={vehicle.plate} plateState={vehicle.plateState} />
        </div>
      </motion.div>

      {/* The Garage Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#FFFFFF] rounded-xl border border-[#E6E9E4] p-5 sm:p-7 shadow-elevated transition-all"
      >
        {/* Auction History Notification Box — spans full width above both columns, only when we have auction/sales-history records */}
        {hasAuctionRecord && (
          <div
            onClick={onSaveToGarage}
            className="w-full mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] cursor-pointer hover:bg-[#FEE2E2] transition-all group shadow-2xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#991B1B] leading-snug">
                  This vehicle was previously listed for sale at auction.
                </p>
                <p className="text-sm font-medium text-[#B91C1C] leading-snug mt-0.5">
                  Unlock full auction record & 10+ high-res photos
                </p>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-[#013479] hover:bg-[#024EB6] text-white border border-[#013479] px-3.5 py-2.5 rounded-xl text-sm font-bold shadow-2xs transition-all w-full sm:w-auto shrink-0">
                <span>Unlock Full Report — $19.99</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </div>

            {vehicle.auctionDetails && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-[#FCA5A5]/50">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#B91C1C]/80 uppercase tracking-wider">
                    Auction Date
                  </div>
                  <div className="text-sm font-mono font-semibold text-[#991B1B]">
                    {vehicle.auctionDetails.auctionDate}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#B91C1C]/80 uppercase tracking-wider">
                    Location
                  </div>
                  <div className="text-sm font-mono font-bold text-[#991B1B] blur-[3px] select-none">
                    Elkton (MD)
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#B91C1C]/80 uppercase tracking-wider">
                    Exact Odometer
                  </div>
                  <div className="text-sm font-mono font-bold text-[#991B1B] blur-[3px] select-none">
                    146,032 mi
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#B91C1C]/80 uppercase tracking-wider">
                    Primary Damage
                  </div>
                  <div className="text-sm font-mono font-bold text-[#991B1B] blur-[3px] select-none">
                    Normal wear / tear
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Column: Image & Primary Action — Only rendered when vehicle has Auction Records with images */}
          {hasAuctionRecord && (
            <div className="lg:col-span-5 flex flex-col items-stretch">
              <div className="w-full aspect-[4/3] bg-[#FAFAF7] rounded-lg border border-[#E6E9E4] overflow-hidden relative group flex items-center justify-center p-2">
                {!imageError && displayImage ? (
                  <>
                    <img
                      key={displayImage}
                      src={displayImage}
                      alt={vehicle.fullName}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover rounded-md"
                      referrerPolicy="no-referrer"
                    />

                    {showSlider && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)
                          }
                          aria-label="Previous photo"
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#17211D]/50 hover:bg-[#17211D]/70 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setGalleryIndex((i) => (i + 1) % galleryImages.length)}
                          aria-label="Next photo"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#17211D]/50 hover:bg-[#17211D]/70 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-2 right-2 bg-[#17211D]/60 text-white text-sm font-mono px-1.5 py-0.5 rounded">
                          {galleryIndex + 1} / {galleryImages.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center text-[#8A968F] p-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#E3ECF9] flex items-center justify-center mb-2">
                      <ShieldCheck className="w-8 h-8 text-[#013479]" />
                    </div>
                    <span className="font-heading font-semibold text-sm text-[#17211D]">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </span>
                    <span className="text-sm text-[#4B5A54] mt-1 font-mono">
                      Official Spec Record
                    </span>
                  </div>
                )}

                {/* Status Badge overlay — shows auction listing photo count */}
                <div className="absolute top-3 left-3 bg-[#FFFFFF]/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-sm font-mono font-medium text-[#17211D] border border-[#E6E9E4] shadow-sm flex items-center gap-1.5">
                  {isShowingAuctionListing ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
                      <span>10+ Auction Photos Available</span>
                    </>
                  ) : (
                    <span>{vehicle.specs.trim}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Spec Grid (Expanded to full 12 cols when no auction images) */}
          <div className={hasAuctionRecord ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <div className="pb-3 mb-4 border-b border-[#E6E9E4]">
              <h2 className="text-lg sm:text-xl font-heading font-bold text-[#17211D]">
                Vehicle Specifications
              </h2>
              <p className="text-sm text-[#024EB6] mt-0.5 font-medium">
                Decoded directly from manufacturer build data
              </p>
            </div>

            {/* 2-row × 4-col spec grid — no extra tile inside */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-4`}>
              {specFields.map((field, idx) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.15 + idx * 0.03 }}
                  className="bg-[#FAFAF7] p-3 rounded-lg border border-[#E6E9E4] hover:border-[#024EB6]/30 transition-colors"
                >
                  <div className="text-xs font-sans font-bold text-[#8A968F] tracking-wider uppercase mb-1">
                    {field.label}
                  </div>
                  <div className="text-sm font-heading font-semibold text-[#17211D] leading-tight break-words truncate" title={field.value}>
                    {field.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Save-to-Garage promotional card — hidden once user has saved ── */}
            {!savedToGarage && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7] shadow-resting"
              >
                {/* Thumbnail – vehicle photo as a mini-card preview */}
                <div className="hidden sm:flex shrink-0 w-[88px] h-[60px] rounded-lg overflow-hidden border border-[#E6E9E4] bg-[#FFFFFF] items-center justify-center shadow-2xs relative">
                  {displayImage && !imageError ? (
                    <img
                      src={displayImage}
                      alt={vehicle.fullName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <ShieldCheck className="w-5 h-5 text-[#013479]" />
                      <span className="text-[10px] font-mono text-[#8A968F] mt-0.5">My Garage</span>
                    </div>
                  )}
                  {/* Tiny overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#17211D]/70 text-white text-[9px] font-mono font-bold text-center py-0.5 tracking-wider">
                    MY GARAGE
                  </div>
                </div>

                {/* Copy + CTA */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#17211D] leading-snug flex items-center gap-1.5 flex-wrap">
                    See full vehicle specifications{' '}
                    <strong className="font-bold text-[#013479]">FREE</strong>{' '}in My Garage
                    <span className="relative group cursor-help inline-flex">
                      <HelpCircle className="w-3.5 h-3.5 text-[#8A968F]" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg bg-[#17211D] text-white text-xs leading-snug px-2.5 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50 pointer-events-none text-center">
                        Save this car to your free My Garage account to unlock the full spec sheet, recall alerts, and maintenance schedule.
                      </span>
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={onSaveToGarage}
                    className="mt-2 text-sm font-bold text-[#FFFFFF] bg-[#013479] hover:bg-[#024EB6] border border-[#013479] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs active:opacity-90 inline-flex items-center justify-center"
                  >
                    Sign up free
                  </button>

                  <p className="text-xs text-[#8A968F] mt-1.5 font-medium">
                    No credit card required. FREE forever
                  </p>
                </div>
              </motion.div>
            )}
          </div>

        </div>

        {/* Factory Color Options — commented out for now per feedback; preserved for future re-implementation
        {!hasAuctionRecord && vehicle.colorOptions && vehicle.colorOptions.length > 0 && (
          <div className="w-full mt-4 pt-4 border-t border-[#E6E9E4] flex items-center flex-wrap gap-2">
            <span className="text-sm font-bold text-[#8A968F] uppercase tracking-wider shrink-0">Colors</span>
            <div className="flex flex-wrap gap-1.5">
              {vehicle.colorOptions.map((color) => (
                <span key={color.name} className="relative inline-flex shrink-0 group">
                  <span
                    className="w-4 h-4 rounded-full border border-[#E6E9E4] shadow-2xs cursor-default"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg bg-[#17211D] text-white text-sm leading-snug px-2.5 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50 pointer-events-none">
                    {color.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
        */}
      </motion.div>
    </section>
  );
};
