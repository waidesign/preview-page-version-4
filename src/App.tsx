import React, { useState, useEffect, useRef } from 'react';
import { Agentation } from 'agentation';
import { Header } from './components/Header';

import { Screen1Intent } from './components/onboarding/Screen1Intent';
import { Screen2Confirm } from './components/onboarding/Screen2Confirm';
import { Screen3GarageGate } from './components/onboarding/Screen3GarageGate';
import { AnalyticsDrawer } from './components/onboarding/AnalyticsDrawer';
import { SkeletonGarageCard } from './components/SkeletonGarageCard';

// Preview Page Components
import { GarageCard } from './components/GarageCard';
import { InsightCardsSection } from './components/InsightCardsSection';
import { GaragePromoSection } from './components/GaragePromoSection';
import { ConversionBand } from './components/ConversionBand';
import { CredibilityStrip } from './components/CredibilityStrip';
import { FaqSection } from './components/FaqSection';
import { StickyMobileCta } from './components/StickyMobileCta';
import { SignupModal } from './components/SignupModal';
import { SampleReportModal } from './components/SampleReportModal';
import { ExitIntentOffer } from './components/ExitIntentOffer';
import { PurchaseRail } from './components/PurchaseRail';

import { FORD_FUSION_SAMPLE, JEEP_CHEROKEE_SAMPLE, FAQ_ITEMS } from './lib/mock-data';
import { VehiclePreview } from './types';
import { UserIntent, OnboardingStep } from './types/onboarding';
import { analytics } from './lib/analytics';
import { AlertCircle, RotateCcw, Sparkles } from 'lucide-react';

const PREVIEW_SAMPLES = [
  { id: FORD_FUSION_SAMPLE.id, label: 'Ford Fusion (With Auction Photo)', vehicle: FORD_FUSION_SAMPLE },
  { id: JEEP_CHEROKEE_SAMPLE.id, label: 'Jeep Cherokee (No Auction Photo)', vehicle: JEEP_CHEROKEE_SAMPLE },
];

