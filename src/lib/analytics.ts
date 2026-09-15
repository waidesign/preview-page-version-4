import { FlowAnalyticsEvent, UserIntent } from '../types/onboarding';

class AnalyticsTracker {
  private sessionId: string;
  private currentIntent: UserIntent | null = null;
  private listeners: ((events: FlowAnalyticsEvent[]) => void)[] = [];
  private eventLog: FlowAnalyticsEvent[] = [];

  constructor() {
    this.sessionId = 'sess_' + Math.random().toString(36).substring(2, 9);
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public setIntent(intent: UserIntent) {
    this.currentIntent = intent;
  }

  public getIntent(): UserIntent | null {
    return this.currentIntent;
  }

  public track(
    eventName: FlowAnalyticsEvent['eventName'],
    properties?: Record<string, any>
  ) {
    const event: FlowAnalyticsEvent = {
      id: 'evt_' + Math.random().toString(36).substring(2, 9),
      eventName,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      user_intent: this.currentIntent,
      properties,
    };

    this.eventLog.push(event);
    console.info(`[Analytics Event: ${eventName}]`, event);

    // Notify listeners for UI inspector
    this.listeners.forEach((listener) => listener([...this.eventLog]));
  }

  public getEvents(): FlowAnalyticsEvent[] {
    return [...this.eventLog];
  }

  public subscribe(listener: (events: FlowAnalyticsEvent[]) => void) {
    this.listeners.push(listener);
    listener([...this.eventLog]);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public clear() {
    this.eventLog = [];
    this.listeners.forEach((listener) => listener([]));
  }
}

export const analytics = new AnalyticsTracker();
