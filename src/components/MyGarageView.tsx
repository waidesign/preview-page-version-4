import React, { useState } from 'react';
import { 
  Car, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  Wrench, 
  ShieldCheck, 
  FileText, 
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { VehiclePreview, SavedGarageVehicle } from '../types';

interface MyGarageViewProps {
  savedVehicles: VehiclePreview[];
  onBackToPreview: () => void;
  onRemoveVehicle: (id: string) => void;
  onSelectVehicle: (vehicle: VehiclePreview) => void;
  userEmail?: string;
  onOpenSampleReport: () => void;
  isLoggedIn?: boolean;
  onOpenSignup?: () => void;
  onOpenLogin?: () => void;
}

export const MyGarageView: React.FC<MyGarageViewProps> = ({
  savedVehicles,
  onBackToPreview,
  onRemoveVehicle,
  onSelectVehicle,
  userEmail = 'driver@mygarage.app',
  onOpenSampleReport,
  isLoggedIn = false,
  onOpenSignup,
  onOpenLogin,
}) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'recalls' | 'value' | 'maintenance'>('vehicles');
  const [copiedVin, setCopiedVin] = useState<string | null>(null);

  const handleCopyVin = (vin: string) => {
    navigator.clipboard.writeText(vin);
    setCopiedVin(vin);
    setTimeout(() => setCopiedVin(null), 2000);
  };

  // If user doesn't have an account / isn't logged in, demand signup first to see data in Garage
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] text-[#17211D] flex flex-col font-sans">
        {/* Navigation Bar */}
        <header className="bg-[#FFFFFF] border-b border-[#E6E9E4] sticky top-0 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={onBackToPreview}
              className="p-1.5 px-3 rounded-xl border border-[#E6E9E4] bg-[#FAFAF7] hover:bg-[#FFFFFF] text-[#4B5A54] hover:text-[#013479] transition-all cursor-pointer flex items-center gap-1.5 text-sm font-semibold shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 text-[#013479]" />
              <span>Back to VIN Decoder</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#013479] flex items-center justify-center text-[#F9AD24] shadow-brand-glow">
                <Car className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-base text-[#17211D]">MY GARAGE</span>
            </div>
          </div>
        </header>

        {/* Lock Screen Body */}
        <main className="flex-1 max-w-xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E6E9E4] shadow-elevated animate-fade-in relative overflow-hidden w-full">
            
            {/* Top Badge Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#E3ECF9] text-[#013479] flex items-center justify-center mx-auto mb-4 border border-[#024EB6]/30 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#013479]" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-sm font-mono font-bold bg-[#F9AD24]/20 text-[#013479] mb-3">
              ACCOUNT REQUIRED FOR GARAGE ACCESS
            </span>

            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D] mb-2">
              Sign up first to view Garage data
            </h1>

            <p className="text-sm text-[#4B5A54] leading-relaxed mb-6">
              To keep your vehicle specifications, open recall alerts, factory maintenance logs, and market values secure, please sign up or log in to your account.
            </p>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={onOpenSignup}
                className="w-full bg-[#013479] hover:bg-[#024EB6] text-[#FFFFFF] font-bold text-sm py-3.5 px-6 rounded-xl shadow-brand-glow transition-all cursor-pointer flex items-center justify-center gap-2 active:opacity-90"
              >
                <Car className="w-4 h-4 text-[#F9AD24]" />
                <span>Sign Up Free to Unlock Garage ({savedVehicles.length})</span>
              </button>

              <button
                onClick={onOpenLogin}
                className="w-full bg-[#FAFAF7] hover:bg-[#E6E9E4] text-[#17211D] font-semibold text-sm py-2.5 px-4 rounded-xl border border-[#E6E9E4] transition-all cursor-pointer"
              >
                Already have an account? Log In
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E6E9E4] text-sm text-[#8A968F] font-medium flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#013479]" />
              <span>Instant free access • No credit card required</span>
            </div>

          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#17211D]">
      
      {/* Dashboard Top Header */}
      <header className="bg-[#FFFFFF] border-b border-[#E6E9E4] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPreview}
              className="p-1.5 rounded-lg border border-[#E6E9E4] bg-[#FAFAF7] hover:bg-[#FFFFFF] text-[#4B5A54] hover:text-[#013479] transition-colors cursor-pointer flex items-center gap-1.5 text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Decoder</span>
            </button>
            <div className="h-5 w-[1px] bg-[#E6E9E4] hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#013479] flex items-center justify-center text-[#F9AD24]">
                <Car className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-base text-[#17211D]">
                MY GARAGE DASHBOARD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-sm font-mono text-[#4B5A54] bg-[#FAFAF7] px-2.5 py-1 rounded-md border border-[#E6E9E4]">
              {userEmail}
            </span>
            <span className="text-sm font-mono font-bold text-[#013479] bg-[#E3ECF9] px-2.5 py-1 rounded-md">
              {savedVehicles.length} Vehicle{savedVehicles.length !== 1 ? 's' : ''} Parked
            </span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Banner */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6E9E4] p-6 mb-8 shadow-resting flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-mono font-semibold bg-[#E3ECF9] text-[#013479] mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#013479]" />
              <span>FREE PERMANENT GARAGE MEMBERSHIP</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D]">
              Your Personal Vehicle Digital Binder
            </h1>
            <p className="text-sm text-[#4B5A54] mt-1 max-w-2xl">
              All specs, recall monitors, maintenance logs, and value estimates for your parked vehicles are synced and monitored in real time.
            </p>
          </div>

          <button
            onClick={onBackToPreview}
            className="bg-[#013479] hover:bg-[#024EB6] text-[#FFFFFF] font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Decode &amp; Park Another Car</span>
          </button>
        </div>

        {/* Dashboard View Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E6E9E4] mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-4 py-2 text-sm font-heading font-bold rounded-t-lg transition-colors cursor-pointer border-b-2 ${
              activeTab === 'vehicles'
                ? 'border-[#013479] text-[#013479] bg-[#FFFFFF]'
                : 'border-transparent text-[#4B5A54] hover:text-[#17211D]'
            }`}
          >
            Parked Vehicles ({savedVehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('recalls')}
            className={`px-4 py-2 text-sm font-heading font-bold rounded-t-lg transition-colors cursor-pointer border-b-2 ${
              activeTab === 'recalls'
                ? 'border-[#013479] text-[#013479] bg-[#FFFFFF]'
                : 'border-transparent text-[#4B5A54] hover:text-[#17211D]'
            }`}
          >
            NHTSA Recall Alerts
          </button>
          <button
            onClick={() => setActiveTab('value')}
            className={`px-4 py-2 text-sm font-heading font-bold rounded-t-lg transition-colors cursor-pointer border-b-2 ${
              activeTab === 'value'
                ? 'border-[#013479] text-[#013479] bg-[#FFFFFF]'
                : 'border-transparent text-[#4B5A54] hover:text-[#17211D]'
            }`}
          >
            Market Value Tracker
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2 text-sm font-heading font-bold rounded-t-lg transition-colors cursor-pointer border-b-2 ${
              activeTab === 'maintenance'
                ? 'border-[#013479] text-[#013479] bg-[#FFFFFF]'
                : 'border-transparent text-[#4B5A54] hover:text-[#17211D]'
            }`}
          >
            Factory Maintenance Log
          </button>
        </div>

        {/* TAB 1: Parked Vehicles Grid */}
        {activeTab === 'vehicles' && (
          <div>
            {savedVehicles.length === 0 ? (
              <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E9E4] p-12 text-center max-w-md mx-auto">
                <Car className="w-12 h-12 text-[#8A968F] mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-[#17211D]">Your Garage is Empty</h3>
                <p className="text-sm text-[#4B5A54] mt-1 mb-4">
                  Decode any VIN or license plate to save your first vehicle.
                </p>
                <button
                  onClick={onBackToPreview}
                  className="bg-[#013479] text-white text-sm font-semibold px-4 py-2 rounded-lg"
                >
                  Decode a Vehicle Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedVehicles.map((v) => (
                  <div
                    key={v.id}
                    className="bg-[#FFFFFF] rounded-xl border border-[#E6E9E4] overflow-hidden shadow-resting hover:shadow-elevated transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Header Image */}
                      <div className="h-40 bg-[#FAFAF7] border-b border-[#E6E9E4] relative overflow-hidden flex items-center justify-center p-2">
                        {v.photoUrl ? (
                          <img
                            src={v.photoUrl}
                            alt={v.fullName}
                            className="w-full h-full object-cover rounded-md"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <Car className="w-12 h-12 text-[#8A968F]" />
                        )}

                        <div className="absolute top-2 left-2 bg-[#FFFFFF]/90 backdrop-blur-sm px-2 py-0.5 rounded text-sm font-mono font-bold text-[#013479] border border-[#E6E9E4]">
                          PARKED
                        </div>

                        <button
                          onClick={() => onRemoveVehicle(v.id)}
                          className="absolute top-2 right-2 bg-[#FFFFFF]/90 hover:bg-[#FBEDEB] text-[#8A968F] hover:text-[#C2453B] p-1.5 rounded-md border border-[#E6E9E4] transition-colors cursor-pointer"
                          title="Remove from garage"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Card Details */}
                      <div className="p-4">
                        <h3 className="font-heading font-bold text-lg text-[#17211D]">
                          {v.fullName}
                        </h3>

                        <div className="stamped-vin-plate my-2.5 px-2.5 py-1 rounded text-sm font-mono text-[#17211D] flex items-center justify-between border border-[#D2D8CF]">
                          <span>VIN: {v.vin}</span>
                          <button
                            onClick={() => handleCopyVin(v.vin)}
                            className="text-[#4B5A54] hover:text-[#013479] text-sm cursor-pointer"
                          >
                            {copiedVin === v.vin ? <Check className="w-3 h-3 text-[#013479]" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>

                        {/* Specs grid summary */}
                        <div className="grid grid-cols-2 gap-2 text-sm my-3 bg-[#FAFAF7] p-2.5 rounded-lg border border-[#E6E9E4]">
                          <div>
                            <span className="text-[#8A968F] font-mono block text-sm">ENGINE</span>
                            <span className="font-mono font-medium truncate block">{v.specs.engine}</span>
                          </div>
                          <div>
                            <span className="text-[#8A968F] font-mono block text-sm">DRIVE</span>
                            <span className="font-mono font-medium truncate block">{v.specs.drive}</span>
                          </div>
                          <div>
                            <span className="text-[#8A968F] font-mono block text-sm">EST. VALUE</span>
                            <span className="font-mono font-bold text-[#013479] block">
                              ${v.marketValueLow.toLocaleString()} – ${v.marketValueHigh.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#8A968F] font-mono block text-sm">RECALLS</span>
                            <span className={`font-mono font-bold block ${v.openRecallsCount > 0 ? 'text-[#C97A12]' : 'text-[#013479]'}`}>
                              {v.openRecallsCount > 0 ? `${v.openRecallsCount} Open` : 'Clean (0)'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => onSelectVehicle(v)}
                        className="flex-1 bg-[#FAFAF7] hover:bg-[#E3ECF9] text-[#013479] font-semibold text-sm py-2 rounded-lg border border-[#E6E9E4] transition-colors cursor-pointer text-center"
                      >
                        View Full Specs &amp; Page
                      </button>
                      <button
                        onClick={onOpenSampleReport}
                        className="p-2 text-[#4B5A54] hover:text-[#013479] bg-[#FAFAF7] hover:bg-[#FFFFFF] border border-[#E6E9E4] rounded-lg transition-colors cursor-pointer"
                        title="View sample history report"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Recalls Monitor */}
        {activeTab === 'recalls' && (
          <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E9E4] p-6 shadow-resting">
            <h3 className="font-heading font-bold text-lg text-[#17211D] mb-2">
              NHTSA Recall Safety Monitor
            </h3>
            <p className="text-sm text-[#4B5A54] mb-6">
              We monitor official NHTSA safety databases daily for active campaigns targeting your saved vehicles.
            </p>

            <div className="space-y-4">
              {savedVehicles.map((v) => (
                <div key={v.id} className="p-4 bg-[#FAFAF7] rounded-xl border border-[#E6E9E4]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-bold text-sm text-[#17211D]">{v.fullName}</span>
                    <span className={`px-2.5 py-0.5 rounded text-sm font-mono font-bold ${
                      v.openRecallsCount > 0 ? 'bg-[#FEF3C7] text-[#C97A12]' : 'bg-[#E3ECF9] text-[#013479]'
                    }`}>
                      {v.openRecallsCount > 0 ? `${v.openRecallsCount} RECALLS ACTION NEEDED` : 'ALL CLEAR (0 RECALLS)'}
                    </span>
                  </div>

                  {v.recallsSummary.length > 0 ? (
                    <div className="space-y-2 mt-2">
                      {v.recallsSummary.map((r, i) => (
                        <div key={i} className="text-sm font-mono bg-[#FFFFFF] p-2.5 rounded border border-[#E6E9E4] text-[#17211D] flex items-center justify-between">
                          <span>{r}</span>
                          <span className="text-sm text-[#013479] font-bold">Free Dealer Repair Covered</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#4B5A54] font-mono">
                      No active NHTSA recall campaigns registered for VIN {v.vin}.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Value Tracker */}
        {activeTab === 'value' && (
          <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E9E4] p-6 shadow-resting">
            <h3 className="font-heading font-bold text-lg text-[#17211D] mb-2">
              Live Fair Market Valuation Tracker
            </h3>
            <p className="text-sm text-[#4B5A54] mb-6">
              Estimated private party sales values calculated using regional auction and dealership market data.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedVehicles.map((v) => (
                <div key={v.id} className="p-4 bg-[#FAFAF7] rounded-xl border border-[#E6E9E4]">
                  <div className="text-sm font-mono text-[#8A968F]">CURRENT ESTIMATED VALUE</div>
                  <div className="text-xl font-mono font-bold text-[#17211D] my-1">
                    ${v.marketValueLow.toLocaleString()} – ${v.marketValueHigh.toLocaleString()}
                  </div>
                  <div className="text-sm font-heading font-bold text-[#013479] mb-3">{v.fullName}</div>

                  <div className="h-24 bg-[#FFFFFF] rounded border border-[#E6E9E4] p-3 flex items-end justify-between gap-2">
                    <div className="w-1/4 bg-[#E3ECF9] h-[50%] rounded text-sm text-center font-mono font-bold text-[#013479]">6 mos ago</div>
                    <div className="w-1/4 bg-[#E3ECF9] h-[65%] rounded text-sm text-center font-mono font-bold text-[#013479]">3 mos ago</div>
                    <div className="w-1/4 bg-[#013479] h-[85%] rounded text-sm text-center font-mono font-bold text-white">Current</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Maintenance Log */}
        {activeTab === 'maintenance' && (
          <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E9E4] p-6 shadow-resting">
            <h3 className="font-heading font-bold text-lg text-[#17211D] mb-2">
              Factory Milestone Schedules
            </h3>
            <p className="text-sm text-[#4B5A54] mb-6">
              Recommended service intervals calculated based on engine configuration and mileage.
            </p>

            <div className="space-y-4">
              {savedVehicles.map((v) => (
                <div key={v.id} className="p-4 bg-[#FAFAF7] rounded-xl border border-[#E6E9E4]">
                  <div className="font-heading font-bold text-sm text-[#17211D] mb-1">{v.fullName}</div>
                  <div className="text-sm font-mono text-[#013479] bg-[#E3ECF9] p-2 rounded mb-2 inline-block">
                    Next Recommended Milestone: <strong>{v.nextMaintenance}</strong>
                  </div>
                  <p className="text-sm text-[#4B5A54]">
                    Engine: {v.specs.engine} • Transmission: {v.specs.transmission}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
