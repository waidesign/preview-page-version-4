import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, ArrowRight, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { VehiclePreview } from '../types';

export interface PurchaseLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: VehiclePreview;
  packageType: 'report' | 'sticker' | 'bundle';
  packageLabel: string;
  price: number;
  initialEmail?: string;
  onSubmit: (data: { email: string; phone?: string; packageType: string; price: number }) => void;
}

export const PurchaseLeadModal: React.FC<PurchaseLeadModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  packageType,
  packageLabel,
  price,
  initialEmail = '',
  onSubmit,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialEmail) setEmail(initialEmail);
      setEmailTouched(false);
      setIsSubmitting(false);
      const timer = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialEmail]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) {
      setEmailTouched(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit({
        email: email.trim(),
        phone: phone.trim() || undefined,
        packageType,
        price,
      });
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-[#17211D]/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Panel */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#FFFFFF] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.18)] border border-[#E6E9E4] overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-center justify-end px-5 pt-4 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8A968F] hover:bg-[#E6E9E4] hover:text-[#17211D] transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Vehicle & Selected Order Badge */}
          <div className="px-6 pt-1 pb-1">
            <div className="p-3 rounded-xl bg-[#F4F6F2] border border-[#E6E9E4] flex items-center justify-between gap-3 text-xs">
              <div className="min-w-0">
                <div className="font-bold text-[#17211D] truncate">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </div>
                <div className="text-[#8A968F] font-mono mt-0.5">
                  VIN: {vehicle.vin}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-heading font-bold text-sm text-[#013479]">
                  ${price.toFixed(2)}
                </div>
                <div className="text-[#4B5A54] font-medium text-[11px]">
                  {packageLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Modal body form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            {/* Email field */}
            <div>
              <label
                htmlFor="modal-delivery-email"
                className="block text-xs font-heading font-bold text-[#17211D] uppercase tracking-wider mb-1.5"
              >
                Delivery Email Address <span className="text-[#C2453B]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A968F]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  ref={inputRef}
                  id="modal-delivery-email"
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
                  Please enter a valid email address to receive your report.
                </p>
              )}
            </div>

            {/* Optional Phone field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="modal-delivery-phone"
                  className="block text-xs font-heading font-bold text-[#17211D] uppercase tracking-wider"
                >
                  Phone Number
                </label>
                <span className="text-[11px] text-[#8A968F] font-medium">
                  Optional (for SMS report link)
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A968F]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="modal-delivery-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7] text-sm text-[#17211D] placeholder-[#8A968F] focus:outline-none focus:bg-[#FFFFFF] focus:border-[#013479] focus:ring-2 focus:ring-[#013479]/15 transition-all"
                />
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-2 text-xs text-[#4B5A54] pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E8E5A] shrink-0" />
                <span>Instant PDF &amp; Web Link</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#013479] shrink-0" />
                <span>Official NMVTIS Data</span>
              </div>
            </div>

            {/* Submit Button to Proceed to Checkout */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 bg-[#013479] hover:bg-[#024EB6] text-white shadow-brand-glow hover:shadow-elevated transition-all cursor-pointer disabled:opacity-75"
            >
              <span>
                {isSubmitting ? 'Proceeding...' : `Continue to Secure Checkout — $${price.toFixed(2)}`}
              </span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>

            {/* Trust footer */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8A968F] pt-1">
              <Lock className="w-3 h-3 text-[#1E8E5A]" />
              <span>256-Bit SSL Encrypted • 100% Money-Back Guarantee</span>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
