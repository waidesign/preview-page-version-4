import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Wrench, ArrowRight, Mail, X, Lock, HelpCircle, Search, Cpu, FileText, Bookmark, TrendingUp, ShieldCheck, Phone } from 'lucide-react';
import { VehiclePreview } from '../../types';
import { UserIntent } from '../../types/onboarding';

interface Screen3GarageGateProps {
  vehicle: VehiclePreview;
  userIntent: UserIntent | null;
  savedEmail: string;
  onSaveToGarage: (email: string) => void;
  onSkip: () => void;
}

export const Screen3GarageGate: React.FC<Screen3GarageGateProps> = ({
  vehicle,
  userIntent,
  savedEmail,
  onSaveToGarage,
  onSkip,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [email, setEmail] = useState(savedEmail || '');
  const [phone, setPhone] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus email input when modal opens
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
        setShowInfoModal(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const getCopyForIntent = () => {
    switch (userIntent) {
      case 'owner':
        return {
          eyebrow: 'Vehicle Ownership Tracking',
          headline: 'Track recalls and maintenance for your vehicle, free.',
          supporting: 'Save this car to your private Garage to monitor safety updates, recall notices, and service intervals directly.',
        };
      case 'seller':
        return {
          eyebrow: 'Listing Support & Records',
          headline: 'Save this car here while you sell it.',
          supporting: 'Keep factory specs and recall clearances accessible in one place to share with prospective buyers anytime.',
        };
      case 'buyer':
        return {
          eyebrow: 'Buyer Decision Support',
          headline: 'Save this car here while you decide.',
          supporting: 'Bookmark this vehicle and keep all safety recall checks and maintenance schedules on hand while shopping.',
        };
      case 'just_checking':
      default:
        return {
          eyebrow: 'Vehicle Bookmarking',
          headline: 'Save this car for later, free.',
          supporting: 'Bookmark this vehicle to access safety recall checks and maintenance schedules anytime without searching again.',
        };
    }
  };

  const copy = getCopyForIntent();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isHighConversionSegment = userIntent === 'buyer' || userIntent === 'seller';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) {
      setShowModal(false);
      onSaveToGarage(email.trim());
    } else {
      setEmailTouched(true);
    }
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center mb-6"
          >
            <span className="inline-block text-xs font-mono font-semibold tracking-wider text-[#013479] uppercase mb-2 bg-[#E3ECF9] px-3 py-1 rounded-full border border-[#013479]/15">
              {copy.eyebrow}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#17211D] tracking-tight max-w-lg mx-auto">
              {copy.headline}
            </h1>
            <p className="text-sm sm:text-base text-[#4B5A54] mt-2 max-w-md mx-auto">
              {copy.supporting}
            </p>
          </motion.div>

          {/* Value Cards */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="bg-[#FFFFFF] rounded-2xl border border-[#E6E9E4] p-6 sm:p-8 shadow-elevated mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Card 1: Safety Recalls */}
              <div className="rounded-xl border border-[#1E8E5A]/30 bg-[#FFFFFF] p-5 flex flex-col gap-3 shadow-resting">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E3F2EC] text-[#1E8E5A] flex items-center justify-center shrink-0 border border-[#1E8E5A]/20">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-[#17211D] leading-tight">
                      Safety Recalls & NHTSA Alerts
                    </div>
                    <div className="text-[10px] font-mono font-semibold text-[#8A968F] uppercase tracking-wider mt-0.5">
                      Automatic Manufacturer Recall Monitoring
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#E6E9E4]" />
                <p className="text-xs text-[#4B5A54] leading-relaxed">
                  <span className="font-semibold text-[#1E8E5A]">0 open recalls found</span>
                  {' '}— Save to My Garage to receive real-time push/email safety alerts.
                </p>
              </div>

              {/* Card 2: Maintenance Schedule */}
              <div className="rounded-xl border border-[#E6E9E4] bg-[#FFFFFF] p-5 flex flex-col gap-3 shadow-resting">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E3F2EC] text-[#1E8E5A] flex items-center justify-center shrink-0 border border-[#1E8E5A]/20">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-[#17211D] leading-tight">
                      Factory Maintenance Schedule
                    </div>
                    <div className="text-[10px] font-mono font-semibold text-[#8A968F] uppercase tracking-wider mt-0.5">
                      Milestone Service Logs & Reminders
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#E6E9E4]" />
                <p className="text-xs text-[#4B5A54] leading-relaxed">
                  Next service due:{' '}
                  <span className="font-semibold text-[#B45309]">
                    Serpentine Belt & Water Pump Inspection at 150,000 mi.
                  </span>
                </p>
              </div>
            </div>

            {/* Promotional Banner Card */}
            <div className="mt-8 rounded-2xl border border-[#E6E9E4] bg-[#FAFAF7]/60 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 shadow-xs">
              {/* Left: Tilted/Perspective App Mockup Preview */}
              <div className="shrink-0 w-36 sm:w-44 [perspective:800px] flex justify-center">
                <img
                  src="/garage-app-mockup.jpg"
                  alt="Garage dashboard preview"
                  className="w-full h-auto rounded-lg shadow-md border border-[#E6E9E4] transform [transform:rotateY(-12deg)_rotateX(4deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)] transition-transform duration-300 object-cover"
                />
              </div>

              {/* Right: Content & Action */}
              <div className="flex-1 flex flex-col items-start sm:items-start text-left">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-base sm:text-lg font-heading font-semibold text-[#17211D]">
                    See full vehicle specifications <span className="font-bold text-[#013479]">FREE</span> in My Garage
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowInfoModal(true)}
                    className="text-[#013479] hover:text-[#024EB6] transition-colors p-0.5 rounded-full inline-flex items-center cursor-pointer"
                    title="Learn more about My Garage specifications"
                    aria-label="More information"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="text-sm font-bold text-[#FFFFFF] bg-[#013479] hover:bg-[#024EB6] border border-[#013479] px-6 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:opacity-90"
                  >
                    Save car to Garage
                  </button>
                </div>

                <p className="text-xs text-[#8A968F] mt-2.5">
                  No credit card required, FREE forever
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skip link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-center"
          >
            <button
              type="button"
              onClick={onSkip}
              className={`cursor-pointer transition-colors inline-flex items-center gap-1 ${
                isHighConversionSegment
                  ? 'text-sm font-semibold text-[#17211D] hover:text-[#013479] underline decoration-[#8A968F]/60 underline-offset-4 py-2 px-3 rounded-lg hover:bg-[#FAFAF7]'
                  : 'text-xs text-[#4B5A54] hover:text-[#17211D] underline decoration-[#8A968F]/40 underline-offset-2 py-1 px-2'
              }`}
            >
              <span>Skip &amp; View Vehicle Preview</span>
              <span className="text-[#8A968F]">&rarr;</span>
            </button>

          </motion.div>
        </div>
      </div>

      {/* ── Sign-Up Modal ── */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#17211D]/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Modal Panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-md bg-[#FFFFFF] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.18)] border border-[#E6E9E4] overflow-hidden">
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#E6E9E4]">
                  <div>
                    <h2 className="text-lg font-heading font-bold text-[#17211D]">
                      Save to My Garage
                    </h2>
                    <p className="text-xs text-[#4B5A54] mt-0.5">
                      Free — no credit card, no password required
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8A968F] hover:bg-[#F4F5F2] hover:text-[#17211D] transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal body */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="modal-garage-email"
                      className="block text-xs font-heading font-bold text-[#17211D] uppercase tracking-wider mb-1.5"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A968F]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        ref={inputRef}
                        id="modal-garage-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailTouched) setEmailTouched(false);
                        }}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-[#FAFAF7] text-sm text-[#17211D] placeholder-[#8A968F] focus:outline-none focus:bg-[#FFFFFF] transition-all ${
                          emailTouched && !isValidEmail
                            ? 'border-[#C2453B] focus:border-[#C2453B] ring-2 ring-[#C2453B]/20'
                            : 'border-[#E6E9E4] focus:border-[#013479] focus:ring-2 focus:ring-[#013479]/15'
                        }`}
                      />
                    </div>
                    {emailTouched && !isValidEmail && (
                      <p className="text-xs text-[#C2453B] mt-1.5 font-medium">
                        Please enter a valid email address.
                      </p>
                    )}
                  </div>

                  {/* Phone number field */}
                  <div>
                    <label
                      htmlFor="modal-garage-phone"
                      className="block text-xs font-heading font-bold text-[#17211D] uppercase tracking-wider mb-1.5"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A968F]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="modal-garage-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7] text-sm text-[#17211D] placeholder-[#8A968F] focus:outline-none focus:bg-[#FFFFFF] focus:border-[#013479] focus:ring-2 focus:ring-[#013479]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 bg-[#013479] hover:bg-[#024EB6] text-white shadow-brand-glow hover:shadow-elevated transition-all cursor-pointer"
                  >
                    <span>Save &amp; View Vehicle Preview</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-xs text-[#4B5A54] leading-relaxed text-center">
                    By clicking &quot;Save &amp; View Vehicle Preview&quot;, you are confirming that you have read and agree to our Detailed Vehicle History&apos;s{' '}
                    <a href="#" className="text-[#013479] font-semibold hover:underline">
                      Terms and Conditions
                    </a>{' '}
                    &amp;{' '}
                    <a href="#" className="text-[#013479] font-semibold hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Garage Info / Promotional Modal ── */}
      <AnimatePresence>
        {showInfoModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="info-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-[#17211D]/60 backdrop-blur-sm"
              onClick={() => setShowInfoModal(false)}
            />

            {/* Modal Panel */}
            <motion.div
              key="info-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <div
                className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.22)] border border-[#E6E9E4] p-6 sm:p-10 my-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowInfoModal(false)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center text-[#8A968F] hover:bg-[#F4F5F2] hover:text-[#17211D] transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="max-w-2xl pr-8">
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D] tracking-tight">
                    One garage for every car in your life
                  </h2>
                  <p className="text-sm sm:text-base text-[#4B5A54] mt-2.5 leading-relaxed">
                    Stop losing track of specs, recalls, and maintenance. When you save your{' '}
                    <span className="font-semibold text-[#17211D]">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </span>
                    , we build its permanent digital binder so you can access everything in seconds.
                  </p>
                </div>

                {/* Main Content Grid: Image Preview + Feature Pills */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Dashboard Preview with perspective tilt */}
                  <div className="lg:col-span-5 flex justify-center [perspective:1000px]">
                    <img
                      src="/garage-app-mockup.jpg"
                      alt="My Garage Dashboard Preview"
                      className="w-full max-w-sm sm:max-w-md h-auto rounded-xl shadow-lg border border-[#E6E9E4] transform [transform:rotateY(-10deg)_rotateX(3deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)] transition-transform duration-300 object-cover"
                    />
                  </div>

                  {/* Right Column: 8 Feature Cards (2 columns x 4 rows) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Item 1 */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0">
                        <Search className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-medium text-[#17211D] leading-snug">
                        Unlimited VIN &amp; plate lookups
                      </span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0">
                        <Bookmark className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-medium text-[#17211D] leading-snug">
                        Save vehicles permanently to My Garage
                      </span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-medium text-[#17211D] leading-snug">
                        Complete technical decode data &amp; specs
                      </span>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-medium text-[#17211D] leading-snug">
                        Automatic safety recall alerts
                      </span>
                    </div>

                    {/* Item 5 */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-medium text-[#17211D] leading-snug">
                        Recommended maintenance schedule tracking
                      </span>
                    </div>

                    {/* Item 6 */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-medium text-[#17211D] leading-snug">
                        Live market value monitoring &amp; depreciation
                      </span>
                    </div>

                    {/* Item 7 */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-medium text-[#17211D] leading-snug">
                        Original window stickers when available
                      </span>
                    </div>

                    {/* Item 8 */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7]/70">
                      <div className="w-8 h-8 rounded-lg bg-[#E3ECF9] text-[#013479] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-medium text-[#17211D] leading-snug">
                        Full history reports accessible anytime
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer / CTA Bar */}
                <div className="mt-8 pt-6 border-t border-[#E6E9E4] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInfoModal(false);
                      setShowModal(true);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-heading font-bold text-sm bg-[#013479] hover:bg-[#024EB6] text-white shadow-sm transition-all cursor-pointer text-center"
                  >
                    Create Free Garage Account
                  </button>

                  <div className="text-xs font-mono text-[#8A968F] flex items-center gap-2">
                    <span>Free forever</span>
                    <span>•</span>
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
