export type UserIntent = 'owner' | 'seller' | 'buyer' | 'just_checking';

export type OnboardingStep = 1 | 2 | 3;

export interface FlowAnalyticsEvent {
  id: string;
  eventName:
    | 'intent_selected'
    | 'vehicle_confirmed'
    | 'garage_save_shown'
    | 'garage_save_completed'
    | 'garage_save_skipped'
    | 'preview_page_redirected'
    | 'upsell_screen_shown'
    | 'upsell_cta_clicked'
    | 'checkout_started'
    | 'checkout_completed';
  timestamp: number;
  sessionId: string;
  user_intent: UserIntent | null;
  properties?: Record<string, any>;
}

export interface ProvisionalGarageRecord {
  email: string;
  vehicleId: string;
  vin: string;
  vehicleTitle: string;
  savedAt: string;
}

export interface CheckoutSelection {
  packageType: 'report' | 'bundle' | 'sticker';
  includeSticker: boolean;
  totalPrice: number;
}
