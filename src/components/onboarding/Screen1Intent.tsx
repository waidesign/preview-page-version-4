import React from 'react';
import { motion } from 'motion/react';
import { KeyRound, Tag, ShoppingCart, Compass, ArrowRight } from 'lucide-react';
import { UserIntent } from '../../types/onboarding';

interface Screen1IntentProps {
  selectedIntent: UserIntent | null;
  onSelectIntent: (intent: UserIntent) => void;
}

interface IntentOption {
  id: UserIntent;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INTENT_OPTIONS: IntentOption[] = [
  {
    id: 'owner',
    title: 'Owner',
    subtitle: 'I own this vehicle and want to track its status',
    icon: KeyRound,
  },
  {
    id: 'seller',
    title: 'Seller',
    subtitle: 'I am preparing to sell or trade this vehicle',
    icon: Tag,
  },
  {
    id: 'buyer',
    title: 'Buyer',
    subtitle: 'I am shopping or researching this vehicle to buy',
    icon: ShoppingCart,
  },
  {
    id: 'just_checking',
    title: 'Just checking',
    subtitle: 'Curious about this car or exploring records',
    icon: Compass,
  },
];

export const Screen1Intent: React.FC<Screen1IntentProps> = ({
  selectedIntent,
  onSelectIntent,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-center mb-10"
      >
        <span className="inline-block text-xs font-mono font-semibold tracking-wider text-[#024EB6] uppercase mb-2">
          Personalize Your Experience
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#17211D] tracking-tight">
          One quick question before we dive in! Are you a ...
        </h1>
        <p className="text-base text-[#4B5A54] mt-2.5 max-w-xl mx-auto">
          Tap an option to customize the report insights and vehicle tools for your needs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {INTENT_OPTIONS.map((option, idx) => {
          const Icon = option.icon;
          const isSelected = selectedIntent === option.id;

          return (
            <motion.button
              key={option.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectIntent(option.id)}
              className={`text-left p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[140px] group relative ${
                isSelected
                  ? 'border-[#013479] bg-[#E3ECF9]/40 shadow-elevated ring-2 ring-[#013479]/20'
                  : 'border-[#E6E9E4] bg-[#FFFFFF] hover:border-[#013479]/50 hover:bg-[#FAFAF7] shadow-resting'
              }`}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#013479] text-white'
                      : 'bg-[#FAFAF7] border border-[#E6E9E4] text-[#4B5A54] group-hover:text-[#013479] group-hover:border-[#013479]/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isSelected ? 'text-[#013479]' : 'text-[#8A968F] opacity-0 group-hover:opacity-100'
                  }`}
                />
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-[#17211D] group-hover:text-[#013479] transition-colors">
                  {option.title}
                </h3>
                <p className="text-xs text-[#4B5A54] mt-1 leading-snug">
                  {option.subtitle}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

    </div>
  );
};
