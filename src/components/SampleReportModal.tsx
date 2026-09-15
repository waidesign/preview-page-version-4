import React from 'react';
import { X, FileText, CheckCircle2, Shield, Calendar, MapPin, Gauge } from 'lucide-react';

interface SampleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleReportModal: React.FC<SampleReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17211D]/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#FFFFFF] w-full max-w-2xl rounded-2xl border border-[#E6E9E4] shadow-2xl overflow-hidden relative max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#FAFAF7] border-b border-[#E6E9E4] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#013479] text-[#FFFFFF]">
              <FileText className="w-4 h-4 text-[#F9AD24]" />
            </div>
            <div>
              <div className="text-sm font-mono font-bold text-[#013479] uppercase">
                SAMPLE VEHICLE HISTORY REPORT
              </div>
              <div className="text-sm font-heading font-bold text-[#17211D]">
                2012 Subaru Forester 2.5X Premium
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#E6E9E4] flex items-center justify-center text-[#4B5A54] hover:text-[#17211D] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Report Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-[#17211D]">
          
          {/* Status summary banner */}
          <div className="bg-[#E3ECF9] p-3.5 rounded-xl border border-[#024EB6]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#013479]" />
              <span className="font-semibold text-sm text-[#013479]">
                Clean Title Verified • 0 Salvage/Junk Brands Identified
              </span>
            </div>
            <span className="font-mono text-sm text-[#024EB6]">NHTSA &amp; State DMV Record</span>
          </div>

          {/* Report Sections */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#FAFAF7] p-3 rounded-lg border border-[#E6E9E4]">
              <div className="text-sm font-mono text-[#8A968F]">OWNERS</div>
              <div className="font-bold text-sm text-[#17211D]">2 Previous</div>
            </div>
            <div className="bg-[#FAFAF7] p-3 rounded-lg border border-[#E6E9E4]">
              <div className="text-sm font-mono text-[#8A968F]">LAST ODOMETER</div>
              <div className="font-bold text-sm text-[#17211D]">87,420 mi</div>
            </div>
            <div className="bg-[#FAFAF7] p-3 rounded-lg border border-[#E6E9E4]">
              <div className="text-sm font-mono text-[#8A968F]">ACCIDENTS</div>
              <div className="font-bold text-sm text-[#013479]">0 Reported</div>
            </div>
            <div className="bg-[#FAFAF7] p-3 rounded-lg border border-[#E6E9E4]">
              <div className="text-sm font-mono text-[#8A968F]">AIRBAG DEPLOY</div>
              <div className="font-bold text-sm text-[#013479]">None</div>
            </div>
          </div>

          {/* Historical timeline preview */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#17211D] mb-3">
              Detailed History Events (11 Records)
            </h4>
            <div className="space-y-2 border-l-2 border-[#E3ECF9] ml-2 pl-4">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#013479]"></div>
                <div className="font-mono text-sm text-[#8A968F]">05/14/2024 • Sacramento, CA</div>
                <div className="font-semibold text-sm">Annual Vehicle Inspection Passed</div>
                <div className="text-sm text-[#4B5A54]">Odometer reading reported: 87,420 miles. Emissions certified.</div>
              </div>

              <div className="relative pt-2">
                <div className="absolute -left-[21px] top-3 w-2.5 h-2.5 rounded-full bg-[#013479]"></div>
                <div className="font-mono text-sm text-[#8A968F]">02/10/2021 • Oakland, CA</div>
                <div className="font-semibold text-sm">Title Issued (Owner 2)</div>
                <div className="text-sm text-[#4B5A54]">Registration updated, lienholder reported cleared.</div>
              </div>

              <div className="relative pt-2">
                <div className="absolute -left-[21px] top-3 w-2.5 h-2.5 rounded-full bg-[#013479]"></div>
                <div className="font-mono text-sm text-[#8A968F]">08/19/2012 • San Francisco, CA</div>
                <div className="font-semibold text-sm">First Title &amp; Registration Issued</div>
                <div className="text-sm text-[#4B5A54]">Purchased as new personal vehicle.</div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#FAFAF7] rounded-xl border border-[#E6E9E4] text-sm text-[#4B5A54]">
            Note: Free My Garage membership provides full specifications, open recall alerts, and market value tracking for every car in your garage. Full individual history reports like this sample are optionally purchasable inside your dashboard for $9.99 with no subscription commitments.
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAFAF7] border-t border-[#E6E9E4] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-[#013479] hover:bg-[#024EB6] text-[#FFFFFF] text-sm font-semibold px-5 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
