'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  return (
    <>
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/95 backdrop-blur-xl border-t border-white/5 md:hidden">
        <a href="#book" className="btn-premium w-full">
          <span>Book your call</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <main className="min-h-screen bg-black text-white overflow-x-hidden noise-overlay">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
            <a href="/" className="logo">
              <span className="logo-land">landyour</span>
              <span className="logo-web">web</span>
            </a>
            <a href="#book" className="hidden md:flex btn-premium py-3 px-6 text-sm">
              <span>Book a Call</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 md:pt-44 md:pb-28 lg:pt-52 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
          {/* Background effects */}
          <div className="hero-glow"></div>
          <div className="hero-glow-secondary"></div>
          <div className="absolute inset-0 bg-grid-premium"></div>
          
          {/* Floating elements - desktop only */}
          <div className="hidden lg:block hero-floating-badge top-[30%] left-[8%]" style={{ animationDelay: '0s' }}>
            <span>90+</span> PageSpeed Score
          </div>
          <div className="hidden lg:block hero-floating-badge top-[45%] right-[6%]" style={{ animationDelay: '2s' }}>
            Launch in <span>14 days</span>
          </div>
          <div className="hidden lg:block hero-floating-badge bottom-[25%] left-[12%]" style={{ animationDelay: '4s' }}>
            <span>€100/day</span> late penalty
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Trust indicator */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="quick-proof">
                <div className="quick-proof-avatars">
                  <div className="quick-proof-avatar">A</div>
                  <div className="quick-proof-avatar">B</div>
                  <div className="quick-proof-avatar">C</div>
                </div>
                <span>Trusted by local service businesses</span>
              </div>
            </div>

            {/* Headline - punchier, more direct */}
            <h1 className="hero-headline mb-6 animate-fade-in-up delay-100">
              Stop losing clients to a
              <br />
              <span className="gradient-text-animated">broken website.</span>
            </h1>

            {/* Subheadline - clearer value prop */}
            <p className="hero-subline mb-4 max-w-2xl mx-auto animate-fade-in-up delay-200">
              You&apos;re getting traffic. But visitors aren&apos;t booking.
              <br className="hidden sm:block" />
              <span className="text-white font-medium">That ends in 14 days.</span>
            </p>

            <p className="text-[#71717A] text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto animate-fade-in-up delay-300">
              We build conversion-focused websites for service businesses — then maintain and optimize them monthly. If you don&apos;t get leads, we fix it free.
            </p>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-400">
              <a href="#book" className="btn-premium group text-base py-4 px-8">
                <span>Book your free strategy call</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#how" className="btn-ghost text-base py-4 px-8">
                See how it works
              </a>
            </div>

            {/* Guarantee badge */}
            <div className="flex justify-center animate-fade-in-up delay-500">
              <div className="badge-premium">
                <span className="pulse-dot"></span>
                <span>Live in 14 days — or €100/day back. Guaranteed.</span>
              </div>
            </div>
          </div>
        </section>


        {/* Social Proof */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <p className="text-lg md:text-xl text-[#71717A] leading-relaxed mb-2">
              &ldquo;We stopped guessing and started converting.&rdquo;
            </p>
            <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed">
              Built using conversion frameworks proven across
              <span className="text-white font-medium"> clinics, gyms, and local service businesses.</span>
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 px-6 md:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#ea7126] text-sm font-semibold tracking-[0.2em] uppercase mb-5 scroll-reveal">The Problem</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight scroll-reveal">
                Most business websites fail
                <br className="hidden sm:block" />
                for 3 reasons:
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { num: '01', text: "They look nice but don't guide visitors to book" },
                { num: '02', text: "They're slow, outdated, or broken on mobile" },
                { num: '03', text: "Nobody maintains or improves them after launch" }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="glass-card p-7 flex gap-6 items-start scroll-reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="font-mono text-sm font-bold text-[#ef4444]/80 shrink-0 pt-0.5">{item.num}</span>
                  <p className="text-lg md:text-xl text-[#E4E4E7] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 accent-card p-10 text-center scroll-reveal">
              <p className="text-[#71717A] text-sm uppercase tracking-[0.15em] mb-3">The result?</p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                Traffic comes in. Clients don&apos;t.
              </p>
              <p className="text-[#71717A]">Your website becomes decoration — not a business asset.</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="divider-glow"></div>

        {/* Solution Section */}
        <section className="py-24 px-6 md:py-32 relative">
          <div className="absolute inset-0 bg-dots-premium opacity-30"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="text-[#ea7126] text-sm font-semibold tracking-[0.2em] uppercase mb-5 scroll-reveal">
              The Solution
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 scroll-reveal">
              The Clients-Ready
              <br />
              <span className="gradient-text">Website System™</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#A1A1AA] mb-10 scroll-reveal">
              We don&apos;t &quot;design websites.&quot;
              <span className="text-white font-medium"> We install client-acquisition systems.</span>
            </p>

            <p className="text-[#71717A] mb-8 scroll-reveal">Built to:</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                { icon: '✓', text: 'Look credible & professional' },
                { icon: '⚡', text: 'Load fast (PageSpeed 90+)' },
                { icon: '📈', text: 'Convert visitors into clients' },
                { icon: '🔄', text: 'Improve over time with data' }
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
              <span>Book your 15-minute call</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-24 px-6 md:py-32 bg-white/[0.015]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#ea7126] text-sm font-semibold tracking-[0.2em] uppercase mb-5 scroll-reveal">What You Get</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight scroll-reveal">
                Everything you need.
                <br className="hidden sm:block" />
                <span className="text-[#71717A]">Nothing you don&apos;t.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🚀',
                  title: 'Website Build',
                  items: ['5–7 page conversion-focused site', 'Proven page structure', 'Mobile-first design', 'Booking / contact flow'],
                  featured: false
                },
                {
                  icon: '📊',
                  title: 'Performance & Tracking',
                  items: ['Google Analytics setup', 'Conversion tracking', 'Core Web Vitals optimized', 'Basic SEO setup'],
                  featured: true
                },
                {
                  icon: '🛡️',
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
                        <span className="text-[#ea7126] mt-0.5 shrink-0">✓</span>
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
            <p className="text-[#ea7126] text-sm font-semibold tracking-[0.2em] uppercase mb-5 scroll-reveal">How It Works</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16 scroll-reveal">
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

        {/* Who It's For */}
        <section className="py-24 px-6 md:py-32 bg-white/[0.015]">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#ea7126] text-sm font-semibold tracking-[0.2em] uppercase mb-5 scroll-reveal">Is This For You?</p>
            
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
                        <span className="text-[#ea7126] text-sm">✔</span>
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
                        <span className="text-[#ef4444] text-sm">✖</span>
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
          <div className="absolute inset-0 bg-grid-premium opacity-30"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="text-[#ea7126] text-sm font-semibold tracking-[0.2em] uppercase mb-5 scroll-reveal">Zero Risk</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 scroll-reveal">
              Our Guarantees
            </h2>
            <p className="text-xl text-[#71717A] mb-14 scroll-reveal">We put our money where our mouth is.</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: '⏱', title: '14-Day Launch', desc: 'Late? You get €100/day credited back.' },
                { icon: '🚀', title: 'Performance', desc: 'Under 80 PageSpeed mobile? We fix it free.' },
                { icon: '📈', title: 'Conversion Safety Net', desc: 'No leads in 30 days? We rewrite the homepage free.' },
                { icon: '🚪', title: '30-Day Exit', desc: 'Cancel within 30 days. Keep the website.' }
              ].map((g, i) => (
                <div 
                  key={i}
                  className="accent-card p-7 scroll-reveal-scale"
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="icon-container">{g.icon}</div>
                    <h3 className="text-lg font-bold tracking-tight">{g.title}</h3>
                  </div>
                  <p className="text-[#A1A1AA]">{g.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center scroll-reveal">
              <a href="#book" className="btn-premium group">
                <span>Book your 15-minute call</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 px-6 md:py-32 bg-white/[0.015]">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#ea7126] text-sm font-semibold tracking-[0.2em] uppercase mb-5 scroll-reveal">Pricing</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 scroll-reveal">
              Simple. Transparent.
              <br />
              <span className="text-[#71717A]">No surprises.</span>
            </h2>
            <p className="text-xl text-[#71717A] mb-14 scroll-reveal">One setup fee. One monthly fee. That&apos;s it.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-10 scroll-reveal-scale">
                <p className="text-sm text-[#71717A] uppercase tracking-[0.15em] mb-4">One-Time Setup</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="stat-display text-white">€1,200</span>
                </div>
                <p className="text-[#71717A]">Website build, launch, tracking setup</p>
              </div>

              <div className="accent-card p-10 relative scroll-reveal-scale" style={{ transitionDelay: '100ms' }}>
                <div className="absolute -top-3 left-8 px-4 py-1.5 bg-gradient-to-r from-[#ea7126] to-[#b64514] text-white text-xs font-bold tracking-wide rounded-full">
                  REQUIRED
                </div>
                <p className="text-sm text-[#71717A] uppercase tracking-[0.15em] mb-4">Monthly Growth</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="stat-display gradient-text">€199</span>
                  <span className="text-xl text-[#71717A]">/month</span>
                </div>
                <p className="text-[#71717A]">Hosting, security, updates, improvements</p>
              </div>
            </div>

            <p className="mt-10 text-[#71717A] text-center scroll-reveal">
              Minimum 3 months commitment. This is how results compound.
            </p>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-24 px-6 md:py-32">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#ea7126] text-sm font-semibold tracking-[0.2em] uppercase mb-5 scroll-reveal">Why Us</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-12 scroll-reveal">
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
                    <span className="text-[#ef4444]">✖</span>
                  </span>
                  {item}
                </p>
              ))}
            </div>

            <div className="glass-card p-10 scroll-reveal">
              <p className="text-2xl md:text-3xl font-bold tracking-tight">
                We build, launch, maintain, and improve.
                <span className="text-[#71717A]"> That&apos;s it.</span>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 md:py-32 bg-white/[0.015]">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#ea7126] text-sm font-semibold tracking-[0.2em] uppercase mb-5 scroll-reveal">FAQ</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-14 scroll-reveal">
              Common questions
            </h2>

            <div className="space-y-0 divide-y divide-white/[0.08]">
              {[
                { q: 'Do I really need monthly maintenance?', a: 'Yes. Websites decay — speed drops, security issues appear, competitors improve. Maintenance is how results compound instead of dying after launch.' },
                { q: 'What if I already have a website?', a: "We'll audit it on the call. If it's salvageable, we'll tell you. If not, we rebuild it properly. No upselling." },
                { q: 'What kind of businesses is this for?', a: 'Service-based businesses that want more booked clients: clinics, dentists, gyms, physiotherapists, local professionals.' },
                { q: 'Is SEO included?', a: 'We include solid technical and on-page SEO foundation. Ongoing SEO campaigns are separate, but your site will be built to rank and convert.' },
                { q: 'How much of my time does this take?', a: 'About 10–15 minutes for the intake form and one short feedback round. We handle everything else.' },
                { q: 'What if I want to cancel?', a: "Cancel within 30 days and keep the website. After that, it's month-to-month — cancel anytime." }
              ].map((faq, i) => (
                <div key={i} className="py-7 scroll-reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                  <h3 className="text-lg font-semibold mb-3 tracking-tight">{faq.q}</h3>
                  <p className="text-[#A1A1AA] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="book" className="cta-section py-28 px-6 md:py-36">
          <div className="bg-pattern"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white scroll-reveal">
              If your website isn&apos;t bringing
              <br />
              clients, fix it.
            </h2>
            <p className="text-lg text-white/80 mb-12 max-w-xl mx-auto scroll-reveal">
              We&apos;ll build it, launch it, and maintain it — so you can focus on running your business.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-[#ea7126] bg-white rounded-2xl transition-all duration-300 hover:bg-[#f5f4f2] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] group scroll-reveal"
            >
              <span>Book your 15-minute call</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="mt-6 text-sm text-white/60 scroll-reveal">
              No pressure. No sales games. Just a conversation.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-black border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#52525B]">
            <a href="/" className="logo">
              <span className="logo-land">landyour</span>
              <span className="logo-web">web</span>
            </a>
            <p>© {new Date().getFullYear()} landyourweb. All rights reserved.</p>
          </div>
        </footer>

        {/* Mobile padding */}
        <div className="h-28 md:hidden"></div>
      </main>
    </>
  );
}
