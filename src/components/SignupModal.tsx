import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, ArrowRight, Check } from 'lucide-react';
import { VehiclePreview } from '../types';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: VehiclePreview;
  onSuccess: (email: string) => void;
  initialMode?: 'signup' | 'signin';
}

export const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  onSuccess,
  initialMode = 'signup',
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setEmailTouched(false);
      setIsSuccess(false);
      setIsSubmitting(false);
      const timer = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess(email.trim());
        setIsSuccess(false);
        onClose();
      }, 900);
    }, 500);
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
          className="relative w-full max-w-md bg-[#FFFFFF] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.18)] border border-[#E6E9E4] overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {isSuccess ? (
            <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-14 h-14 rounded-full bg-[#E3F2EC] flex items-center justify-center text-[#1E8E5A] mb-3 animate-bounce">
                <Check className="w-7 h-7 text-[#1E8E5A]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#17211D] mb-1">
                Saved to Your Garage!
              </h3>
              <p className="text-xs font-mono text-[#013479] bg-[#E3ECF9] px-3 py-1 rounded-md mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
              <p className="text-xs text-[#4B5A54] max-w-xs">
                Your vehicle has been successfully saved to your free Garage binder.
              </p>
            </div>
          ) : (
            <>
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#E6E9E4]">
                <div>
                  <h2 className="text-lg font-heading font-bold text-[#17211D]">
                    {initialMode === 'signin' ? 'Log in to My Garage' : 'Save to My Garage'}
                  </h2>
                  <p className="text-xs text-[#4B5A54] mt-0.5">
                    Free — no credit card, no password required
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
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
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 bg-[#013479] hover:bg-[#024EB6] text-white shadow-brand-glow hover:shadow-elevated transition-all cursor-pointer disabled:opacity-75"
                >
                  <span>
                    {isSubmitting
                      ? 'Saving...'
                      : initialMode === 'signin'
                      ? 'Log in to Garage'
                      : 'Save & View Vehicle Preview'}
                  </span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
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
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
