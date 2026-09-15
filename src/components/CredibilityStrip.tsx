import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const FACTS = [
  { title: '55% Cheaper than Carfax', description: null },
  { title: 'Secure checkout', description: '256-bit encrypted payments' },
  { title: 'Downloadable PDF', description: 'Save or print anytime' },
  { title: 'Money-back guarantee', description: 'Full refund, no questions' },
];

const COMPARISON_FEATURES = [
  { label: 'Sales listing with photos', carfax: false, us: true },
  { label: 'Auction records with photos', carfax: false, us: true },
  { label: 'Market value data', carfax: true, us: true },
  { label: 'Detailed vehicle specifications', carfax: true, carfaxNote: '(Limited)', us: true },
  { label: 'Window stickers', carfax: false, us: true },
  { label: 'Support for classic vehicles', carfax: false, us: true },
  { label: 'Maintenance recommendation', carfax: true, us: true },
  { label: 'Ownership history', carfax: true, us: true },
  { label: 'Accident history', carfax: true, us: true },
  { label: 'Damage check', carfax: true, us: true },
  { label: 'Branded title check', carfax: true, us: true },
  { label: 'Salvage title check', carfax: true, us: true },
  { label: 'Ownership history map', carfax: false, us: true },
  { label: 'Recalls', carfax: true, us: true },
  { label: 'Supports for heavy duty trucks, ATVs, trailers & motorcycles', carfax: false, us: true },
  { label: 'Mobile & desktop applications', carfax: true, us: true },
];

export const CredibilityStrip: React.FC = () => {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section className="w-full py-6 sm:py-7 px-4 sm:px-6 border border-[#E6E9E4] bg-[#FFFFFF] rounded-2xl shadow-resting">
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left sm:text-center">
          {FACTS.map((fact) => (
            <div key={fact.title} className="flex flex-col items-start sm:items-center justify-start">
              <span className="font-heading font-bold text-sm text-[#17211D]">{fact.title}</span>
              {fact.description ? (
                <span className="text-sm text-[#4B5A54] mt-0.5 whitespace-nowrap">{fact.description}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowComparison(true)}
                  className="text-sm font-semibold text-[#013479] underline mt-0.5 whitespace-nowrap cursor-pointer"
                >
                  Compare us with Carfax
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Carfax comparison popup */}
      {showComparison && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17211D]/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowComparison(false)}
        >
          <div
            className="bg-[#FFFFFF] w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[#E6E9E4] shadow-2xl p-5 sm:p-6 pt-12 sm:pt-14 relative animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowComparison(false)}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#FAFAF7] border border-[#E6E9E4] flex items-center justify-center text-[#4B5A54] hover:text-[#17211D] cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Carfax column */}
              <div className="order-2 sm:order-1 bg-[#FFFFFF] border border-[#E6E9E4] rounded-2xl p-5 sm:p-6">
                <div className="text-center mb-5">
                  <h3 className="font-heading font-bold text-lg text-[#17211D]">Carfax</h3>
                  <div className="text-3xl font-bold text-[#17211D] mt-2">$44.99</div>
                  <div className="text-sm text-[#4B5A54] mt-0.5">Single Report</div>
                </div>
                <ul className="space-y-2.5">
                  {COMPARISON_FEATURES.map((f) => (
                    <li key={f.label} className="flex items-start gap-2 text-sm text-[#17211D]">
                      {f.carfax ? (
                        <Check className="w-4 h-4 text-[#013479] shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-[#C2453B] shrink-0 mt-0.5" />
                      )}
                      <span className={f.carfax && f.carfaxNote ? 'text-[#C97A12]' : ''}>
                        {f.label}
                        {f.carfax && f.carfaxNote && <span> {f.carfaxNote}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Us column */}
              <div className="order-1 sm:order-2 bg-[#E3ECF9] border border-[#024EB6]/40 rounded-2xl p-5 sm:p-6 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#013479] text-white text-sm font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Best Value
                </span>
                <div className="text-center mb-5">
                  <h3 className="font-heading font-bold text-lg text-[#013479]">Our Vehicle History Report</h3>
                  <div className="text-3xl font-bold text-[#013479] mt-2">$19.99</div>
                  <div className="text-sm text-[#024EB6] mt-0.5 font-semibold">Single Report</div>
                </div>
                <ul className="space-y-2.5">
                  {COMPARISON_FEATURES.map((f) => (
                    <li key={f.label} className="flex items-start gap-2 text-sm text-[#17211D]">
                      <Check className="w-4 h-4 text-[#013479] shrink-0 mt-0.5" />
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
