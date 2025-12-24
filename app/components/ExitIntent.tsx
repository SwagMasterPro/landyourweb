'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { trackCTAClick } from '../lib/tracking';

interface ExitIntentProps {
  delay?: number; // Delay before enabling exit intent detection (ms)
}

export function ExitIntent({ delay = 5000 }: ExitIntentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  // Check if user has already dismissed or converted
  useEffect(() => {
    const dismissed = sessionStorage.getItem('exitIntentDismissed');
    const converted = sessionStorage.getItem('exitIntentConverted');
    
    if (dismissed || converted) {
      setHasTriggered(true);
    }

    // Enable after delay to avoid triggering immediately
    const timer = setTimeout(() => {
      setIsEnabled(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger if mouse leaves towards the top of the viewport (closing tab/window)
    if (e.clientY <= 0 && isEnabled && !hasTriggered) {
      setIsVisible(true);
      setHasTriggered(true);
    }
  }, [isEnabled, hasTriggered]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('exitIntentDismissed', 'true');
  };

  const handleConvert = () => {
    trackCTAClick('exit_intent', 'Get Free Audit');
    sessionStorage.setItem('exitIntentConverted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={handleDismiss}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 animate-fade-in-scale shadow-[0_20px_60px_-20px_rgba(234,113,38,0.3)]">
        {/* Close button */}
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-[#71717A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#ea7126]/20 border border-[#ea7126]/30 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-[#ea7126]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Wait! Before you go...
          </h2>

          <p className="text-[#A1A1AA] mb-8 max-w-sm mx-auto">
            Get a <span className="text-white font-semibold">free website audit</span> in 30 seconds. 
            See what&apos;s costing you clients — no signup required.
          </p>

          <Link 
            href="/audit"
            onClick={handleConvert}
            className="inline-flex items-center justify-center gap-3 w-full py-4 px-8 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(234,113,38,0.5)] hover:-translate-y-0.5 mb-4"
          >
            <span>Get My Free Audit</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <button 
            onClick={handleDismiss}
            className="text-sm text-[#52525B] hover:text-[#71717A] transition-colors"
          >
            No thanks, I&apos;ll pass
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex justify-center gap-6 text-xs text-[#52525B]">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            30 seconds
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No signup
          </span>
        </div>
      </div>
    </div>
  );
}

