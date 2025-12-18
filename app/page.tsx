'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate, .scroll-animate-scale, .scroll-animate-left').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/50 md:hidden">
        <a href="#book" className="btn-primary flex items-center justify-center gap-2 w-full text-sm">
          <span>Book your 15-minute call</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <main className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40 bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800/50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              <span className="text-emerald-400">land</span>
              <span className="text-zinc-100">yourweb</span>
            </a>
            <a href="#book" className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5">
              <span>Book a Call</span>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 md:pt-44 md:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid opacity-50"></div>
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Badge */}
            <div className="flex justify-center mb-8 animate-fade-in-up">
              <div className="badge badge-pulse pl-8">
                <span>Live in 14 days or €100/day back</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-[1.05] tracking-tight mb-6 animate-fade-in-up delay-100">
              Turn your website into a
              <br />
              <span className="gradient-text">client-acquisition asset.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-zinc-300 text-center leading-relaxed mb-4 max-w-2xl mx-auto animate-fade-in-up delay-200">
              If your website isn&apos;t bringing you booked clients, it&apos;s not doing its job.
            </p>

            <p className="text-zinc-500 text-center leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up delay-300">
              We build and launch a conversion-ready website in 14 days, then maintain and improve it so it keeps generating leads — or we keep fixing it for free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
              <a href="#book" className="btn-primary flex items-center justify-center gap-2 group">
                <span>Get your website live in 14 days</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#how" className="btn-secondary flex items-center justify-center">
                See how it works
              </a>
            </div>
          </div>
        </section>

        {/* Tech Credibility Strip */}
        <section className="py-6 px-6 border-y border-zinc-800/50 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-zinc-500">
              {[
                { icon: '⚡', label: 'Next.js' },
                { icon: '🎨', label: 'Tailwind CSS' },
                { icon: '📊', label: 'PageSpeed 90+' },
                { icon: '✓', label: 'Core Web Vitals' },
                { icon: '☁️', label: 'Hosting included' }
              ].map((item, i) => (
                <div 
                  key={item.label} 
                  className="flex items-center gap-2 animate-fade-in"
                  style={{ animationDelay: `${i * 100 + 500}ms` }}
                >
                  <span className="text-emerald-500">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center scroll-animate">
            <p className="text-lg text-zinc-400 leading-relaxed">
              Built using proven conversion structures we&apos;ve seen work across
              <span className="text-zinc-200 font-medium"> dozens of local service businesses.</span>
            </p>
            <p className="mt-3 text-emerald-400 font-medium">
              No trends. No fluff. Just what gets clients booked.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 px-6 md:py-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 scroll-animate">The Problem</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight scroll-animate">
                Most business websites fail for 3 reasons:
              </h2>
            </div>

            <div className="grid gap-4 mb-10">
              {[
                { num: '01', text: "They look nice but don't guide visitors to book" },
                { num: '02', text: "They're slow, outdated, or broken on mobile" },
                { num: '03', text: "Nobody maintains or improves them after launch" }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="card p-6 flex gap-5 items-start hover-lift scroll-animate"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="text-red-500/80 font-mono font-bold text-sm shrink-0 mt-0.5">{item.num}</span>
                  <p className="text-lg text-zinc-300">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="card-highlight p-8 text-center scroll-animate">
              <p className="text-zinc-500 text-sm uppercase tracking-wider mb-2">The result?</p>
              <p className="text-2xl md:text-3xl font-bold text-zinc-100 mb-2">
                Traffic comes in. Clients don&apos;t.
              </p>
              <p className="text-zinc-500">Your website becomes decoration — not a business asset.</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="divider-accent"></div>

        {/* Solution Section */}
        <section className="py-20 px-6 md:py-28 relative">
          <div className="absolute inset-0 bg-grid opacity-30"></div>
          <div className="max-w-4xl mx-auto relative">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 scroll-animate">
              The Solution
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 scroll-animate">
              The Clients-Ready Website System™
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 mb-8 scroll-animate">
              We don&apos;t &quot;design websites.&quot; We install client-acquisition systems.
            </p>

            <p className="text-zinc-500 mb-6 scroll-animate">Built to:</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: '✓', text: 'Look credible & professional' },
                { icon: '⚡', text: 'Load fast (PageSpeed 90+)' },
                { icon: '📈', text: 'Convert visitors into booked clients' },
                { icon: '🔄', text: 'Improve over time with data' }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="card p-5 flex items-center gap-4 hover-lift scroll-animate-scale"
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="icon-box shrink-0">{item.icon}</div>
                  <p className="font-medium text-zinc-200">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="text-lg text-zinc-300 font-medium mb-8 scroll-animate">
              And we handle everything. You focus on your business.
            </p>

            <a href="#book" className="btn-primary inline-flex items-center gap-2 group scroll-animate">
              <span>Book your 15-minute call</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 px-6 md:py-28 bg-zinc-900/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 scroll-animate">What You Get</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight scroll-animate">
                Everything you need. Nothing you don&apos;t.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🚀',
                  title: 'Website Build',
                  items: ['5–7 page conversion-focused site', 'Proven page structure', 'Mobile-first design', 'Booking / contact flow'],
                  highlight: false
                },
                {
                  icon: '📊',
                  title: 'Performance & Tracking',
                  items: ['Google Analytics setup', 'Conversion tracking', 'Core Web Vitals optimized', 'Basic SEO setup'],
                  highlight: true
                },
                {
                  icon: '🛡️',
                  title: 'Ongoing Growth',
                  items: ['Hosting included', 'Security & daily backups', 'Monthly updates', 'Conversion improvements'],
                  highlight: false
                }
              ].map((card, i) => (
                <div 
                  key={i}
                  className={`p-8 rounded-2xl hover-lift scroll-animate-scale ${card.highlight ? 'card-highlight' : 'card'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="icon-box mb-5">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-5">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-zinc-400">
                        <span className="text-emerald-500 shrink-0">✓</span>
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
        <section id="how" className="py-20 px-6 md:py-28 relative">
          <div className="absolute inset-0 bg-dots opacity-50"></div>
          <div className="max-w-4xl mx-auto relative">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 scroll-animate">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-14 scroll-animate">
              From call to live in 14 days
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
                  desc: "Your site goes live with tracking, speed optimization, and booking flow. We maintain and improve it monthly. You don't manage anything." 
                }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 scroll-animate" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-emerald-500 text-zinc-950 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/25 shrink-0">
                      {step.num}
                    </div>
                    {i < 2 && (
                      <div className="w-0.5 h-full min-h-[80px] bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent mt-4"></div>
                    )}
                  </div>
                  <div className={i < 2 ? 'pb-12' : ''}>
                    <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full mb-2">
                      {step.time}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-20 px-6 md:py-28 bg-zinc-900/40">
          <div className="max-w-4xl mx-auto">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 scroll-animate">Is This For You?</p>
            
            <div className="grid md:grid-cols-2 gap-10 mt-10">
              <div className="scroll-animate">
                <h3 className="text-2xl font-bold mb-6 glow-line pb-4">This is for you if:</h3>
                <ul className="space-y-4">
                  {[
                    'You run a local service business (clinic, gym, professional services)',
                    'You want more booked clients — not "branding"',
                    'Your business is already making money',
                    "You're ready to invest in growth"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-emerald-400 text-sm">✔</span>
                      </span>
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="scroll-animate" style={{ transitionDelay: '150ms' }}>
                <h3 className="text-2xl font-bold mb-6 text-zinc-500 pb-4">This is NOT for you if:</h3>
                <ul className="space-y-4">
                  {[
                    'You want to DIY or just need "a website"',
                    "You're looking for the cheapest option",
                    "You don't want ongoing improvement"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-red-400 text-sm">✖</span>
                      </span>
                      <span className="text-zinc-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-20 px-6 md:py-28 relative">
          <div className="absolute inset-0 bg-grid opacity-30"></div>
          <div className="max-w-4xl mx-auto relative">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 scroll-animate">Zero Risk</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 scroll-animate">
              Our Guarantees
            </h2>
            <p className="text-xl text-zinc-500 mb-12 scroll-animate">We put our money where our mouth is.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '⏱', title: '14-Day Launch', desc: 'Late? You get €100/day credited back.' },
                { icon: '🚀', title: 'Performance', desc: 'Under 80 PageSpeed mobile? We fix it free.' },
                { icon: '📈', title: 'Conversion Safety Net', desc: 'No leads in 30 days? We rewrite the homepage free.' },
                { icon: '🚪', title: '30-Day Exit', desc: 'Cancel within 30 days. Keep the website.' }
              ].map((g, i) => (
                <div 
                  key={i}
                  className="card-highlight p-6 hover-lift gradient-border scroll-animate-scale"
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="icon-box">{g.icon}</div>
                    <h3 className="text-lg font-bold">{g.title}</h3>
                  </div>
                  <p className="text-zinc-400">{g.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center scroll-animate">
              <a href="#book" className="btn-primary inline-flex items-center gap-2 group">
                <span>Book your 15-minute call</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6 md:py-28 bg-zinc-900/40">
          <div className="max-w-4xl mx-auto">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 scroll-animate">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 scroll-animate">
              Simple. Transparent. No surprises.
            </h2>
            <p className="text-xl text-zinc-500 mb-12 scroll-animate">One setup fee. One monthly fee. That&apos;s it.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-8 hover-lift scroll-animate-scale">
                <p className="text-sm text-zinc-500 uppercase tracking-wider mb-2">One-Time Setup</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-5xl md:text-6xl font-bold number-highlight">€1,200</span>
                </div>
                <p className="text-zinc-500">Website build, launch, tracking setup</p>
              </div>

              <div className="card-highlight p-8 hover-lift relative scroll-animate-scale" style={{ transitionDelay: '100ms' }}>
                <div className="absolute -top-3 left-6 px-4 py-1.5 bg-emerald-500 text-zinc-950 text-xs font-bold rounded-full">
                  Required
                </div>
                <p className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Monthly Growth</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-5xl md:text-6xl font-bold gradient-text number-highlight">€199</span>
                  <span className="text-xl text-zinc-500">/month</span>
                </div>
                <p className="text-zinc-500">Hosting, security, updates, improvements</p>
              </div>
            </div>

            <p className="mt-8 text-zinc-500 text-center scroll-animate">
              Minimum 3 months commitment. This is how results compound — websites decay without maintenance.
            </p>
          </div>
        </section>

        {/* Why landyourweb */}
        <section className="py-20 px-6 md:py-28 relative">
          <div className="max-w-4xl mx-auto">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 scroll-animate">Why Us</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 scroll-animate">
              We&apos;re not like other agencies.
            </h2>

            <div className="space-y-4 mb-10">
              {[
                'We don\'t sell "projects" and disappear',
                "We don't chase design trends",
                "We don't promise and underdeliver"
              ].map((item, i) => (
                <p key={i} className="flex items-center gap-4 text-lg text-zinc-500 scroll-animate" style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-red-400">✖</span>
                  </span>
                  {item}
                </p>
              ))}
            </div>

            <div className="card p-8 scroll-animate">
              <p className="text-2xl md:text-3xl font-bold text-zinc-100">
                We build, launch, maintain, and improve.
                <span className="text-zinc-500 font-normal"> That&apos;s it.</span>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 md:py-28 bg-zinc-900/40">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 scroll-animate">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 scroll-animate">
              Common questions
            </h2>

            <div className="space-y-0 divide-y divide-zinc-800">
              {[
                { q: 'Do I really need monthly maintenance?', a: 'Yes. Websites decay — speed drops, security issues appear, competitors improve. Maintenance is how results compound instead of dying after launch.' },
                { q: 'What if I already have a website?', a: "We'll audit it on the call. If it's salvageable, we'll tell you. If not, we rebuild it properly. No upselling." },
                { q: 'What kind of businesses is this for?', a: 'Service-based businesses that want more booked clients: clinics, dentists, gyms, physiotherapists, local professionals. If clients finding and trusting you matters, this applies.' },
                { q: 'Is SEO included?', a: 'We include solid technical and on-page SEO foundation. Ongoing SEO campaigns are separate, but your site will be built to rank and convert.' },
                { q: 'How much of my time does this take?', a: 'About 10–15 minutes for the intake form and one short feedback round. We handle everything else.' },
                { q: 'What if I want to cancel?', a: "Cancel within 30 days and keep the website. After that, it's month-to-month — cancel anytime." }
              ].map((faq, i) => (
                <div key={i} className="py-6 scroll-animate" style={{ transitionDelay: `${i * 50}ms` }}>
                  <h3 className="text-lg font-semibold mb-3">{faq.q}</h3>
                  <p className="text-zinc-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="book" className="py-24 px-6 md:py-32 bg-emerald-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-400/20 to-transparent pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 text-zinc-950 scroll-animate">
              If your website isn&apos;t bringing clients, fix it.
            </h2>
            <p className="text-lg text-zinc-800 mb-10 max-w-xl mx-auto scroll-animate">
              We&apos;ll build it, launch it, and maintain it — so you can focus on running your business.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-emerald-400 bg-zinc-950 rounded-2xl hover:bg-zinc-900 transition-all shadow-2xl shadow-black/30 group scroll-animate"
            >
              <span>Book your 15-minute call</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="mt-5 text-sm text-zinc-800/80 scroll-animate">
              No pressure. No sales games. Just a conversation.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 bg-zinc-950 border-t border-zinc-800/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
            <span className="text-lg font-bold">
              <span className="text-emerald-400">land</span>
              <span className="text-zinc-300">yourweb</span>
            </span>
            <p>© {new Date().getFullYear()} landyourweb. All rights reserved.</p>
          </div>
        </footer>

        {/* Bottom padding for mobile sticky CTA */}
        <div className="h-24 md:hidden"></div>
      </main>
    </>
  );
}
