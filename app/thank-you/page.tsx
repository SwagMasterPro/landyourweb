'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { trackCalendlyBooking } from '../lib/tracking';

export default function ThankYouPage() {
  useEffect(() => {
    // Track conversion on page load
    trackCalendlyBooking();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden noise-overlay">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="logo">
            <span className="logo-land">landyour</span>
            <span className="logo-web">web</span>
          </Link>
        </div>
      </nav>

      <div className="relative pt-32 pb-20 px-6 md:pt-44 md:pb-28 min-h-screen flex items-center">
        {/* Background gradient */}
        <div className="hero-gradient"></div>
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          {/* Success icon */}
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 flex items-center justify-center mb-8">
            <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            You&apos;re booked!
          </h1>

          <p className="text-xl md:text-2xl text-[#A1A1AA] mb-8 max-w-lg mx-auto leading-relaxed">
            We&apos;ve received your booking. Check your email for confirmation and calendar invite.
          </p>

          {/* What to expect */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 mb-10 text-left">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#ea7126]/20 flex items-center justify-center text-sm text-[#ea7126]">?</span>
              What to expect on the call
            </h2>

            <ul className="space-y-4">
              {[
                'We\'ll review your current website (if you have one)',
                'Discuss your business goals and ideal clients',
                'Show you exactly what a conversion-focused site looks like',
                'Answer any questions — no pressure, no hard sells'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#A1A1AA]">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prepare section */}
          <div className="bg-gradient-to-br from-[#ea7126]/10 to-transparent border border-[#ea7126]/20 rounded-3xl p-8 mb-10 text-left">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#ea7126]/20 flex items-center justify-center text-sm text-[#ea7126]">✓</span>
              How to prepare (optional)
            </h2>

            <ul className="space-y-3 text-[#A1A1AA]">
              <li className="flex items-start gap-3">
                <span className="text-[#ea7126] shrink-0">•</span>
                <span>Have your current website URL handy (if applicable)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ea7126] shrink-0">•</span>
                <span>Think about: What does a &quot;good&quot; month look like for new clients?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ea7126] shrink-0">•</span>
                <span>Any competitor websites you like or want to emulate</span>
              </li>
            </ul>
          </div>

          {/* Share section */}
          <div className="mb-10">
            <p className="text-[#71717A] mb-4">Know another business owner who needs this?</p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://twitter.com/intent/tweet?text=Just%20booked%20a%20call%20with%20Land%20Your%20Web%20to%20get%20a%20website%20that%20actually%20books%20clients.%20Check%20them%20out%3A&url=https%3A%2F%2Flandyourweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <svg className="w-5 h-5 text-[#A1A1AA]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flandyourweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <svg className="w-5 h-5 text-[#A1A1AA]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('https://landyourweb.com');
                  alert('Link copied!');
                }}
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <svg className="w-5 h-5 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Back to home */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#71717A] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to homepage</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#52525B]">
          <p>© {new Date().getFullYear()} Land Your Web LLC. All rights reserved.</p>
          <a href="mailto:hello@landyourweb.com" className="hover:text-white transition-colors">
            hello@landyourweb.com
          </a>
        </div>
      </footer>
    </main>
  );
}

