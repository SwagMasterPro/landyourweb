// UTM Parameter Tracking
// Captures UTM parameters from URL and stores them for attribution

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  timestamp?: string;
}

const UTM_STORAGE_KEY = 'landyourweb_utm';
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

// Parse UTM parameters from URL
export function parseUTMFromURL(): UTMParams | null {
  if (typeof window === 'undefined') return null;

  const searchParams = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};
  let hasUTM = false;

  UTM_PARAMS.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      utmParams[param] = value;
      hasUTM = true;
    }
  });

  if (hasUTM) {
    utmParams.referrer = document.referrer || undefined;
    utmParams.landing_page = window.location.pathname;
    utmParams.timestamp = new Date().toISOString();
  }

  return hasUTM ? utmParams : null;
}

// Store UTM parameters in sessionStorage (for current session)
// and localStorage (for attribution across sessions)
export function storeUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined') return;

  // Always store in session for current visit
  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));

  // Only update localStorage if it's a fresh visit with UTM params
  // This preserves first-touch attribution
  const existingFirst = localStorage.getItem(`${UTM_STORAGE_KEY}_first`);
  if (!existingFirst) {
    localStorage.setItem(`${UTM_STORAGE_KEY}_first`, JSON.stringify(params));
  }

  // Always update last-touch attribution
  localStorage.setItem(`${UTM_STORAGE_KEY}_last`, JSON.stringify(params));
}

// Get stored UTM parameters
export function getStoredUTMParams(): { first?: UTMParams; last?: UTMParams; current?: UTMParams } {
  if (typeof window === 'undefined') return {};

  const result: { first?: UTMParams; last?: UTMParams; current?: UTMParams } = {};

  try {
    const firstTouch = localStorage.getItem(`${UTM_STORAGE_KEY}_first`);
    const lastTouch = localStorage.getItem(`${UTM_STORAGE_KEY}_last`);
    const current = sessionStorage.getItem(UTM_STORAGE_KEY);

    if (firstTouch) result.first = JSON.parse(firstTouch);
    if (lastTouch) result.last = JSON.parse(lastTouch);
    if (current) result.current = JSON.parse(current);
  } catch (e) {
    console.error('Error parsing UTM params:', e);
  }

  return result;
}

// Get UTM params formatted for Calendly URL
export function getCalendlyUTMParams(): string {
  const { current, last } = getStoredUTMParams();
  const params = current || last;
  
  if (!params) return '';

  const calendarParams = new URLSearchParams();
  
  if (params.utm_source) calendarParams.set('utm_source', params.utm_source);
  if (params.utm_medium) calendarParams.set('utm_medium', params.utm_medium);
  if (params.utm_campaign) calendarParams.set('utm_campaign', params.utm_campaign);
  if (params.utm_term) calendarParams.set('utm_term', params.utm_term);
  if (params.utm_content) calendarParams.set('utm_content', params.utm_content);

  const queryString = calendarParams.toString();
  return queryString ? `?${queryString}` : '';
}

// Get UTM params for form submissions or API calls
export function getUTMForSubmission(): UTMParams {
  const { current, last, first } = getStoredUTMParams();
  
  return {
    // Prefer current session > last touch > first touch
    ...(first || {}),
    ...(last || {}),
    ...(current || {}),
  };
}

// Initialize UTM tracking on page load
export function initUTMTracking(): void {
  if (typeof window === 'undefined') return;

  const params = parseUTMFromURL();
  if (params) {
    storeUTMParams(params);
  }
}

// Clean URL by removing UTM parameters (optional - for cleaner URLs)
export function cleanURLFromUTM(): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  let hasUTM = false;

  UTM_PARAMS.forEach((param) => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      hasUTM = true;
    }
  });

  if (hasUTM) {
    window.history.replaceState({}, '', url.toString());
  }
}

