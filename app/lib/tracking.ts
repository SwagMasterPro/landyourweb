// Tracking utilities for GA4, TikTok Pixel, and Meta Pixel
// This file provides type-safe tracking functions

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
    ttq: {
      load: (pixelId: string) => void;
      page: () => void;
      track: (event: string, data?: Record<string, unknown>) => void;
      identify: (data: Record<string, unknown>) => void;
    };
  }
}

// CTA locations for tracking
export type CTALocation = 
  | 'hero' 
  | 'nav' 
  | 'mobile_sticky' 
  | 'solution' 
  | 'guarantees' 
  | 'pricing' 
  | 'final_cta' 
  | 'footer'
  | 'audit_results'
  | 'exit_intent';

// Event types
export type TrackingEvent = 
  | 'cta_click'
  | 'scroll_milestone'
  | 'time_on_page'
  | 'audit_started'
  | 'audit_completed'
  | 'email_captured'
  | 'calendly_opened'
  | 'page_view';

// Track CTA clicks across all platforms
export function trackCTAClick(location: CTALocation, ctaText: string) {
  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_location: location,
      cta_text: ctaText,
    });
  }

  // TikTok Pixel
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('ClickButton', {
      content_name: ctaText,
      content_category: location,
    });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'CTAClick', {
      location: location,
      button_text: ctaText,
    });
  }
}

// Track scroll depth milestones
export function trackScrollMilestone(depth: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_milestone', {
      depth_percentage: depth,
    });
  }
}

// Track time on page
export function trackTimeOnPage(seconds: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'time_on_page', {
      seconds: seconds,
      threshold: `${seconds}s`,
    });
  }
}

// Track audit events
export function trackAuditStarted(url: string, industry: string) {
  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'audit_started', {
      audit_url: url,
      industry: industry,
    });
  }

  // TikTok
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('InitiateCheckout', {
      content_name: 'Website Audit',
      content_category: industry,
    });
  }

  // Meta
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'Website Audit',
      content_category: industry,
    });
  }
}

export function trackAuditCompleted(url: string, score: number, industry: string) {
  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'audit_completed', {
      audit_url: url,
      overall_score: score,
      industry: industry,
    });
  }

  // TikTok
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('CompleteRegistration', {
      content_name: 'Website Audit Complete',
      value: score,
    });
  }

  // Meta
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'Website Audit Complete',
      value: score,
    });
  }
}

// Track email capture
export function trackEmailCapture(source: string) {
  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'email_captured', {
      source: source,
    });
  }

  // TikTok - Lead event
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('SubmitForm', {
      content_name: 'Email Capture',
      content_category: source,
    });
  }

  // Meta - Lead event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Email Capture',
      content_category: source,
    });
  }
}

// Track Calendly booking (call this on thank-you page)
export function trackCalendlyBooking() {
  // GA4 - Conversion event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'G-BC30R7GF1N',
      event_category: 'booking',
      event_label: 'calendly_booking',
    });
    window.gtag('event', 'calendly_booking', {
      event_category: 'conversion',
    });
  }

  // TikTok - Schedule event (highest value)
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('Schedule', {
      content_name: 'Strategy Call Booked',
    });
  }

  // Meta - Schedule event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Schedule', {
      content_name: 'Strategy Call Booked',
    });
  }
}

// Track page views across all platforms
export function trackPageView(pageName?: string) {
  // TikTok
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.page();
  }

  // Meta
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }

  // GA4 is handled automatically by gtag
}

// Initialize scroll tracking with debounce to reduce reflows
export function initScrollTracking() {
  if (typeof window === 'undefined') return;

  const milestones = [25, 50, 75, 100];
  const reached = new Set<number>();
  let ticking = false;
  let cachedDocHeight = 0;

  const updateDocHeight = () => {
    cachedDocHeight = document.documentElement.scrollHeight - window.innerHeight;
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        if (cachedDocHeight === 0) updateDocHeight();
        const scrollPercent = Math.round((scrollTop / cachedDocHeight) * 100);

        milestones.forEach((milestone) => {
          if (scrollPercent >= milestone && !reached.has(milestone)) {
            reached.add(milestone);
            trackScrollMilestone(milestone);
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  };

  // Cache doc height on resize
  window.addEventListener('resize', updateDocHeight, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', updateDocHeight);
  };
}

// Initialize time on page tracking
export function initTimeTracking() {
  if (typeof window === 'undefined') return;

  const thresholds = [30, 60, 120, 180];
  const startTime = Date.now();
  const reached = new Set<number>();

  const checkTime = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    
    thresholds.forEach((threshold) => {
      if (elapsed >= threshold && !reached.has(threshold)) {
        reached.add(threshold);
        trackTimeOnPage(threshold);
      }
    });
  };

  const interval = setInterval(checkTime, 5000);
  return () => clearInterval(interval);
}

