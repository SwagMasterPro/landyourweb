'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { trackAuditStarted, trackAuditCompleted, trackCTAClick } from '../lib/tracking';

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
  dental: { name: 'Dental', avgClientValue: 500, avgMonthlyVisitors: 800 },
  medical: { name: 'Medical', avgClientValue: 300, avgMonthlyVisitors: 600 },
  gym: { name: 'Fitness', avgClientValue: 600, avgMonthlyVisitors: 1000 },
  veterinary: { name: 'Vet', avgClientValue: 250, avgMonthlyVisitors: 500 },
  law: { name: 'Law', avgClientValue: 2000, avgMonthlyVisitors: 400 },
  accounting: { name: 'Finance', avgClientValue: 1500, avgMonthlyVisitors: 300 },
  home: { name: 'Home Services', avgClientValue: 400, avgMonthlyVisitors: 700 },
  restaurant: { name: 'Restaurant', avgClientValue: 50, avgMonthlyVisitors: 2000 },
  other: { name: 'Other', avgClientValue: 300, avgMonthlyVisitors: 500 },
};

// Loading steps
const loadingSteps = [
  'Connecting...',
  'Measuring speed...',
  'Testing mobile...',
  'Checking SEO...',
  'Calculating loss...',
];

interface AnalysisError {
  message: string;
  details?: string;
  code?: string;
}

