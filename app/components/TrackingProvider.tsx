'use client';

import { useEffect } from 'react';
import { initScrollTracking, initTimeTracking, trackPageView } from '../lib/tracking';
import { initUTMTracking } from '../lib/utm';

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize UTM parameter tracking
    initUTMTracking();

    // Track page view on all platforms
    trackPageView();

    // Initialize scroll depth tracking
    const cleanupScroll = initScrollTracking();

    // Initialize time on page tracking
    const cleanupTime = initTimeTracking();

    return () => {
      cleanupScroll?.();
      cleanupTime?.();
    };
  }, []);

  return <>{children}</>;
}

