import React, { useState } from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface FooterProps {
  onOpenSampleReport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSampleReport }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E6E9E4] py-3.5 sm:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          {/* Left: Branding & Copyright */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-[#4B5A54]">
            <span className="font-heading font-extrabold text-[#17211D] tracking-wide">
              MY GARAGE
            </span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex items-center justify-center gap-5 sm:gap-6 text-xs sm:text-sm font-medium">
            <button
              type="button"
              onClick={() => {
                if (onOpenSampleReport) {
                  onOpenSampleReport();
                } else {
                  window.open('https://detailedvehiclehistory.com/report/vin/3FA6P0RU9HR306143', '_blank');
                }
              }}
              className="text-[#013479] hover:text-[#024EB6] hover:underline cursor-pointer transition-colors"
            >
              Sample Report
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="text-[#013479] hover:text-[#024EB6] hover:underline cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="text-[#013479] hover:text-[#024EB6] hover:underline cursor-pointer transition-colors"
            >
              Terms of Service
            </button>
          </div>

        </div>
      </footer>

      {/* Privacy Policy / Terms Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17211D]/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-[#FFFFFF] w-full max-w-2xl max-h-[85vh] rounded-2xl border border-[#E6E9E4] shadow-2xl p-6 sm:p-8 relative flex flex-col animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E6E9E4]">
              <div className="flex items-center gap-2.5">
                {legalModal === 'privacy' ? (
                  <Shield className="w-5 h-5 text-[#013479]" />
                ) : (
                  <FileText className="w-5 h-5 text-[#013479]" />
                )}
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#17211D]">
                  {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h3>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-[#FAFAF7] border border-[#E6E9E4] flex items-center justify-center text-[#4B5A54] hover:text-[#17211D] cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-sm text-[#4B5A54] leading-relaxed space-y-4 overflow-y-auto pr-2">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Your privacy is critically important to us. We collect vehicle identification data, search queries, and contact details strictly to generate comprehensive history reports, window stickers, and maintenance alerts.
                  </p>
                  <h4 className="font-bold text-[#17211D] text-sm">Data Security</h4>
                  <p>
                    All report requests and financial transactions are encrypted via 256-bit SSL encryption. We do not sell or lease your personal contact information to third-party marketing networks.
                  </p>
                  <h4 className="font-bold text-[#17211D] text-sm">NMVTIS &amp; Public Records Compliance</h4>
                  <p>
                    Vehicle data is aggregated in compliance with the Federal Driver Privacy Protection Act (DPPA) and official NMVTIS reporting requirements.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    By using this vehicle lookup and history service, you acknowledge that all automotive data is aggregated from federal, state, and private auction sources.
                  </p>
                  <h4 className="font-bold text-[#17211D] text-sm">Report Accuracy &amp; Disclaimer</h4>
                  <p>
                    While we strive for 100% accuracy using national databases (NMVTIS, NHTSA, insurance audits), reports represent historical data available at the time of query.
                  </p>
                  <h4 className="font-bold text-[#17211D] text-sm">Refund Policy</h4>
                  <p>
                    If a purchased vehicle history report fails to generate or deliver due to a system error, our support team will issue an immediate refund or replacement report.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-[#E6E9E4] flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="bg-[#013479] hover:bg-[#024EB6] text-white font-bold text-sm px-5 py-2.5 rounded-xl border border-[#013479] shadow-2xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