export default function AuditPage() {
  const [url, setUrl] = useState('');
  const [industry, setIndustry] = useState('other');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<AnalysisError | null>(null);
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  const validateUrl = (inputUrl: string): boolean => {
    const trimmed = inputUrl.trim();
    if (!trimmed) return false;
    const pattern = /^(https?:\/\/)?[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}/;
    return pattern.test(trimmed);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!url.trim()) {
      setError({ message: 'Enter your website URL', code: 'EMPTY_URL' });
      return;
    }

    if (!validateUrl(url)) {
      setError({ message: 'Invalid URL format', details: 'Try: yourbusiness.com', code: 'INVALID_FORMAT' });
      return;
    }

    setIsLoading(true);
    setLoadingStep(0);
    trackAuditStarted(url, industry);

    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < loadingSteps.length) setLoadingStep(currentStep);
    }, 1200);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        clearInterval(stepInterval);
        setIsLoading(false);
        setError({ message: data.error, details: data.details, code: data.code });
        return;
      }

      clearInterval(stepInterval);
      setLoadingStep(loadingSteps.length - 1);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      trackAuditCompleted(url, data.overallScore, industry);
      setResult(data);
      setIsLoading(false);
    } catch (err) {
      clearInterval(stepInterval);
      setIsLoading(false);
      setError({ message: 'Connection failed', details: 'Check your internet and try again.', code: 'NETWORK_ERROR' });
    }
  };

  // Calculate revenue loss
  const getRevenueLoss = () => {
    if (!result) return null;
    const industryData = industryDefaults[industry];
    const visitors = industryData.avgMonthlyVisitors;
    const clientValue = industryData.avgClientValue;
    const scoreMultiplier = result.overallScore / 100;
    const currentRate = 0.5 + (scoreMultiplier * 1.5);
    const potentialRate = 4;
    const currentLeads = Math.round(visitors * (currentRate / 100));
    const potentialLeads = Math.round(visitors * (potentialRate / 100));
    const missedLeads = potentialLeads - currentLeads;
    const monthlyLoss = missedLeads * clientValue;
    return { visitors, clientValue, currentRate, potentialRate, currentLeads, potentialLeads, missedLeads, monthlyLoss };
  };

  const revenueLoss = result ? getRevenueLoss() : null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Minimal Nav */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="logo text-sm">
            <span className="logo-land">landyour</span>
            <span className="logo-web">web</span>
          </Link>
          <a href="https://calendly.com/landyourweb/15min" target="_blank" rel="noopener noreferrer" 
             className="text-xs text-[#ea7126] hover:text-white transition-colors">
            Book a Call →
          </a>
        </div>
      </nav>

      {/* FORM STATE */}
      {!result && !isLoading && (
        <section className="pt-20 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <p className="text-[#ea7126] text-xs font-medium tracking-wider uppercase mb-3">Free Audit · 30 Seconds</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                How much is your website <span className="text-red-500">costing</span> you?
              </h1>
              <p className="text-[#71717A] text-lg max-w-2xl mx-auto">
                Find out why visitors leave without calling — and the exact dollar amount you&apos;re losing.
              </p>
            </div>

            {/* Inline Form */}
            <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-3">
                {/* URL Input */}
                <div className="flex-1">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="yourwebsite.com"
                    className="w-full h-12 px-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#ea7126]/50 transition-all"
                  />
                </div>
                
                {/* Industry Select */}
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="h-12 px-4 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ea7126]/50 transition-all appearance-none cursor-pointer min-w-[140px]"
                >
                  {Object.entries(industryDefaults).map(([key, data]) => (
                    <option key={key} value={key} className="bg-black">{data.name}</option>
                  ))}
                </select>

                {/* Submit */}
                <button
                  type="submit"
                  className="h-12 px-6 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-xl transition-all hover:shadow-[0_10px_30px_-10px_rgba(234,113,38,0.5)] hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Analyze Now →
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                  <span className="text-red-400 text-sm">{error.message}</span>
                  {error.details && <span className="text-red-400/60 text-sm">— {error.details}</span>}
                  {error.code && error.code !== 'EMPTY_URL' && error.code !== 'INVALID_FORMAT' && (
                    <button type="button" onClick={() => handleSubmit({ preventDefault: () => {} } as FormEvent)} 
                            className="ml-auto text-xs text-[#ea7126]">Retry</button>
                  )}
                </div>
              )}
            </form>

            <p className="text-center text-[#52525B] text-xs mt-4">No signup required. Works with any website.</p>
          </div>
        </section>
      )}

      {/* LOADING STATE */}
      {isLoading && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-3 border-[#ea7126]/20 border-t-[#ea7126] animate-spin" />
            <p className="text-xl font-medium mb-6">Analyzing {url.replace(/^https?:\/\//, '').split('/')[0]}</p>
            <div className="flex justify-center gap-2">
              {loadingSteps.map((step, i) => (
                <div key={i} className={`text-xs px-3 py-1 rounded-full transition-all ${
                  i <= loadingStep ? 'bg-[#ea7126]/20 text-[#ea7126]' : 'bg-white/5 text-[#52525B]'
                }`}>{step}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RESULTS STATE */}
      {result && !isLoading && revenueLoss && (
        <>
          {/* Hero: Money Loss - Full Width */}
          <section className="pt-20 bg-gradient-to-b from-red-950/20 to-black border-b border-red-500/10">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
              <div className="text-center">
                <p className="text-[#71717A] text-sm mb-2">Your website is losing approximately</p>
                <p className="text-6xl md:text-8xl font-bold text-red-500 mb-2">
                  ${revenueLoss.monthlyLoss.toLocaleString()}
                </p>
                <p className="text-2xl md:text-3xl text-[#71717A] mb-6">per month</p>
                <p className="text-sm text-[#52525B] max-w-md mx-auto">
                  {revenueLoss.visitors.toLocaleString()} visitors × {revenueLoss.currentRate.toFixed(1)}% conversion × ${revenueLoss.clientValue}/client
                </p>
              </div>
            </div>
          </section>

          {/* Side-by-Side Comparison */}
          <section className="py-12 px-4 border-b border-white/5">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* NOW */}
                <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium text-red-400">Your Website Now</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717A]">Performance Score</span>
                      <span className="text-2xl font-bold text-red-400">{result.overallScore}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717A]">Load Time</span>
                      <span className="text-2xl font-bold text-red-400">{result.metrics.loadTime.toFixed(1)}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717A]">Conversion Rate</span>
                      <span className="text-2xl font-bold text-red-400">{revenueLoss.currentRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717A]">Monthly Leads</span>
                      <span className="text-2xl font-bold text-red-400">{revenueLoss.currentLeads}</span>
                    </div>
                  </div>
                </div>

                {/* AFTER */}
                <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-green-400">After We Fix It</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717A]">Performance Score</span>
                      <span className="text-2xl font-bold text-green-400">90+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717A]">Load Time</span>
                      <span className="text-2xl font-bold text-green-400">&lt;2s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717A]">Conversion Rate</span>
                      <span className="text-2xl font-bold text-green-400">{revenueLoss.potentialRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717A]">Monthly Leads</span>
                      <span className="text-2xl font-bold text-green-400">{revenueLoss.potentialLeads}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Difference */}
              <div className="mt-6 p-4 rounded-xl bg-[#ea7126]/10 border border-[#ea7126]/20 text-center">
                <span className="text-[#ea7126] font-medium">
                  That&apos;s {revenueLoss.missedLeads} extra clients/month = +${(revenueLoss.missedLeads * revenueLoss.clientValue).toLocaleString()}/month
                </span>
              </div>
            </div>
          </section>

          {/* Issues - Compact */}
          <section className="py-12 px-4 border-b border-white/5">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold mb-6">What&apos;s Broken ({result.issues.filter(i => i.type !== 'info').length})</h2>
              <div className="space-y-2">
                {result.issues.map((issue, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border transition-all cursor-pointer ${
                      issue.type === 'critical' ? 'border-l-4 border-l-red-500 border-red-500/20 bg-red-500/5' :
                      issue.type === 'warning' ? 'border-l-4 border-l-yellow-500 border-yellow-500/20 bg-yellow-500/5' :
                      'border-white/10 bg-white/[0.02]'
                    }`}
                    onClick={() => setExpandedIssue(expandedIssue === index ? null : index)}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                          issue.type === 'critical' ? 'bg-red-500/20 text-red-400' :
                          issue.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {issue.type.toUpperCase()}
                        </span>
                        <span className="font-medium">{issue.title}</span>
                      </div>
                      <svg className={`w-4 h-4 text-[#71717A] transition-transform ${expandedIssue === index ? 'rotate-180' : ''}`} 
                           fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {expandedIssue === index && (
                      <div className="px-4 pb-4 pt-0">
                        <p className="text-sm text-[#A1A1AA] mb-3">{issue.description}</p>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="p-3 rounded-lg bg-black/30">
                            <p className="text-[#71717A] text-xs mb-1">IMPACT</p>
                            <p className="text-white">{issue.impact}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-[#ea7126]/10">
                            <p className="text-[#ea7126] text-xs mb-1">OUR FIX</p>
                            <p className="text-white">{issue.solution}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Scores Grid */}
          <section className="py-12 px-4 border-b border-white/5">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold mb-6">Detailed Scores</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Performance', score: result.scores.performance },
                  { label: 'SEO', score: result.scores.seo },
                  { label: 'Accessibility', score: result.scores.accessibility },
                  { label: 'Best Practices', score: result.scores.bestPractices },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <p className={`text-3xl font-bold ${
                      item.score >= 80 ? 'text-green-400' : item.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>{item.score}</p>
                    <p className="text-xs text-[#71717A] mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sticky CTA */}
          <section className="sticky bottom-0 bg-black/95 backdrop-blur-xl border-t border-[#ea7126]/20 py-4 px-4 z-40">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-[#71717A]">Stop losing</p>
                <p className="text-xl font-bold text-red-500">${revenueLoss.monthlyLoss.toLocaleString()}/month</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setResult(null); setUrl(''); }}
                  className="px-4 py-3 text-sm text-[#71717A] hover:text-white transition-colors"
                >
                  ← New Audit
                </button>
                <a
                  href="https://calendly.com/landyourweb/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick('audit_results', 'Fix My Website')}
                  className="px-6 py-3 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-xl transition-all hover:shadow-[0_10px_30px_-10px_rgba(234,113,38,0.5)] hover:-translate-y-0.5"
                >
                  Fix My Website →
                </a>
              </div>
            </div>
          </section>

          {/* Minimal Footer */}
          <footer className="py-8 px-4 text-center text-[#52525B] text-xs">
            <p>Analyzed: {result.url}</p>
          </footer>
        </>
      )}
    </main>
  );
}
