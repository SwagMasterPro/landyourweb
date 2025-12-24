'use client';

import { ReactNode, MouseEvent, useMemo } from 'react';
import { trackCTAClick, CTALocation } from '../lib/tracking';
import { getCalendlyUTMParams } from '../lib/utm';

interface TrackedLinkProps {
  href: string;
  children: ReactNode;
  location: CTALocation;
  ctaText: string;
  className?: string;
  target?: string;
  rel?: string;
}

export function TrackedLink({ 
  href, 
  children, 
  location, 
  ctaText, 
  className, 
  target, 
  rel 
}: TrackedLinkProps) {
  // Add UTM params to Calendly links
  const finalHref = useMemo(() => {
    if (href.includes('calendly.com')) {
      const utmParams = getCalendlyUTMParams();
      return href + utmParams;
    }
    return href;
  }, [href]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Track the click before navigation
    trackCTAClick(location, ctaText);
  };

  return (
    <a 
      href={finalHref} 
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}