export default function App() {
  // Vehicle state
  const [vehicle, setVehicle] = useState<VehiclePreview>(FORD_FUSION_SAMPLE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalidVinState, setIsInvalidVinState] = useState<boolean>(false);

  // Sequential Onboarding State (Screens 1 to 3)
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [isFlowComplete, setIsFlowComplete] = useState<boolean>(false);
  const [userIntent, setUserIntent] = useState<UserIntent | null>(null);
  const [savedEmail, setSavedEmail] = useState<string>('');

  // Preview Page Modals & States
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signup' | 'signin'>('signup');
  const [isSampleReportOpen, setIsSampleReportOpen] = useState<boolean>(false);
  const [isExitOfferOpen, setIsExitOfferOpen] = useState<boolean>(false);

  const purchaseRailRef = useRef<HTMLDivElement>(null);

  // Track Step 3 garage save shown
  useEffect(() => {
    if (!isFlowComplete && currentStep === 3) {
      analytics.track('garage_save_shown');
    }
  }, [currentStep, isFlowComplete]);

  // Screen 1: User Intent selection
  const handleSelectIntent = (intent: UserIntent) => {
    setUserIntent(intent);
    analytics.setIntent(intent);
    analytics.track('intent_selected', { selected_intent: intent });

    // Single tap, auto-advances per spec
    setCurrentStep(2);
  };

  // Screen 2: Vehicle Confirmation
  const handleConfirmVehicle = () => {
    const hasAuctionImage = Boolean(
      vehicle.auctionListing?.imageUrl || (vehicle.auctionImages && vehicle.auctionImages.length > 0)
    );
    analytics.track('vehicle_confirmed', { had_auction_image: hasAuctionImage });
    setCurrentStep(3);
  };

  // Screen 3: Garage Save -> Redirect to the designed Preview Page
  const handleSaveToGarage = (email: string) => {
    setSavedEmail(email);
    analytics.track('garage_save_completed', { email_present: true });
    analytics.track('preview_page_redirected', { saved: true, email });
    setIsFlowComplete(true);
  };

  const handleSkipGarage = () => {
    analytics.track('garage_save_skipped');
    analytics.track('preview_page_redirected', { saved: false });
    setIsFlowComplete(true);
  };

  // Back Navigation between screens 1-3
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as OnboardingStep);
    }
  };

  // Reset funnel to step 1
  const handleRestartFunnel = () => {
    setIsFlowComplete(false);
    setCurrentStep(1);
  };

  // Switch between preview vehicles (with auction photo vs without auction photo)
  const handleSelectPreviewSample = (id: string) => {
    const sample = PREVIEW_SAMPLES.find((s) => s.id === id);
    if (sample) {
      setIsInvalidVinState(false);
      setVehicle(sample.vehicle);
    }
  };

  // Live VIN / Plate search decoder
  const handleSearch = async (query: string, searchType: 'vin' | 'plate', stateCode?: string) => {
    setIsLoading(true);
    setIsInvalidVinState(false);

    if (searchType === 'vin' && query.length < 11) {
      setTimeout(() => {
        setIsLoading(false);
        setIsInvalidVinState(true);
      }, 400);
      return;
    }

    try {
      if (searchType === 'vin') {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${query}?format=json`);
        const data = await response.json();
        const results = data.Results?.[0];

        if (results && results.Make) {
          const year = parseInt(results.ModelYear) || 2021;
          const make = results.Make || 'Vehicle';
          const model = results.Model || 'Model';
          const trim = results.Trim || results.Series || 'Standard Trim';

          const decodedVehicle: VehiclePreview = {
            id: `decoded-${query}`,
            vin: query.toUpperCase(),
            year: year,
            make: make,
            model: model,
            fullName: `${year} ${make} ${model} ${trim}`,
            photoUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
            statusType: 'rich',
            specs: {
              trim: trim,
              engine: results.DisplacementL ? `${results.DisplacementL}L ${results.EngineConfiguration || ''} ${results.EngineCylinders || ''}-Cyl` : 'Factory Specs',
              fuel: results.FuelTypePrimary || 'Gasoline',
              drive: results.DriveType || 'All-Wheel Drive',
              transmission: results.TransmissionStyle || 'Automatic',
              body: results.BodyClass || 'Sedan / SUV',
              doors: results.Doors || '4',
              country: results.PlantCountry || 'United States',
            },
            openRecallsCount: 1,
            recallsSummary: [`NHTSA Campaign Safety Record: Factory inspection recommended for ${model}`],
            marketValueLow: 12500,
            marketValueHigh: 16800,
            nextMaintenance: 'Standard Milestone Inspection',
            nextMaintenanceMiles: 60000,
            historyRecordsCount: 8,
            historyCategories: ['Title History', 'Odometer Check', 'Registration Records'],
            titleBrandsCount: 0,
            accidentCount: 0,
            decodedSource: 'NHTSA Official Database',
            savedToGarage: false,
          };

          setVehicle(decodedVehicle);
          setIsLoading(false);
          setCurrentStep(1);
          return;
        }
      }
    } catch (err) {
      console.warn('NHTSA API fallback activated:', err);
    }

    setTimeout(() => {
      const fallbackVehicle: VehiclePreview = {
        id: `search-${query}`,
        vin: searchType === 'vin' ? query.toUpperCase() : '1HGCR2F83HA019284',
        plate: searchType === 'plate' ? query.toUpperCase() : undefined,
        plateState: stateCode || 'CA',
        year: 2019,
        make: 'Honda',
        model: 'Accord',
        fullName: '2019 Honda Accord EX-L',
        photoUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',
        statusType: 'rich',
        specs: {
          trim: 'EX-L 1.5T',
          engine: '1.5L Turbo I-4 16V',
          fuel: 'Gasoline',
          drive: 'Front-Wheel Drive (FWD)',
          transmission: 'CVT Automatic',
          body: '4-Door Sedan',
          doors: '4',
          country: 'United States (Marysville, OH)',
        },
        openRecallsCount: 0,
        recallsSummary: [],
        marketValueLow: 17200,
        marketValueHigh: 21500,
        nextMaintenance: 'Oil Change & Tire Rotation',
        nextMaintenanceMiles: 45000,
        historyRecordsCount: 9,
        historyCategories: ['Title History', 'Registration', 'Odometer Reading'],
        titleBrandsCount: 0,
        accidentCount: 0,
        decodedSource: searchType === 'vin' ? 'NHTSA Specification Record' : `State DMV Plate Lookup (${stateCode || 'CA'})`,
        savedToGarage: false,
      };

      setVehicle(fallbackVehicle);
      setIsLoading(false);
      setCurrentStep(1);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#17211D] flex flex-col font-sans selection:bg-[#E3ECF9] selection:text-[#013479]">
      {/* 1. Header with search bar and sample switcher */}
      <Header
        onSearch={handleSearch}
        onLogoClick={() => {
          setIsInvalidVinState(false);
          setVehicle(FORD_FUSION_SAMPLE);
          setCurrentStep(1);
        }}
        onOpenSignup={() => {}}
        onOpenLogin={() => {}}
        isLoading={isLoading}
        previewSamples={PREVIEW_SAMPLES.map(({ id, label }) => ({ id, label }))}
        activePreviewSampleId={vehicle.id}
        onSelectPreviewSample={handleSelectPreviewSample}
      />

      {/* Main Sequential Onboarding Container */}
      <main className="flex-1 pt-20 pb-16 flex flex-col">
        {isLoading ? (
          <section className="py-12 px-4 max-w-2xl mx-auto w-full">
            <SkeletonGarageCard />
          </section>
        ) : isInvalidVinState ? (
          <section className="py-16 px-4 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#FBEDEB] text-[#C2453B] flex items-center justify-center mx-auto mb-4 border border-[#C2453B]/20">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#17211D]">
              VIN or Plate Not Recognized
            </h1>
            <p className="text-sm text-[#4B5A54] mt-2 mb-6">
              Standard VINs must be 17 characters (excluding letters I, O, and Q). Please check for typos.
            </p>
            <button
              onClick={() => {
                setIsInvalidVinState(false);
                setVehicle(FORD_FUSION_SAMPLE);
                setCurrentStep(1);
              }}
              className="bg-[#013479] hover:bg-[#024EB6] text-white text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer transition-colors"
            >
              Load Sample 2017 Ford Fusion
            </button>
          </section>
        ) : !isFlowComplete ? (
          <div className="flex-1 flex flex-col justify-start">
            {/* Step Switcher (Steps 1, 2, 3) */}
            <div className="flex-1 flex items-center justify-center">
              {currentStep === 1 && (
                <Screen1Intent
                  selectedIntent={userIntent}
                  onSelectIntent={handleSelectIntent}
                />
              )}

              {currentStep === 2 && (
                <Screen2Confirm
                  vehicle={vehicle}
                  onContinue={handleConfirmVehicle}
                />
              )}

              {currentStep === 3 && (
                <Screen3GarageGate
                  vehicle={vehicle}
                  userIntent={userIntent}
                  savedEmail={savedEmail}
                  onSaveToGarage={handleSaveToGarage}
                  onSkip={handleSkipGarage}
                />
              )}
            </div>
          </div>
        ) : (
          /* REDIRECTED TO DESIGNED VEHICLE PREVIEW PAGE */
          <div>
            {/* Context notification banner from Onboarding */}
            <div className="bg-[#E3ECF9] border-b border-[#013479]/20 py-2.5 px-4 text-xs sm:text-sm text-[#013479]">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F9AD24] shrink-0" />
                  <span>
                    Onboarding complete! Showing customized report for{' '}
                    <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong>
                    {savedEmail ? ` (Saved to: ${savedEmail})` : ' (Anonymous session)'}
                    {userIntent ? ` • Segment: ${userIntent}` : ''}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRestartFunnel}
                  className="inline-flex items-center gap-1 font-semibold text-[#013479] hover:underline cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Onboarding</span>
                </button>
              </div>
            </div>

            {/* Hero — GarageCard */}
            <GarageCard
              vehicle={vehicle}
              savedToGarage={Boolean(savedEmail)}
              onSaveToGarage={() => {
                setAuthInitialMode('signup');
                setIsSignupOpen(true);
              }}
            />

            {/* Desktop Layout Container: 2-col grid — InsightCards left, sticky PurchaseRail right */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" style={{ alignItems: 'start' }}>
                {/* Left column — InsightCardsSection */}
                <div className="order-2 lg:order-1 lg:col-span-8">
                  <InsightCardsSection
                    vehicle={vehicle}
                    onOpenSignup={() => {
                      setAuthInitialMode('signup');
                      setIsSignupOpen(true);
                    }}
                    onOpenSampleReport={() => setIsSampleReportOpen(true)}
                  />
                </div>

                {/* Right column — PurchaseRail package card */}
                <div ref={purchaseRailRef} className="order-1 lg:order-2 w-full lg:col-span-4 lg:sticky lg:top-20 lg:self-start">
                  <PurchaseRail
                    vehicle={vehicle}
                    onSelectOption={(_opt) => {
                      setAuthInitialMode('signup');
                      setIsSignupOpen(true);
                    }}
                  />
                </div>
              </div>

              {/* CredibilityStrip directly under Available Records section */}
              <CredibilityStrip />
            </div>

            {/* Full-width sections below the 2-col grid */}
            {!savedEmail && (
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12">
                <GaragePromoSection
                  vehicle={vehicle}
                  onOpenSignup={() => {
                    setAuthInitialMode('signup');
                    setIsSignupOpen(true);
                  }}
                />
              </div>
            )}

            {/* Edge-to-edge Conversion Banner section */}
            {!savedEmail && (
              <ConversionBand
                vehicle={vehicle}
                onOpenSignup={() => {
                  setAuthInitialMode('signup');
                  setIsSignupOpen(true);
                }}
              />
            )}

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12">
              <FaqSection
                faqItems={FAQ_ITEMS}
                onOpenSampleReport={() => setIsSampleReportOpen(true)}
              />
            </div>

            {/* Sticky Mobile CTA */}
            <StickyMobileCta
              onSelectOption={(_opt) => {
                setAuthInitialMode('signup');
                setIsSignupOpen(true);
              }}
            />

            {/* Signup / Login Modal */}
            <SignupModal
              isOpen={isSignupOpen}
              onClose={() => setIsSignupOpen(false)}
              vehicle={vehicle}
              onSuccess={(email) => {
                setSavedEmail(email);
                setIsSignupOpen(false);
              }}
              initialMode={authInitialMode}
            />

            {/* Sample Report Modal */}
            <SampleReportModal
              isOpen={isSampleReportOpen}
              onClose={() => setIsSampleReportOpen(false)}
              vehicle={vehicle}
              onSelectPackage={(_pkg) => {
                setIsSampleReportOpen(false);
                setIsSignupOpen(true);
              }}
            />

            {/* Exit-Intent Offer */}
            <ExitIntentOffer
              isOpen={isExitOfferOpen}
              onClose={() => setIsExitOfferOpen(false)}
              vehicle={vehicle}
              onClaimOffer={() => {
                setIsExitOfferOpen(false);
                setIsSignupOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* Floating live analytics inspector for verifying all funnel events */}
      <AnalyticsDrawer />

      {/* Agentation dev inspector */}
      {(import.meta.env.DEV || process.env.NODE_ENV === 'development') && <Agentation />}
    </div>
  );
}
