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
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeUrl(url);

    // Validate URL format
    try {
      new URL(normalizedUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Call Google PageSpeed API (mobile strategy for realistic results)
    const apiUrl = new URL(PAGESPEED_API);
    apiUrl.searchParams.set('url', normalizedUrl);
    apiUrl.searchParams.set('strategy', 'mobile');
    apiUrl.searchParams.set('category', 'performance');
    apiUrl.searchParams.set('category', 'seo');
    apiUrl.searchParams.set('category', 'accessibility');
    apiUrl.searchParams.set('category', 'best-practices');

    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PageSpeed API error:', errorText);
      
      // Check for common errors
      if (response.status === 400) {
        return NextResponse.json(
          { error: 'Could not analyze this URL. Make sure the website is publicly accessible.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to analyze website. Please try again.' },
        { status: 500 }
      );
    }

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

    return NextResponse.json(result);

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'An error occurred while analyzing the website.' },
      { status: 500 }
    );
  }
}

