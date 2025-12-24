import { NextRequest, NextResponse } from 'next/server';

// Google PageSpeed Insights API endpoint
const PAGESPEED_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

interface PageSpeedAudit {
  score: number | null;
  displayValue?: string;
  description?: string;
}

interface AnalysisResult {
  url: string;
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
  };
  metrics: {
    loadTime: number; // in seconds
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
  };
  issues: Array<{
    type: 'critical' | 'warning' | 'info';
    title: string;
    description: string;
    impact: string;
    solution: string;
  }>;
  opportunities: Array<{
    title: string;
    savings: string;
  }>;
  meta: {
    title: string | null;
    description: string | null;
    hasSSL: boolean;
    isMobileFriendly: boolean;
  };
}

function normalizeUrl(url: string): string {
  let normalized = url.trim().toLowerCase();
  
  // Remove trailing slashes
  normalized = normalized.replace(/\/+$/, '');
  
  // Add https:// if no protocol
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = 'https://' + normalized;
  }
  
  return normalized;
}

function calculateIssues(data: any): AnalysisResult['issues'] {
  const issues: AnalysisResult['issues'] = [];
  const audits = data.lighthouseResult?.audits || {};
  const categories = data.lighthouseResult?.categories || {};
  
  // Performance issues
  const performanceScore = (categories.performance?.score || 0) * 100;
  if (performanceScore < 50) {
    issues.push({
      type: 'critical',
      title: 'Very slow load time',
      description: `Your site scores ${Math.round(performanceScore)}/100 on performance. Visitors are leaving before they see your content.`,
      impact: 'Studies show 53% of visitors leave if a site takes longer than 3 seconds to load.',
      solution: 'We optimize images, code, and hosting to load your site in under 2 seconds.'
    });
  } else if (performanceScore < 75) {
    issues.push({
      type: 'warning',
      title: 'Slow page speed',
      description: `Your site scores ${Math.round(performanceScore)}/100 on performance. There's room for improvement.`,
      impact: 'Slow sites rank lower on Google and convert fewer visitors.',
      solution: 'We optimize your site for fast loading on all devices.'
    });
  }

  // LCP (Largest Contentful Paint)
  const lcp = audits['largest-contentful-paint'];
  if (lcp && lcp.numericValue > 4000) {
    issues.push({
      type: 'critical',
      title: 'Main content loads too slowly',
      description: `Your main content takes ${(lcp.numericValue / 1000).toFixed(1)} seconds to appear. Google recommends under 2.5 seconds.`,
      impact: 'Visitors see a blank screen and leave before your message appears.',
      solution: 'We optimize images and prioritize above-the-fold content.'
    });
  }

  // Mobile friendliness
  const viewport = audits['viewport'];
  if (viewport && viewport.score === 0) {
    issues.push({
      type: 'critical',
      title: 'Not mobile-friendly',
      description: 'Your site doesn\'t adapt properly to mobile screens.',
      impact: '60%+ of your visitors are on phones. They\'re struggling to use your site.',
      solution: 'We build mobile-first sites that look great on every device.'
    });
  }

  // SEO issues
  const seoScore = (categories.seo?.score || 0) * 100;
  if (seoScore < 80) {
    const metaDescription = audits['meta-description'];
    const documentTitle = audits['document-title'];
    
    if (metaDescription?.score === 0 || documentTitle?.score === 0) {
      issues.push({
        type: 'warning',
        title: 'Missing SEO basics',
        description: 'Your site is missing meta title or description tags.',
        impact: 'Google doesn\'t know what your site is about. You\'re invisible in search results.',
        solution: 'We set up proper SEO foundations so you rank for local searches.'
      });
    }
  }

  // HTTPS
  const isSecure = audits['is-on-https'];
  if (isSecure && isSecure.score === 0) {
    issues.push({
      type: 'critical',
      title: 'No SSL certificate (Not Secure)',
      description: 'Your site shows "Not Secure" warning in browsers.',
      impact: 'Visitors don\'t trust sites without the padlock. They won\'t fill out your contact form.',
      solution: 'We include SSL certificates with all our sites.'
    });
  }

  // CLS (Layout Shift)
  const cls = audits['cumulative-layout-shift'];
  if (cls && cls.numericValue > 0.25) {
    issues.push({
      type: 'warning',
      title: 'Layout shifts while loading',
      description: 'Elements jump around as your page loads.',
      impact: 'Frustrating experience — visitors accidentally click the wrong things.',
      solution: 'We build stable layouts that don\'t shift during loading.'
    });
  }

  // Add a positive note if there are few issues
  if (issues.length === 0) {
    issues.push({
      type: 'info',
      title: 'Technical foundation looks okay',
      description: 'Your site passes basic technical checks.',
      impact: 'But technical scores don\'t tell the full story...',
      solution: 'The real question: Is your site converting visitors into clients? Let\'s talk.'
    });
  }

  return issues;
}

