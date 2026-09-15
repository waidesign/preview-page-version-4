import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  Mail,
  ArrowRight,
  Sparkles,
  Download,
} from 'lucide-react';
import { VehiclePreview } from '../../types';
import { CheckoutSelection } from '../../types/onboarding';

interface Screen5CheckoutProps {
  vehicle: VehiclePreview;
  checkoutSelection: CheckoutSelection;
  prefilledEmail: string;
  onCompleteCheckout: () => void;
}

export const Screen5Checkout: React.FC<Screen5CheckoutProps> = ({
  vehicle,
  checkoutSelection,
  prefilledEmail,
  onCompleteCheckout,
}) => {
  const [email, setEmail] = useState(prefilledEmail || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      onCompleteCheckout();
    }, 1200);
  };

  if (isComplete) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-[#FFFFFF] rounded-2xl border border-[#E6E9E4] p-8 shadow-elevated"
        >
          <div className="w-16 h-16 rounded-full bg-[#E3F2EC] text-[#1E8E5A] flex items-center justify-center mx-auto mb-4 border border-[#1E8E5A]/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-[#17211D]">
            Order Confirmed!
          </h2>
          <p className="text-sm text-[#4B5A54] mt-2">
            Your official report for the <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong> has been generated.
          </p>

          <div className="my-6 p-4 rounded-xl bg-[#FAFAF7] border border-[#E6E9E4] text-left text-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-[#8A968F]">Delivered to:</span>
              <span className="text-[#17211D] font-bold">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A968F]">VIN:</span>
              <span className="text-[#17211D] font-bold">{vehicle.vin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A968F]">Package:</span>
              <span className="text-[#17211D] font-bold">
                {checkoutSelection.includeSticker ? 'History Report + Window Sticker' : 'History Report'}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#E6E9E4] pt-1 mt-1">
              <span className="text-[#8A968F]">Amount Paid:</span>
              <span className="text-[#1E8E5A] font-bold">${checkoutSelection.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-full bg-[#013479] hover:bg-[#024EB6] text-white font-heading font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-brand-glow"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF Report</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E3F2EC] text-[#1E8E5A] border border-[#1E8E5A]/20 mb-2">
            <Lock className="w-3.5 h-3.5 text-[#1E8E5A]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D] tracking-tight">
            Complete Your Order
          </h1>
          <p className="text-sm text-[#4B5A54] mt-1.5">
            Review and finalize delivery of your vehicle records
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Payment Form (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="md:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E6E9E4] p-5 sm:p-6 shadow-elevated"
        >
          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label
                htmlFor="checkout-delivery-email"
                className="block text-xs font-heading font-bold text-[#17211D] uppercase tracking-wider mb-1"
              >
                Delivery Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A968F]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="checkout-delivery-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7] text-sm text-[#17211D] focus:outline-none focus:border-[#013479] focus:bg-[#FFFFFF]"
                />
              </div>
              {prefilledEmail && (
                <span className="text-xs text-[#1E8E5A] font-medium mt-1 inline-block">
                  ✓ Pre-filled from your Garage save
                </span>
              )}
            </div>

            <div className="pt-2 border-t border-[#E6E9E4]">
              <label
                htmlFor="checkout-card-num"
                className="block text-xs font-heading font-bold text-[#17211D] uppercase tracking-wider mb-1"
              >
                Card Information
              </label>
              <div className="relative mb-2.5">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A968F]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <input
                  id="checkout-card-num"
                  type="text"
                  placeholder="4000 1234 5678 9010"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7] text-sm text-[#17211D] font-mono focus:outline-none focus:border-[#013479]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <input
                    id="checkout-card-exp"
                    type="text"
                    placeholder="MM / YY"
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7] text-sm text-[#17211D] font-mono focus:outline-none focus:border-[#013479]"
                  />
                </div>
                <div>
                  <input
                    id="checkout-card-cvc"
                    type="text"
                    placeholder="CVC"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7] text-sm text-[#17211D] font-mono focus:outline-none focus:border-[#013479]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !isEmailValid}
              className="w-full mt-4 bg-[#013479] hover:bg-[#024EB6] text-white font-heading font-bold text-base py-3.5 px-6 rounded-xl shadow-brand-glow hover:shadow-elevated transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-[#E6E9E4] disabled:text-[#8A968F]"
            >
              {isProcessing ? (
                <span>Generating Official Report...</span>
              ) : (
                <>
                  <span>Pay ${checkoutSelection.totalPrice.toFixed(2)} & Unlock</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Right: Order Summary (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="md:col-span-5 bg-[#FAFAF7] rounded-2xl border border-[#E6E9E4] p-5 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-heading font-bold text-sm text-[#17211D] uppercase tracking-wider mb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-[#4B5A54] pb-3 border-b border-[#E6E9E4]">
              <div className="flex justify-between font-medium">
                <span>Vehicle:</span>
                <span className="text-[#17211D] font-bold text-right">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </span>
              </div>
              <div className="flex justify-between font-mono">
                <span>VIN:</span>
                <span className="text-[#17211D]">{vehicle.vin}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Vehicle History Report:</span>
                <span className="text-[#17211D] font-bold">$19.99</span>
              </div>
              {checkoutSelection.includeSticker && (
                <div className="flex justify-between">
                  <span>Factory Window Sticker:</span>
                  <span className="text-[#17211D] font-bold">$9.99</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center py-3 border-b border-[#E6E9E4]">
              <span className="text-sm font-heading font-bold text-[#17211D]">
                Total:
              </span>
              <span className="text-xl font-heading font-extrabold text-[#013479]">
                ${checkoutSelection.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-2 text-xs text-[#8A968F] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#1E8E5A]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-medium">100% money-back accuracy guarantee</span>
            </div>
            <p>Immediate digital PDF delivery to your inbox upon purchase.</p>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};
