'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  IconCheck, 
  IconX, 
  IconBolt, 
  IconTrendingUp, 
  IconRefresh, 
  IconRocket, 
  IconChart, 
  IconShield, 
  IconClock, 
  IconDoor,
  IconChevronDown,
  IconTarget,
  IconLayers,
  IconCode,
  IconAlertCircle,
  IconMonitor,
  IconSettings
} from './components/icons';

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    document.querySelectorAll('.scroll-reveal, .scroll-reveal-scale').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Unified CTA text for consistency
  const primaryCTA = "Get Your Free Website Audit";
  const primaryCTAShort = "Get Free Audit";

  return (
    <>
      {/* Mobile Sticky CTA - Clean, no desperation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-gradient-to-t from-black via-black/95 to-transparent md:hidden">
        <a href="#book" className="btn-premium w-full py-4 min-h-[52px]">
          <span>Book Your Free Call</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <main className="min-h-screen bg-black text-white overflow-x-hidden noise-overlay">
        {/* Navigation - Enhanced with nav links */}
        <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
            <a href="/" className="logo">
              <span className="logo-land">landyour</span>
              <span className="logo-web">web</span>
            </a>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how" className="nav-link">How It Works</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#faq" className="nav-link">FAQ</a>
              <a href="#book" className="btn-premium py-3 px-6 text-sm">
                <span>Book a Call</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section - Phase 2: Refined copy with emotional hook */}
        <section className="relative pt-32 pb-20 px-6 md:pt-44 md:pb-28 lg:pt-52 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
          {/* Clean gradient background */}
          <div className="hero-gradient"></div>
          <div className="hero-accent-line hidden md:block"></div>
          <div className="hero-accent-line-2 hidden md:block"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Simple eyebrow - Avatar specific */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot"></span>
                <span>For dentists, clinics, gyms, and local pros</span>
              </div>
            </div>

            {/* Headline - Emotional hook from avatar research */}
            <h1 className="hero-headline mb-8 animate-fade-in-up delay-100">
              If your website didn&apos;t book a client this month,
              <br />
              <span className="gradient-text">it&apos;s just decoration.</span>
            </h1>

            {/* Subheadline - Clearer value prop with timeframe */}
            <p className="text-xl md:text-2xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              We build websites that actually book clients — live in 14 days.
              <span className="text-white"> No inquiries in 30 days? We fix it free.</span>
            </p>

            {/* Single CTA - Unified */}
            <div className="flex flex-col items-center gap-4 mb-8 animate-fade-in-up delay-300">
              <a href="#book" className="btn-premium group text-base py-4 px-10">
                <span>{primaryCTA}</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              {/* Risk reversal badge */}
              <div className="flex items-center gap-2 text-sm text-[#71717A]">
                <IconShield className="w-4 h-4 text-[#ea7126]" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>

            {/* Micro-proof strip - Real credentials */}
            <p className="text-sm text-[#52525B] animate-fade-in-up delay-400">
              4 years building websites · Loads in under 2 seconds · 14 days to launch
            </p>
          </div>
        </section>


        {/* Metrics Strip - Real credentials */}
        <section className="py-16 px-6 border-y border-white/[0.04]">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">4</p>
                <p className="text-xs uppercase tracking-wider text-[#52525B]">Years building websites</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">&lt;2s</p>
                <p className="text-xs uppercase tracking-wider text-[#52525B]">Page load time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">300%</p>
                <p className="text-xs uppercase tracking-wider text-[#52525B]">Conversion boost</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">14</p>
                <p className="text-xs uppercase tracking-wider text-[#52525B]">Days to launch</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust signals strip - Avatar-friendly language */}
        <section className="py-6 px-6 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-[#52525B]">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#ea7126]"></span>
                Loads in under 2 seconds
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#ea7126]"></span>
                Fast, reliable hosting
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#ea7126]"></span>
                We track where your clients come from
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#ea7126]"></span>
                Secure booking forms
              </span>
            </div>
          </div>
        </section>

        {/* Portfolio - Real Work */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow text-center mb-4 scroll-reveal">Our Work</p>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 tracking-tight scroll-reveal">
              See what we build
            </h2>
            
            <div className="browser-mockup scroll-reveal-scale max-w-3xl mx-auto">
              <div className="browser-mockup-header">
                <span className="browser-dot red"></span>
                <span className="browser-dot yellow"></span>
                <span className="browser-dot green"></span>
                <div className="browser-url-bar">radiusvet.ro</div>
              </div>
              <div className="browser-mockup-content p-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/radiusvetdemo.png" 
                  alt="RadiusVet - Veterinary Clinic Website" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="text-center mt-8 scroll-reveal">
              <p className="text-lg font-semibold text-white mb-1">RadiusVet — Veterinary Clinic</p>
              <p className="text-[#71717A] mb-4">Modern website with online appointment booking</p>
              <a 
                href="https://roaringtigermedia.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#ea7126] hover:underline"
              >
                <span>See more of our work</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-6 bg-white/[0.02]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-8 scroll-reveal">Real Results</p>
            <blockquote className="scroll-reveal">
              <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
                &ldquo;They delivered a beautiful, high-performance website that perfectly represents our brand.&rdquo;
              </p>
              <footer className="flex flex-col items-center">
                <p className="text-lg font-semibold text-white">Emily Rodriguez</p>
                <p className="text-[#71717A] mb-3">Marketing Director</p>
                <p className="inline-flex items-center gap-2 px-4 py-2 bg-[#ea7126]/10 border border-[#ea7126]/20 rounded-full text-sm">
                  <span className="text-[#ea7126] font-semibold">300% increase in conversions</span>
                </p>
              </footer>
            </blockquote>
            <p className="text-xs text-[#52525B] mt-8 scroll-reveal">From our previous work at Roaring Tiger Media</p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 px-6 md:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="eyebrow mb-5 scroll-reveal">The Problem</p>
              <h2 className="section-title scroll-reveal">
                Most business websites fail
                <br className="hidden sm:block" />
                for 3 reasons:
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { icon: <IconTarget className="w-5 h-5" />, text: "They look nice but don't guide visitors to book" },
                { icon: <IconMonitor className="w-5 h-5" />, text: "It loads slowly or looks broken on phones" },
                { icon: <IconSettings className="w-5 h-5" />, text: "Your web designer disappeared after launch" }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="glass-card p-6 flex gap-5 items-center scroll-reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ef4444]/10 flex items-center justify-center shrink-0 text-[#ef4444]">
                    {item.icon}
                  </div>
                  <p className="text-lg text-[#E4E4E7] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 card-feature p-10 md:p-14 text-center scroll-reveal">
              <p className="text-overline text-[#52525B] mb-4">The result?</p>
              <p className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                You&apos;re paying for traffic that doesn&apos;t convert.
              </p>
              <p className="text-[#52525B] max-w-md mx-auto">Your website becomes decoration — not a business asset.</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="divider-glow"></div>

        {/* Solution Section */}
        <section className="py-24 px-6 md:py-32 relative">
          <div className="absolute inset-0 bg-mesh"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="eyebrow mb-5 scroll-reveal">
              The Solution
            </p>
            <h2 className="section-title mb-5 scroll-reveal">
              The Clients-Ready
              <br />
              <span className="gradient-text">Website System™</span>
            </h2>
            <p className="section-subtitle mb-10 scroll-reveal">
              We don&apos;t &quot;design websites.&quot;
              <span className="text-white font-medium"> We install client-acquisition systems.</span>
            </p>

            <p className="text-[#71717A] mb-8 scroll-reveal">Built to:</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                { icon: <IconTarget className="w-5 h-5 text-[#ea7126]" />, text: 'Look credible & professional' },
                { icon: <IconBolt className="w-5 h-5 text-[#ea7126]" />, text: 'Load in under 2 seconds' },
                { icon: <IconTrendingUp className="w-5 h-5 text-[#ea7126]" />, text: 'Turn more visitors into booked clients' },
                { icon: <IconRefresh className="w-5 h-5 text-[#ea7126]" />, text: 'Improve over time with data' }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="glass-card p-6 flex items-center gap-5 scroll-reveal-scale"
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="icon-container">{item.icon}</div>
                  <p className="font-medium text-[#E4E4E7]">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="text-lg text-[#E4E4E7] mb-10 scroll-reveal">
              And we handle everything. <span className="text-[#71717A]">You focus on your business.</span>
            </p>

            <a href="#book" className="btn-premium group scroll-reveal">
              <span>{primaryCTA}</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="divider-gradient"></div>

        {/* What You Get */}
        <section className="py-24 px-6 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="eyebrow mb-5 scroll-reveal">What You Get</p>
              <h2 className="section-title scroll-reveal">
                Everything you need.
                <br className="hidden sm:block" />
                <span className="text-[#52525B]">Nothing you don&apos;t.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <IconCode className="w-5 h-5 text-[#ea7126]" />,
                  title: 'Website Build',
                  items: ['5–7 page conversion-focused site', 'Proven page structure', 'Mobile-first design', 'Booking / contact flow'],
                  featured: false
                },
                {
                  icon: <IconChart className="w-5 h-5 text-[#ea7126]" />,
                  title: 'Performance & Tracking',
                  items: ['We track where your clients come from', 'Conversion tracking', 'Loads in under 2 seconds', 'Basic SEO setup'],
                  featured: true
                },
                {
                  icon: <IconShield className="w-5 h-5 text-[#ea7126]" />,
                  title: 'Ongoing Growth',
                  items: ['Hosting included', 'Security & daily backups', 'Monthly updates', 'Conversion improvements'],
                  featured: false
                }
              ].map((card, i) => (
                <div 
                  key={i}
                  className={`p-8 rounded-[24px] scroll-reveal-scale ${card.featured ? 'accent-card' : 'glass-card'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="icon-container mb-6">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-6 tracking-tight">{card.title}</h3>
                  <ul className="space-y-4">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-[#A1A1AA]">
                        <IconCheck className="w-4 h-4 text-[#ea7126] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-24 px-6 md:py-32 relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="eyebrow mb-5 scroll-reveal">How It Works</p>
            <h2 className="section-title mb-16 scroll-reveal">
              From call to live
              <br />
              <span className="gradient-text">in 14 days</span>
            </h2>

            <div className="space-y-0">
              {[
                { 
                  num: '1', 
                  time: '15 minutes', 
                  title: 'Book a Call', 
                  desc: "We review your business and current website (if any). We'll tell you honestly if this is a fit — no pressure, no games." 
                },
                { 
                  num: '2', 
                  time: 'Days 1–7', 
                  title: 'Website Sprint', 
                  desc: "You fill out a short intake form (10 min). We build the first version. One feedback round, that's it." 
                },
                { 
                  num: '3', 
                  time: 'Day 14', 
                  title: 'Launch & Grow', 
                  desc: "Your site goes live with tracking, speed optimization, and booking flow. We maintain and improve it monthly." 
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 scroll-reveal" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="flex flex-col items-center">
                    <div className="step-indicator shrink-0">{step.num}</div>
                    {i < 2 && (
                      <div className="w-[2px] flex-1 min-h-[100px] mt-5 bg-gradient-to-b from-[#ea7126]/60 via-[#ea7126]/20 to-transparent"></div>
                    )}
                  </div>
                  <div className={i < 2 ? 'pb-14' : ''}>
                    <div className="time-badge mb-3">{step.time}</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-[#A1A1AA] leading-relaxed max-w-lg">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="divider-gradient"></div>

        {/* Who It's For */}
        <section className="py-24 px-6 md:py-32">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow mb-5 scroll-reveal">Is This For You?</p>
            
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div className="scroll-reveal">
                <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight glow-line pb-5">
                  This is for you if:
                </h3>
                <ul className="space-y-5">
                  {[
                    'You run a local service business (clinic, gym, professional services)',
                    'You want more booked clients — not "branding"',
                    'Your business is already making money',
                    "You're ready to invest in growth"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-7 h-7 bg-[#ea7126]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <IconCheck className="w-4 h-4 text-[#ea7126]" />
                      </span>
                      <span className="text-[#E4E4E7]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="scroll-reveal" style={{ transitionDelay: '150ms' }}>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight text-[#52525B] pb-5">
                  This is NOT for you if:
                </h3>
                <ul className="space-y-5">
                  {[
                    'You want to DIY or just need "a website"',
                    "You're looking for the cheapest option",
                    "You don't want ongoing improvement"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-7 h-7 bg-[#ef4444]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <IconX className="w-4 h-4 text-[#ef4444]" />
                      </span>
                      <span className="text-[#71717A]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-24 px-6 md:py-32 relative">
          <div className="absolute inset-0 bg-mesh"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="eyebrow mb-5 scroll-reveal">Zero Risk</p>
            <h2 className="section-title mb-5 scroll-reveal">
              Our Guarantees
            </h2>
            <p className="section-subtitle mb-14 scroll-reveal">We put our money where our mouth is.</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: <IconClock className="w-6 h-6" />, title: '14-Day Launch', desc: 'Late? We pay YOU $100/day.' },
                { icon: <IconRocket className="w-6 h-6" />, title: 'Speed', desc: 'If your site takes longer than 3 seconds to load, we fix it free.' },
                { icon: <IconTrendingUp className="w-6 h-6" />, title: 'Results', desc: 'No inquiries in 30 days? We revise until you get them — free.' },
                { icon: <IconDoor className="w-6 h-6" />, title: '30-Day Exit', desc: 'Cancel in 30 days. Keep the website.' }
              ].map((g, i) => (
                <div 
                  key={i}
                  className="card-elevated p-8 scroll-reveal-scale group"
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ea7126]/20 to-[#ea7126]/5 flex items-center justify-center mb-5 text-[#ea7126] group-hover:from-[#ea7126]/30 group-hover:to-[#ea7126]/10 transition-all duration-300">
                    {g.icon}
                  </div>
                  <h3 className="text-lg font-bold tracking-snug mb-2">{g.title}</h3>
                  <p className="text-[#71717A]">{g.desc}</p>
                </div>
              ))}
            </div>

            {/* Inquiry definition */}
            <p className="mt-8 text-sm text-[#52525B] text-center scroll-reveal">
              What&apos;s an inquiry? Someone who fills your contact form, calls you, or books through your website.
            </p>

            <div className="mt-10 text-center scroll-reveal">
              <a href="#book" className="btn-premium group">
                <span>{primaryCTA}</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="divider-gradient"></div>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-6 md:py-32">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow mb-5 scroll-reveal">Pricing</p>
            <h2 className="section-title mb-4 scroll-reveal">
              Simple. Transparent.
              <br />
              <span className="text-[#52525B]">No surprises.</span>
            </h2>
            <p className="section-subtitle mb-6 scroll-reveal">One setup fee. One monthly fee. That&apos;s it.</p>
            
            {/* Value context */}
            <p className="text-sm text-[#71717A] mb-14 scroll-reveal">
              Most agencies take 2-3 months and charge $3,000+. We do it in 14 days.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-elevated p-10 scroll-reveal-scale">
                <p className="text-overline text-[#52525B] mb-4">One-Time Setup</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="stat-display text-white">$1,200</span>
                </div>
                <p className="text-xs text-[#ea7126] mb-4">1 new client = site paid off</p>
                <p className="text-[#71717A] mb-6">Website build, launch, tracking setup</p>
                <ul className="space-y-3">
                  {['5-7 page website', 'Built to book clients', 'Mobile-first design', 'We track where clients come from'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                      <IconCheck className="w-4 h-4 text-[#52525B]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-feature p-10 relative scroll-reveal-scale" style={{ transitionDelay: '100ms' }}>
                {/* Popular badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-[#ea7126] text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
                <p className="text-overline text-[#ea7126] mb-4 mt-2">Monthly Growth</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="stat-display gradient-text">$199</span>
                  <span className="text-lg text-[#52525B]">/month</span>
                </div>
                <p className="text-[#71717A] mb-6">Hosting, security, updates, improvements</p>
                <ul className="space-y-3">
                  {['Fast, reliable hosting', 'Security monitoring', 'Monthly updates', 'Conversion improvements'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                      <IconCheck className="w-4 h-4 text-[#ea7126]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Capacity indicator - honest */}
            <div className="mt-10 text-center scroll-reveal">
              <p className="inline-flex items-center gap-2 px-4 py-2 bg-[#ea7126]/10 border border-[#ea7126]/20 rounded-full text-sm">
                <span className="w-2 h-2 bg-[#ea7126] rounded-full"></span>
                <span className="text-[#ea7126] font-medium">We take on 4 projects per month to ensure quality</span>
              </p>
            </div>

            <p className="mt-6 text-[#52525B] text-center text-sm scroll-reveal">
              Minimum 3 months commitment. This is how results compound.
            </p>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-24 px-6 md:py-32">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow mb-5 scroll-reveal">Why Us</p>
            <h2 className="section-title mb-12 scroll-reveal">
              We&apos;re not like other agencies.
            </h2>

            <div className="space-y-5 mb-12">
              {[
                'We don\'t sell "projects" and disappear',
                "We don't chase design trends",
                "We don't promise and underdeliver"
              ].map((item, i) => (
                <p key={i} className="flex items-center gap-5 text-lg text-[#71717A] scroll-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="w-9 h-9 bg-[#ef4444]/10 rounded-full flex items-center justify-center shrink-0">
                    <IconX className="w-4 h-4 text-[#ef4444]" />
                  </span>
                  {item}
                </p>
              ))}
            </div>

            <div className="card-feature p-10 md:p-12 scroll-reveal">
              <p className="text-2xl md:text-3xl font-bold tracking-tight leading-snug">
                We build, launch, maintain, and improve.
                <span className="text-[#52525B]"> That&apos;s it.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-24 px-6 md:py-32 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow text-center mb-5 scroll-reveal">Who&apos;s Behind This</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12 scroll-reveal">
              <div className="text-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#ea7126]/20 to-[#ea7126]/5 border border-[#ea7126]/20 flex items-center justify-center mb-4 mx-auto overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/stefan.jpg" 
                    alt="Stefan - Founder" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<span class="text-3xl font-bold text-[#ea7126]">S</span>';
                    }}
                  />
                </div>
                <p className="font-semibold text-white">Stefan</p>
              </div>
              <div className="text-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#ea7126]/20 to-[#ea7126]/5 border border-[#ea7126]/20 flex items-center justify-center mb-4 mx-auto overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/andreea.jpg" 
                    alt="Andreea - Co-founder" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<span class="text-3xl font-bold text-[#ea7126]">A</span>';
                    }}
                  />
                </div>
                <p className="font-semibold text-white">Andreea</p>
              </div>
            </div>
            <div className="card-feature p-10 md:p-12 text-center scroll-reveal">
              <p className="text-xl md:text-2xl text-[#E4E4E7] leading-relaxed mb-6">
                &ldquo;After 4 years building websites as co-founders of Roaring Tiger Media, we noticed something: most local businesses have websites that look nice but don&apos;t bring clients.
              </p>
              <p className="text-xl md:text-2xl text-[#E4E4E7] leading-relaxed mb-8">
                Land Your Web is our mission to fix that. We only build websites that book clients. If yours doesn&apos;t, we haven&apos;t done our job.&rdquo;
              </p>
              <p className="text-[#71717A]">— Stefan & Andreea, Founders</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="divider-gradient"></div>

        {/* FAQ */}
        <section id="faq" className="py-24 px-6 md:py-32">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow mb-5 scroll-reveal">FAQ</p>
            <h2 className="section-title mb-14 scroll-reveal">
              Common questions
            </h2>

            <div className="space-y-0">
              {[
                { q: "I've never heard of you. How do I know you can deliver?", a: "We've been building websites for 4 years as co-founders of Roaring Tiger Media. Land Your Web is our specialized service for local businesses. Check our portfolio — or just use our 30-day guarantee. Zero risk." },
                { q: 'Do I really need monthly maintenance?', a: 'Yes. Websites decay — speed drops, security issues appear, competitors improve. Maintenance is how results compound instead of dying after launch.' },
                { q: 'What if I already have a website?', a: "We'll audit it on the call. If it's salvageable, we'll tell you. If not, we rebuild it properly. No upselling." },
                { q: 'What kind of businesses is this for?', a: 'Service-based businesses that want more booked clients: clinics, dentists, gyms, physiotherapists, local professionals.' },
                { q: "What counts as an 'inquiry'?", a: "Anyone who fills your contact form, calls your number, or books through your website. We set up tracking so you know exactly where they came from." },
                { q: 'How is this different from Wix or Squarespace?', a: 'Those are DIY tools. We build custom sites with proven structures that actually convert — then maintain and improve them. You get a partner, not a template.' },
                { q: 'Which countries do you work with?', a: 'We work with English-speaking businesses worldwide: USA, UK, Canada, Australia, New Zealand, and across the EU. All communication is in English, and our process is designed for remote collaboration.' },
                { q: 'Is SEO included?', a: 'We include solid technical and on-page SEO foundation. Ongoing SEO campaigns are separate, but your site will be built to rank and convert.' },
                { q: 'How much of my time does this take?', a: 'About 10–15 minutes for the intake form and one short feedback round. We handle everything else.' },
                { q: 'What if I need changes after launch?', a: 'Minor updates are included in your monthly plan. Larger changes are scoped separately, but we keep it fair and transparent.' },
                { q: 'What if I want to cancel?', a: "Cancel within 30 days and keep the website. After that, it's month-to-month — cancel anytime." }
              ].map((faq, i) => (
                <div 
                  key={i} 
                  className="border-b border-white/[0.06] scroll-reveal" 
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <h3 className="text-lg font-semibold tracking-snug pr-8 group-hover:text-white transition-colors">{faq.q}</h3>
                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? 'bg-[#ea7126] border-[#ea7126] rotate-180' : 'group-hover:border-white/20'}`}>
                      <IconChevronDown className={`w-4 h-4 transition-colors ${openFaq === i ? 'text-white' : 'text-[#52525B]'}`} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${openFaq === i ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                    <p className="text-[#71717A] leading-relaxed pr-12">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Phase 5: Unified CTA with urgency */}
        <section id="book" className="relative py-28 px-6 md:py-36 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ea7126] via-[#d85f1c] to-[#b64514]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)]"></div>
          
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white scroll-reveal">
              If your website isn&apos;t bringing
              <br />
              clients, fix it.
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto scroll-reveal">
              We&apos;ll build it, launch it, and maintain it — so you can focus on running your business.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-base font-semibold text-[#1a1a1a] bg-white rounded-xl transition-all duration-300 hover:bg-[#f5f5f5] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 group scroll-reveal"
            >
              <span>{primaryCTA}</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="mt-6 text-sm text-white/70 scroll-reveal">
              Free 15-minute call · No obligation · Currently accepting new clients
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 bg-black border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto">
            {/* Main footer content */}
            <div className="flex flex-col items-center text-center mb-12">
              <a href="/" className="logo mb-4">
                <span className="logo-land">landyour</span>
                <span className="logo-web">web</span>
              </a>
              
              <p className="text-sm text-[#52525B] mb-8">4 years building websites</p>
              
              {/* Navigation links */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
                <a href="#how" className="text-sm text-[#71717A] hover:text-white transition-colors">How It Works</a>
                <a href="#pricing" className="text-sm text-[#71717A] hover:text-white transition-colors">Pricing</a>
                <a href="#faq" className="text-sm text-[#71717A] hover:text-white transition-colors">FAQ</a>
                <a href="#book" className="text-sm text-[#71717A] hover:text-white transition-colors">Contact</a>
              </div>
              
              {/* Contact email */}
              <a href="mailto:hello@landyourweb.com" className="text-[#A1A1AA] hover:text-[#ea7126] transition-colors mb-2">
                hello@landyourweb.com
              </a>
              <p className="text-xs text-[#52525B] mb-8">
                Serving local businesses in the US and Europe · We respond within 24 hours
              </p>
            </div>
            
            {/* Bottom bar */}
            <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#52525B]">
              <p>© {new Date().getFullYear()} Land Your Web LLC. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile padding */}
        <div className="h-28 md:hidden"></div>
      </main>
    </>
  );
}
