import React, { useState, useEffect } from 'react';
import { Activity, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { FlowAnalyticsEvent } from '../../types/onboarding';
import { analytics } from '../../lib/analytics';

export const AnalyticsDrawer: React.FC = () => {
  const [events, setEvents] = useState<FlowAnalyticsEvent[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = analytics.subscribe((updatedEvents) => {
      setEvents(updatedEvents);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-3 right-3 z-50">
      {/* Drawer Toggle Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#17211D] text-white text-xs font-mono font-medium shadow-elevated hover:bg-[#2A3731] cursor-pointer transition-colors border border-white/10"
      >
        <span className="w-2 h-2 rounded-full bg-[#1E8E5A] animate-pulse" />
        <Activity className="w-3.5 h-3.5 text-[#F9AD24]" />
        <span>Telemetry Stream ({events.length})</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Expanded Inspector Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 sm:w-96 max-h-[420px] bg-[#17211D] text-white rounded-2xl shadow-2xl border border-white/15 p-4 flex flex-col font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-white/15 mb-2">
            <div>
              <span className="font-bold text-[#FAFAF7]">Funnel Analytics Inspector</span>
              <span className="block text-[10px] text-[#8A968F]">
                Session: {analytics.getSessionId()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => analytics.clear()}
              title="Clear events"
              className="p-1 rounded text-[#8A968F] hover:text-[#C2453B] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {events.length === 0 ? (
              <div className="py-8 text-center text-[#8A968F]">
                No events recorded yet.
              </div>
            ) : (
              [...events].reverse().map((evt) => (
                <div
                  key={evt.id}
                  className="p-2 rounded bg-white/5 border border-white/10 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#3B82F6]">{evt.eventName}</span>
                    <span className="text-[10px] text-[#8A968F]">
                      {new Date(evt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#D1D5DB] flex gap-2">
                    <span>intent: <span className="text-[#F9AD24]">{evt.user_intent || 'none'}</span></span>
                  </div>
                  {evt.properties && Object.keys(evt.properties).length > 0 && (
                    <pre className="text-[10px] text-[#9CA3AF] bg-black/40 p-1.5 rounded overflow-x-auto">
                      {JSON.stringify(evt.properties, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
