import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { OnboardingStep } from '../../types/onboarding';

interface StepHeaderProps {
  currentStep: OnboardingStep;
  totalSteps?: number;
  onBack?: () => void;
  canGoBack: boolean;
}

const STEP_LABELS: Record<OnboardingStep, string> = {
  1: 'Intent',
  2: 'Vehicle Confirmation',
  3: 'Garage Save',
};

export const StepHeader: React.FC<StepHeaderProps> = ({
  currentStep,
  totalSteps = 3,
  onBack,
  canGoBack,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="flex items-center justify-between gap-4 mb-3">
        {canGoBack && onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4B5A54] hover:text-[#013479] transition-colors cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-[#E3ECF9]/50"
            aria-label="Go back to previous step"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-16" />
        )}

        {/* Step pill indicator */}
        <div className="text-center">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#013479] bg-[#E3ECF9] px-2.5 py-1 rounded-full border border-[#013479]/15">
            Step {currentStep} of {totalSteps}: {STEP_LABELS[currentStep]}
          </span>
        </div>

        <div className="w-16 text-right">
          <span className="text-xs font-mono text-[#8A968F]">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1.5 bg-[#E6E9E4] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#013479] to-[#024EB6] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
