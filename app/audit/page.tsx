'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { trackAuditStarted, trackAuditCompleted, trackCTAClick } from '../lib/tracking';
import { EmailCapture } from '../components/EmailCapture';

// Types
interface AnalysisResult {
  url: string;
  overallScore: number;
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
  };
  metrics: {
    loadTime: number;
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

// Revenue calculation defaults by industry
const industryDefaults: Record<string, { name: string; avgClientValue: number; avgMonthlyVisitors: number }> = {
  dental: { name: 'Dental Practice', avgClientValue: 500, avgMonthlyVisitors: 800 },
  medical: { name: 'Medical/Health Clinic', avgClientValue: 300, avgMonthlyVisitors: 600 },
  gym: { name: 'Gym/Fitness Studio', avgClientValue: 600, avgMonthlyVisitors: 1000 },
  veterinary: { name: 'Veterinary Clinic', avgClientValue: 250, avgMonthlyVisitors: 500 },
  law: { name: 'Law Firm', avgClientValue: 2000, avgMonthlyVisitors: 400 },
  accounting: { name: 'Accounting/Financial', avgClientValue: 1500, avgMonthlyVisitors: 300 },
  home: { name: 'Home Services', avgClientValue: 400, avgMonthlyVisitors: 700 },
  restaurant: { name: 'Restaurant/Hospitality', avgClientValue: 50, avgMonthlyVisitors: 2000 },
  other: { name: 'Other Local Business', avgClientValue: 300, avgMonthlyVisitors: 500 },
};

// Loading steps for perceived value
const loadingSteps = [
  { text: 'Loading your website...', duration: 800 },
  { text: 'Checking how fast it loads...', duration: 1200 },
  { text: 'Testing on mobile phones...', duration: 1000 },
  { text: 'Looking for SEO problems...', duration: 1100 },
  { text: 'Checking if visitors can find you...', duration: 900 },
  { text: 'Calculating how much you\'re losing...', duration: 1000 },
];

// Extended error type for better display
interface AnalysisError {
  message: string;
  details?: string;
  code?: string;
}

export default function AuditPage() {
  const [url, setUrl] = useState('');
  const [industry, setIndustry] = useState('other');
  const [monthlyVisitors, setMonthlyVisitors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<AnalysisError | null>(null);

  // Client-side URL validation
  const validateUrl = (inputUrl: string): boolean => {
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      console.log('[Audit Page] Validation failed: URL is empty');
      return false;
    }
    // Basic pattern for domain names
    const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?/;
    const urlPattern = /^(https?:\/\/)?[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.?[a-zA-Z]{2,}/;
    const isValid = domainPattern.test(trimmed) || urlPattern.test(trimmed);
    console.log('[Audit Page] URL validation:', trimmed, '- Valid:', isValid);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('[Audit Page] Form submitted');
    console.log('[Audit Page] URL value:', url);
    console.log('[Audit Page] URL length:', url.length);
    
    // Clear previous states
    setError(null);
    setResult(null);

    // Client-side validation
    if (!url.trim()) {
      console.log('[Audit Page] ERROR: Empty URL');
      setError({
        message: 'Please enter your website URL',
        details: 'Type your website address like: yourbusiness.com',
        code: 'EMPTY_URL'
      });
      return;
    }

    if (!validateUrl(url)) {
      console.log('[Audit Page] ERROR: Invalid URL format');
      setError({
        message: 'That doesn\'t look like a valid website',
        details: 'Enter it like: yourbusiness.com or www.yourbusiness.com',
        code: 'INVALID_FORMAT'
      });
      return;
    }

    setIsLoading(true);
    setLoadingStep(0);

    // Track audit started
    trackAuditStarted(url, industry);
    console.log('[Audit Page] Tracking: audit_started');

    // Animate through loading steps
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < loadingSteps.length) {
        setLoadingStep(currentStep);
      }
    }, 1500);

    try {
      console.log('[Audit Page] Sending API request...');
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      console.log('[Audit Page] API response status:', response.status);
      const data = await response.json();
      console.log('[Audit Page] API response data:', data);

      if (!response.ok) {
        console.log('[Audit Page] API returned error:', data);
        clearInterval(stepInterval);
        setIsLoading(false);
        setError({
          message: data.error || 'Failed to analyze website',
          details: data.details || 'Please check the URL and try again.',
          code: data.code || 'API_ERROR'
        });
        return;
      }

      // Ensure we show all loading steps before revealing results
      clearInterval(stepInterval);
      setLoadingStep(loadingSteps.length - 1);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Track audit completed
      trackAuditCompleted(url, data.overallScore, industry);
      console.log('[Audit Page] Tracking: audit_completed - Score:', data.overallScore);
      
      setResult(data);
      setIsLoading(false);
    } catch (err) {
      console.error('[Audit Page] Fetch error:', err);
      clearInterval(stepInterval);
      setIsLoading(false);
      setError({
        message: 'Could not connect to our analysis service',
        details: err instanceof Error ? err.message : 'Please check your internet connection and try again.',
        code: 'NETWORK_ERROR'
      });
    }
  };

  // Retry function
  const handleRetry = () => {
    console.log('[Audit Page] Retry clicked');
    setError(null);
    // Re-submit if we have a URL
    if (url.trim()) {
      const fakeEvent = { preventDefault: () => {} } as FormEvent;
      handleSubmit(fakeEvent);
    }
  };

  // Calculate revenue loss
  const calculateRevenueLoss = () => {
    if (!result) return null;

    const industryData = industryDefaults[industry];
    const visitors = monthlyVisitors ? parseInt(monthlyVisitors) : industryData.avgMonthlyVisitors;
    const clientValue = industryData.avgClientValue;

    // Estimate current conversion rate based on performance score
    // Poor sites: 0.5-1.5%, Good sites: 3-5%
    const scoreMultiplier = result.overallScore / 100;
    const estimatedCurrentRate = 0.5 + (scoreMultiplier * 1.5); // 0.5% to 2%
    const potentialRate = 4; // Our benchmark

    const currentLeads = Math.round(visitors * (estimatedCurrentRate / 100));
    const potentialLeads = Math.round(visitors * (potentialRate / 100));
    const missedLeads = potentialLeads - currentLeads;
    const monthlyLoss = missedLeads * clientValue;
    const annualLoss = monthlyLoss * 12;

    return {
      visitors,
      clientValue,
      currentRate: estimatedCurrentRate.toFixed(1),
      potentialRate,
      currentLeads,
      potentialLeads,
      missedLeads,
      monthlyLoss,
      annualLoss,
    };
  };

  const revenueLoss = result ? calculateRevenueLoss() : null;

  // Score color helper
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30';
    if (score >= 50) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return (
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden noise-overlay">
      {/* Navigation - Matching homepage */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="logo">
            <span className="logo-land">landyour</span>
            <span className="logo-web">web</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#how" className="nav-link">How It Works</Link>
            <Link href="/#pricing" className="nav-link">Pricing</Link>
            <Link href="/#faq" className="nav-link">FAQ</Link>
            <a href="https://calendly.com/landyourweb/15min" target="_blank" rel="noopener noreferrer" className="btn-premium py-3 px-6 text-sm">
              <span>Book a Call</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          
          {/* Mobile CTA */}
          <a 
            href="https://calendly.com/landyourweb/15min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:hidden text-sm text-[#ea7126] hover:text-[#f5923e] transition-colors"
          >
            Book a Call →
          </a>
        </div>
      </nav>

      <div className="relative pt-32 pb-20 px-6 md:pt-40 md:pb-28">
        {/* Background gradient */}
        <div className="hero-gradient"></div>
        <div className="hero-accent-line hidden md:block"></div>
        <div className="hero-accent-line-2 hidden md:block"></div>
        
        {/* Hero / Form Section */}
        {!result && !isLoading && (
          <section className="max-w-2xl mx-auto text-center relative z-10">
            <div className="hero-eyebrow mb-8 inline-flex">
              <span className="hero-eyebrow-dot"></span>
              <span>100% Free · 30 Seconds · No Email Required</span>
            </div>

            <h1 className="hero-headline mb-6">
              Your website is losing you money.
              <br />
              <span className="gradient-text">Find out how much.</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#A1A1AA] mb-12 max-w-xl mx-auto leading-relaxed">
              Clients are visiting your site and leaving without calling. We&apos;ll show you exactly why — and what it&apos;s costing you every month.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* URL Input */}
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="yourwebsite.com"
                  className="w-full px-6 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-lg text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#ea7126]/50 focus:ring-2 focus:ring-[#ea7126]/20 transition-all"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] text-sm hidden md:block">
                  Press Enter ↵
                </div>
              </div>

              {/* Industry Selector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#71717A] mb-2 text-left">What type of business?</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ea7126]/50 transition-all appearance-none cursor-pointer"
                  >
                    {Object.entries(industryDefaults).map(([key, data]) => (
                      <option key={key} value={key} className="bg-[#1a1a1a]">
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#71717A] mb-2 text-left">Monthly visitors (optional)</label>
                  <input
                    type="number"
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(e.target.value)}
                    placeholder={`~${industryDefaults[industry].avgMonthlyVisitors} estimated`}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#ea7126]/50 transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-red-400 font-medium">{error.message}</p>
                      {error.details && (
                        <p className="text-red-400/70 text-sm mt-1">{error.details}</p>
                      )}
                      {error.code && error.code !== 'EMPTY_URL' && error.code !== 'INVALID_FORMAT' && (
                        <button
                          type="button"
                          onClick={handleRetry}
                          className="mt-3 text-sm text-[#ea7126] hover:text-[#f5923e] transition-colors flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Try again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 px-8 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-2xl text-lg transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(234,113,38,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Show Me What&apos;s Wrong</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>

            <p className="mt-8 text-sm text-[#52525B]">
              Trusted by local businesses across the US and Europe. No tricks, just honest results.
            </p>
          </section>
        )}

        {/* Loading State */}
        {isLoading && (
          <section className="max-w-lg mx-auto text-center relative z-10">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto rounded-full border-4 border-[#ea7126]/20 border-t-[#ea7126] animate-spin" />
            </div>

            <h2 className="text-2xl font-bold mb-8">
              Analyzing {url.replace(/^https?:\/\//, '').split('/')[0]}...
            </h2>

            <div className="space-y-4">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    index <= loadingStep ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  {index < loadingStep ? (
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : index === loadingStep ? (
                    <div className="w-6 h-6 rounded-full border-2 border-[#ea7126]/50 border-t-[#ea7126] animate-spin" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-white/10" />
                  )}
                  <span className={index <= loadingStep ? 'text-white' : 'text-[#52525B]'}>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        {result && !isLoading && (
          <section className="max-w-4xl mx-auto relative z-10">
            {/* Score Header */}
            <div className="text-center mb-12">
              <p className="text-sm text-[#71717A] mb-4">Analysis complete for</p>
              <p className="text-lg text-white mb-8 font-mono">{result.url}</p>

              <div className={`inline-flex items-center gap-6 px-8 py-6 rounded-3xl border ${getScoreBg(result.overallScore)}`}>
                <div>
                  <p className="text-sm text-[#A1A1AA] mb-1">Your Score</p>
                  <p className={`text-6xl font-bold ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore}
                  </p>
                </div>
                <div className="text-left border-l border-white/10 pl-6">
                  <p className="text-sm text-[#A1A1AA] mb-1">Grade</p>
                  <p className={`text-2xl font-bold ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore >= 80 ? 'Good' : result.overallScore >= 50 ? 'Needs Work' : 'Critical'}
                  </p>
                </div>
              </div>
            </div>

            {/* Revenue Loss Card */}
            {revenueLoss && (
              <div className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">This Is Costing You Real Money</h3>
                    <p className="text-[#A1A1AA]">Based on your traffic and what similar businesses charge</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 rounded-xl bg-black/30">
                    <p className="text-sm text-[#71717A] mb-1">Monthly Visitors</p>
                    <p className="text-2xl font-bold text-white">{revenueLoss.visitors.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30">
                    <p className="text-sm text-[#71717A] mb-1">Current Conversion</p>
                    <p className="text-2xl font-bold text-yellow-400">{revenueLoss.currentRate}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30">
                    <p className="text-sm text-[#71717A] mb-1">Potential Conversion</p>
                    <p className="text-2xl font-bold text-green-400">{revenueLoss.potentialRate}%</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-red-500/10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#71717A] mb-1">You&apos;re missing approximately</p>
                      <p className="text-4xl font-bold text-red-400">${revenueLoss.annualLoss.toLocaleString()}/year</p>
                      <p className="text-sm text-[#52525B] mt-1">
                        That&apos;s {revenueLoss.missedLeads} potential clients × ${revenueLoss.clientValue} each
                      </p>
                    </div>
                    <a
                      href="https://calendly.com/landyourweb/15min"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCTAClick('audit_results', 'Stop Losing Clients')}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <span>Stop Losing Clients</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Performance', score: result.scores.performance },
                { label: 'SEO', score: result.scores.seo },
                { label: 'Accessibility', score: result.scores.accessibility },
                { label: 'Best Practices', score: result.scores.bestPractices },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-sm text-[#71717A] mb-2">{item.label}</p>
                  <p className={`text-3xl font-bold ${getScoreColor(item.score)}`}>{item.score}</p>
                </div>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6">Key Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-sm text-[#71717A] mb-2">Load Time</p>
                  <p className={`text-2xl font-bold ${result.metrics.loadTime > 5 ? 'text-red-400' : result.metrics.loadTime > 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {result.metrics.loadTime.toFixed(1)}s
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-sm text-[#71717A] mb-2">First Paint</p>
                  <p className="text-2xl font-bold text-white">{result.metrics.firstContentfulPaint.toFixed(1)}s</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-sm text-[#71717A] mb-2">Largest Element</p>
                  <p className="text-2xl font-bold text-white">{result.metrics.largestContentfulPaint.toFixed(1)}s</p>
                </div>
              </div>
            </div>

            {/* Issues */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6">
                Here&apos;s Why Clients Are Leaving ({result.issues.filter(i => i.type !== 'info').length} issues)
              </h3>
              <div className="space-y-4">
                {result.issues.map((issue, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border ${
                      issue.type === 'critical'
                        ? 'bg-red-500/5 border-red-500/20'
                        : issue.type === 'warning'
                        ? 'bg-yellow-500/5 border-yellow-500/20'
                        : 'bg-blue-500/5 border-blue-500/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{issue.title}</h4>
                        <p className="text-[#A1A1AA] text-sm mb-3">{issue.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="p-3 rounded-lg bg-black/20">
                            <p className="text-[#71717A] mb-1">Impact</p>
                            <p className="text-white">{issue.impact}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-[#ea7126]/10">
                            <p className="text-[#ea7126] mb-1">Our Solution</p>
                            <p className="text-white">{issue.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Path CTA Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Primary: Book a Call */}
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-[#ea7126]/10 to-transparent border border-[#ea7126]/20">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#ea7126]/20 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-[#ea7126]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Tired of watching clients go elsewhere?</h3>
                <p className="text-[#A1A1AA] mb-6 text-sm">
                  Let&apos;s talk about fixing your website. 15 minutes, no pressure. We&apos;ll tell you exactly what needs to change.
                </p>
                <a
                  href="https://calendly.com/landyourweb/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick('audit_results', 'Talk To A Real Person')}
                  className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(234,113,38,0.4)] hover:-translate-y-0.5"
                >
                  <span>Talk To A Real Person</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <p className="mt-4 text-xs text-[#52525B]">
                  No sales pitch · We respond within 24 hours
                </p>
              </div>

              {/* Secondary: Email Report */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/[0.05] flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Want to think it over?</h3>
                <p className="text-[#A1A1AA] mb-6 text-sm text-center">
                  Get this report sent to your inbox with specific action steps you can take today.
                </p>
                <EmailCapture 
                  source="audit_results"
                  title=""
                  description=""
                  buttonText="Send My Report"
                  placeholder="your@email.com"
                  variant="minimal"
                />
                <p className="mt-4 text-xs text-[#52525B] text-center">
                  No spam, ever · Just helpful stuff
                </p>
              </div>
            </div>

            {/* Analyze Another */}
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  setResult(null);
                  setUrl('');
                  setError(null);
                }}
                className="text-[#ea7126] hover:text-[#f5923e] transition-colors"
              >
                ← Analyze another website
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Footer - Matching homepage */}
      <footer className="py-16 px-6 bg-black border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            {/* Brand */}
            <div className="max-w-sm">
              <Link href="/" className="logo mb-4 inline-block">
                <span className="logo-land">landyour</span>
                <span className="logo-web">web</span>
              </Link>
              <p className="text-sm text-[#71717A] mb-4">4 years building websites</p>
              <div className="flex gap-6 text-sm">
                <Link href="/#how" className="text-[#71717A] hover:text-white transition-colors">How It Works</Link>
                <Link href="/#pricing" className="text-[#71717A] hover:text-white transition-colors">Pricing</Link>
                <Link href="/#faq" className="text-[#71717A] hover:text-white transition-colors">FAQ</Link>
              </div>
              <a href="mailto:hello@landyourweb.com" className="text-[#ea7126] hover:text-[#f5923e] transition-colors block mt-4 text-sm">
                hello@landyourweb.com
              </a>
              <p className="text-xs text-[#52525B] mt-2">
                Serving local businesses in the US and Europe · We respond within 24 hours
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
            <p className="text-sm text-[#52525B]">© 2025 Land Your Web LLC. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#52525B] hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#52525B] hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

