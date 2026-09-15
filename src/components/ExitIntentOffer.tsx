import React, { useEffect, useRef, useState } from 'react';
import { X, Tag } from 'lucide-react';

interface ExitIntentOfferProps {
  isOpen: boolean;
  onClose: () => void;
  onRedeem: () => void;
}

// Once this fraction of the scratch canvas has been cleared, auto-reveal the rest.
const SCRATCH_REVEAL_THRESHOLD = 0.45;

export const ExitIntentOffer: React.FC<ExitIntentOfferProps> = ({ isOpen, onClose, onRedeem }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratchingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Reset the card each time the popup is (re-)opened.
  useEffect(() => {
    if (isOpen) setIsRevealed(false);
  }, [isOpen]);

  // Paint the scratch-off gold foil surface.
  useEffect(() => {
    if (!isOpen || isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#FDE9B8');
      gradient.addColorStop(0.5, '#F9AD24');
      gradient.addColorStop(1, '#E08F0A');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(23, 33, 29, 0.85)';
      ctx.font = '700 15px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Scratch to reveal', width / 2, height / 2);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      draw();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isOpen, isRevealed]);

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratchAt = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkRevealProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    if (!width || !height) return;

    const step = 24;
    const { data } = ctx.getImageData(0, 0, width, height);
    let cleared = 0;
    let sampled = 0;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        sampled++;
        if (data[(y * width + x) * 4 + 3] < 40) cleared++;
      }
    }
    if (sampled > 0 && cleared / sampled > SCRATCH_REVEAL_THRESHOLD) {
      setIsRevealed(true);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isScratchingRef.current = true;
    const point = getPoint(e);
    if (point) scratchAt(point.x, point.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    const point = getPoint(e);
    if (point) scratchAt(point.x, point.y);
  };

  const handlePointerUp = () => {
    if (!isScratchingRef.current) return;
    isScratchingRef.current = false;
    checkRevealProgress();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17211D]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFFFF] w-full max-w-sm rounded-2xl border border-[#E6E9E4] shadow-2xl p-6 relative animate-slide-up text-center">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#FAFAF7] border border-[#E6E9E4] flex items-center justify-center text-[#4B5A54] hover:text-[#17211D] cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="inline-flex items-center gap-1.5 text-sm font-mono font-bold uppercase tracking-wider text-[#013479] bg-[#E3ECF9] px-2.5 py-1 rounded-full">
          Congratulations
        </span>

        <h3 className="font-heading font-bold text-xl text-[#17211D] mt-3 mb-1">
          You just unlocked a scratch card
        </h3>
        <p className="text-sm text-[#4B5A54] mb-4">
          Before you go — scratch the card below to reveal your discount.
        </p>

        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#E6E9E4] select-none">
          {/* Revealed content sits underneath the scratch canvas */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 bg-[#FAFAF7]">
            <span className="inline-flex items-center gap-1 text-sm font-mono font-bold uppercase tracking-wider text-[#C97A12] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
              <Tag className="w-3.5 h-3.5" /> Limited-time offer
            </span>
            <div className="text-2xl font-heading font-bold text-[#17211D]">15% OFF</div>
            <p className="text-sm text-[#4B5A54]">Your Vehicle History Report</p>
          </div>

          {!isRevealed && (
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none"
            />
          )}
        </div>

        <button
          onClick={onRedeem}
          disabled={!isRevealed}
          className="w-full mt-5 bg-[#F9AD24] hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed text-[#17211D] font-bold text-sm py-3 rounded-xl shadow-amber-glow transition-all cursor-pointer active:opacity-90"
        >
          {isRevealed ? 'Redeem 15% Off' : 'Scratch to unlock your offer'}
        </button>

        <button
          onClick={onClose}
          className="text-sm font-semibold text-[#8A968F] hover:text-[#17211D] mt-3 transition-colors cursor-pointer"
        >
          No thanks
        </button>
      </div>
    </div>
  );
};
