'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

// Track CTA clicks in Google Analytics (GA4)
const trackCTA = (location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      button_location: location,
      button_text: 'Book a Call',
    });
    console.log('CTA tracked:', location); // Debug log
  }
};

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
  { text: 'Connecting to your website...', duration: 800 },
  { text: 'Measuring page speed...', duration: 1200 },
  { text: 'Testing mobile experience...', duration: 1000 },
  { text: 'Scanning for SEO issues...', duration: 1100 },
  { text: 'Analyzing conversion elements...', duration: 900 },
  { text: 'Calculating revenue impact...', duration: 1000 },
];

export default function AuditPage() {
  const [url, setUrl] = useState('');
  const [industry, setIndustry] = useState('other');
  const [monthlyVisitors, setMonthlyVisitors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);
    setLoadingStep(0);

    // Animate through loading steps
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < loadingSteps.length) {
        setLoadingStep(currentStep);
      }
    }, 1500);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze website');
      }

      // Ensure we show all loading steps before revealing results
      clearInterval(stepInterval);
      setLoadingStep(loadingSteps.length - 1);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
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
            <a href="https://calendly.com/landyourweb/15min" target="_blank" rel="noopener noreferrer" className="btn-premium py-3 px-6 text-sm" onClick={() => trackCTA('audit_nav')}>
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
            onClick={() => trackCTA('audit_mobile_nav')}
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
              <span>Free · 30 seconds · No signup</span>
            </div>

            <h1 className="hero-headline mb-6">
              Find out what&apos;s costing
              <br />
              <span className="gradient-text">you clients</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#A1A1AA] mb-12 max-w-xl mx-auto leading-relaxed">
              Enter your website URL and we&apos;ll show you exactly what&apos;s wrong — and how much money you&apos;re leaving on the table.
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
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-5 px-8 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-2xl text-lg transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(234,113,38,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <span>Analyze My Website</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>

            <p className="mt-8 text-sm text-[#52525B]">
              Works with any website. Results in 30 seconds.
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
                    <h3 className="text-xl font-bold text-white mb-1">Estimated Revenue Loss</h3>
                    <p className="text-[#A1A1AA]">Based on your traffic & industry benchmarks</p>
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
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
                      onClick={() => trackCTA('audit_results')}
                    >
                      <span>Fix This Now</span>
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
                Issues Found ({result.issues.filter(i => i.type !== 'info').length})
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

            {/* CTA */}
            <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-[#ea7126]/10 to-transparent border border-[#ea7126]/20">
              <h3 className="text-2xl font-bold mb-4">Ready to fix these issues?</h3>
              <p className="text-[#A1A1AA] mb-8 max-w-lg mx-auto">
                Book a free 15-minute call. We&apos;ll walk through your results and show you exactly how to turn your website into a client-booking machine.
              </p>
              <a
                href="https://calendly.com/landyourweb/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-2xl text-lg transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(234,113,38,0.4)] hover:-translate-y-0.5"
                onClick={() => trackCTA('audit_final_cta')}
              >
                <span>Book Your Free Strategy Call</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="mt-6 text-sm text-[#52525B]">
                No obligation · 15 minutes · We&apos;ll show you exactly what to fix
              </p>
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