export async function POST(request: NextRequest) {
  console.log('[Analyze API] Request received');
  
  try {
    const body = await request.json();
    const { url } = body;

    console.log('[Analyze API] Received URL:', url);
    console.log('[Analyze API] URL type:', typeof url);
    console.log('[Analyze API] URL length:', url?.length || 0);

    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      console.log('[Analyze API] ERROR: URL is missing or empty');
      return NextResponse.json(
        { 
          error: 'Please enter your website URL (e.g., yourbusiness.com)',
          details: 'The URL field was empty. Enter your website address to get started.',
          code: 'MISSING_URL'
        },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeUrl(url);
    console.log('[Analyze API] Normalized URL:', normalizedUrl);

    // Validate URL format
    try {
      const parsedUrl = new URL(normalizedUrl);
      console.log('[Analyze API] Valid URL - hostname:', parsedUrl.hostname);
    } catch (urlError) {
      console.log('[Analyze API] ERROR: Invalid URL format -', urlError);
      return NextResponse.json(
        { 
          error: 'That doesn\'t look like a valid website address',
          details: `We couldn't recognize "${url}" as a website. Try entering it like: yourbusiness.com`,
          code: 'INVALID_URL'
        },
        { status: 400 }
      );
    }

    // Call Google PageSpeed API (mobile strategy for realistic results)
    const apiUrl = new URL(PAGESPEED_API);
    apiUrl.searchParams.set('url', normalizedUrl);
    apiUrl.searchParams.set('strategy', 'mobile');
    // Use append for multiple categories (set would overwrite)
    apiUrl.searchParams.append('category', 'performance');
    apiUrl.searchParams.append('category', 'seo');
    apiUrl.searchParams.append('category', 'accessibility');
    apiUrl.searchParams.append('category', 'best-practices');

    console.log('[Analyze API] Calling PageSpeed API:', apiUrl.toString());

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    let response;
    try {
      response = await fetch(apiUrl.toString(), {
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });
    } catch (fetchError) {
      console.error('[Analyze API] Fetch error:', fetchError);
      clearTimeout(timeoutId);
      return NextResponse.json(
        { 
          error: 'Could not connect to Google\'s analysis service',
          details: 'This might be a temporary issue. Please try again in a moment.',
          code: 'FETCH_ERROR'
        },
        { status: 503 }
      );
    }
    
    clearTimeout(timeoutId);
    console.log('[Analyze API] PageSpeed API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Analyze API] PageSpeed API error response:', errorText);
      
      // Parse error for more specific messages
      let errorDetails = '';
      try {
        const errorJson = JSON.parse(errorText);
        errorDetails = errorJson.error?.message || '';
        console.error('[Analyze API] Error message:', errorDetails);
      } catch {
        errorDetails = errorText.substring(0, 200);
      }
      
      // Check for common errors
      if (response.status === 400) {
        return NextResponse.json(
          { 
            error: 'We couldn\'t reach that website',
            details: 'Make sure the website is live and publicly accessible. Private or password-protected sites can\'t be analyzed.',
            code: 'SITE_UNREACHABLE'
          },
          { status: 400 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { 
            error: 'Too many requests right now',
            details: 'Our analysis service is busy. Please wait a moment and try again.',
            code: 'RATE_LIMITED'
          },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Something went wrong during analysis',
          details: 'This might be a temporary issue. Please try again.',
          code: 'API_ERROR'
        },
        { status: 500 }
      );
    }

    console.log('[Analyze API] PageSpeed API returned successfully');

    const data = await response.json();
    
    const categories = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits || {};

    // Extract scores (0-100)
    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
    };

    // Extract key metrics
    const metrics = {
      loadTime: (audits['interactive']?.numericValue || 0) / 1000, // Time to Interactive in seconds
      firstContentfulPaint: (audits['first-contentful-paint']?.numericValue || 0) / 1000,
      largestContentfulPaint: (audits['largest-contentful-paint']?.numericValue || 0) / 1000,
      totalBlockingTime: (audits['total-blocking-time']?.numericValue || 0) / 1000,
      cumulativeLayoutShift: audits['cumulative-layout-shift']?.numericValue || 0,
      speedIndex: (audits['speed-index']?.numericValue || 0) / 1000,
    };

    // Extract meta information
    const meta = {
      title: audits['document-title']?.score === 1 ? 'Present' : null,
      description: audits['meta-description']?.score === 1 ? 'Present' : null,
      hasSSL: normalizedUrl.startsWith('https://'),
      isMobileFriendly: (audits['viewport']?.score || 0) === 1,
    };

    // Calculate issues based on scores and audits
    const issues = calculateIssues(data);

    // Extract top opportunities for improvement
    const opportunities: AnalysisResult['opportunities'] = [];
    const opportunityAudits = [
      'render-blocking-resources',
      'unminified-css',
      'unminified-javascript',
      'unused-css-rules',
      'unused-javascript',
      'uses-optimized-images',
      'uses-webp-images',
      'uses-responsive-images',
    ];

    for (const auditId of opportunityAudits) {
      const audit = audits[auditId];
      if (audit && audit.score !== null && audit.score < 1 && audit.details?.overallSavingsMs) {
        opportunities.push({
          title: audit.title,
          savings: `${(audit.details.overallSavingsMs / 1000).toFixed(1)}s potential savings`,
        });
      }
    }

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      scores.performance * 0.4 +
      scores.seo * 0.25 +
      scores.accessibility * 0.2 +
      scores.bestPractices * 0.15
    );

    const result: AnalysisResult & { overallScore: number } = {
      url: normalizedUrl,
      overallScore,
      scores,
      metrics,
      issues,
      opportunities: opportunities.slice(0, 5), // Top 5 opportunities
      meta,
    };

    console.log('[Analyze API] Analysis complete - Score:', overallScore, '- Issues:', issues.length);
    return NextResponse.json(result);

  } catch (error) {
    console.error('[Analyze API] Unhandled error:', error);
    console.error('[Analyze API] Error name:', error instanceof Error ? error.name : 'unknown');
    console.error('[Analyze API] Error message:', error instanceof Error ? error.message : String(error));
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { 
            error: 'Analysis timed out',
            details: 'The website took too long to respond. It might be very slow or temporarily down.',
            code: 'TIMEOUT'
          },
          { status: 504 }
        );
      }
      
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { 
            error: 'Connection failed',
            details: 'Could not connect to our analysis service. Please try again.',
            code: 'CONNECTION_ERROR'
          },
          { status: 503 }
        );
      }

      if (error.message.includes('JSON')) {
        return NextResponse.json(
          { 
            error: 'Invalid request',
            details: 'Please check that you entered a valid website URL.',
            code: 'PARSE_ERROR'
          },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Something went wrong',
        details: 'An unexpected error occurred. Please try again or contact us if the problem persists.',
        code: 'UNKNOWN_ERROR'
      },
      { status: 500 }
    );
  }
}

