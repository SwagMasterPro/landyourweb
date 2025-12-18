'use client';

import { useEffect } from 'react';

export default function Home() {
  // Scroll animation observer
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

    document.querySelectorAll('.scroll-animate, .scroll-animate-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 md:hidden">
        <a
          href="#book"
          className="block w-full py-3.5 text-center text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-lg hover-glow transition-all"
        >
          Book your 15-minute call →
        </a>
      </div>

      <main className="min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-emerald-500">land</span>yourweb
            </span>
            <a
              href="#book"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-lg hover-glow hover:bg-emerald-400 transition-all"
            >
              <span>Book a Call</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-28 pb-16 px-6 md:pt-40 md:pb-28 relative">
          {/* Background gradient */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-fade-in-up animate-pulse-glow">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Live in 14 days or €100/day back
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6 animate-fade-in-up delay-100">
              Turn your website into a
              <br className="hidden sm:block" />
              <span className="gradient-text">client-acquisition asset.</span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed mb-3 max-w-2xl animate-fade-in-up delay-200">
              If your website isn&apos;t bringing you booked clients, it&apos;s not doing its job.
            </p>
            <p className="text-neutral-500 leading-relaxed mb-8 max-w-2xl animate-fade-in-up delay-300">
              We build and launch a conversion-ready website in 14 days, then maintain and improve it so it keeps generating leads — or we keep fixing it for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
              <a
                href="#book"
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-lg hover-glow hover:bg-emerald-400 transition-all"
              >
                <span>Get your website live in 14 days</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center px-6 py-4 text-sm font-medium text-neutral-400 border border-neutral-800 rounded-lg hover:text-neutral-200 hover:border-neutral-700 transition-all"
              >
                See how it works
              </a>
            </div>
          </div>
        </section>

        {/* Tech Credibility Strip */}
        <section className="py-4 px-6 border-y border-neutral-800/50 bg-neutral-900/30">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-neutral-500">
            {['Next.js', 'Tailwind CSS', 'PageSpeed 90+', 'Core Web Vitals', 'Hosting included'].map((tech, i) => (
              <span key={tech} className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 px-6">
          <div className="max-w-3xl mx-auto text-center scroll-animate">
            <p className="text-neutral-400 text-sm leading-relaxed">
              Built using proven conversion structures we&apos;ve seen work across dozens of local service businesses.
              <span className="block mt-2 text-neutral-200 font-medium">No trends. No fluff. Just what gets clients booked.</span>
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 scroll-animate">The problem</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10 scroll-animate">
              Most business websites fail for 3 reasons:
            </h2>
            <div className="space-y-3">
              {[
                "They look nice but don't guide visitors to book",
                "They're slow, outdated, or broken on mobile",
                "Nobody maintains or improves them after launch"
              ].map((problem, i) => (
                <div 
                  key={i}
                  className="flex gap-4 p-5 bg-neutral-900/50 border border-neutral-800 rounded-xl hover-lift scroll-animate"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="text-red-500 font-mono font-bold shrink-0 text-sm">0{i + 1}</span>
                  <p className="text-neutral-300">{problem}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-xl scroll-animate">
              <p className="text-neutral-500 mb-2 text-sm">The result?</p>
              <p className="text-xl font-semibold text-neutral-100">
                Traffic comes in. Clients don&apos;t book.
              </p>
              <p className="text-neutral-500 mt-1 text-sm">Your website becomes decoration — not a business asset.</p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 px-6 md:py-24 bg-gradient-to-b from-neutral-900/50 to-transparent border-y border-neutral-800/50">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 scroll-animate">
              The Solution
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 scroll-animate">
              The Clients-Ready Website System™
            </h2>
            <p className="text-xl text-neutral-400 mb-6 scroll-animate">
              We don&apos;t &quot;design websites.&quot; We install client-acquisition systems.
            </p>
            <p className="text-neutral-500 mb-6 scroll-animate">
              Built to:
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                'Look credible & professional',
                'Load fast (PageSpeed 90+)',
                'Convert visitors into booked clients',
                'Improve over time with data'
              ].map((benefit, i) => (
                <div 
                  key={i}
                  className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-xl hover-lift scroll-animate-scale"
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <p className="text-sm font-medium text-neutral-200">{benefit}</p>
                </div>
              ))}
            </div>
            <p className="text-neutral-300 font-medium mb-8 scroll-animate">
              And we handle everything. You focus on your business.
            </p>
            <a
              href="#book"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-lg hover-glow hover:bg-emerald-400 transition-all scroll-animate"
            >
              <span>Book your 15-minute call</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 scroll-animate">What you get</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight scroll-animate">
                Everything you need. Nothing you don&apos;t.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: '⚡',
                  title: 'Website Build',
                  items: ['5–7 page conversion-focused site', 'Proven page structure', 'Mobile-first design', 'Booking / contact flow']
                },
                {
                  icon: '📊',
                  title: 'Performance & Tracking',
                  items: ['Google Analytics setup', 'Conversion tracking', 'Core Web Vitals optimized', 'Basic SEO setup']
                },
                {
                  icon: '🛡️',
                  title: 'Ongoing Growth',
                  items: ['Hosting included', 'Security & daily backups', 'Monthly updates', 'Conversion improvements']
                }
              ].map((card, i) => (
                <div 
                  key={i}
                  className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl hover-lift scroll-animate-scale"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-4 text-xl">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
                  <ul className="space-y-2.5 text-sm text-neutral-400">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-emerald-500 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-16 px-6 md:py-24 bg-gradient-to-b from-neutral-900/50 to-transparent border-y border-neutral-800/50">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 scroll-animate">How it works</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12 scroll-animate">
              From call to live in 14 days
            </h2>
            <div className="space-y-0">
              {[
                { time: '15 minutes', title: 'Book a Call', desc: "We review your business and current website (if any). We'll tell you honestly if this is a fit — no pressure, no games." },
                { time: 'Days 1–7', title: 'Website Sprint', desc: "You fill out a short intake form (10 min). We build the first version. One feedback round, that's it." },
                { time: 'Day 14', title: 'Launch & Grow', desc: "Your site goes live with tracking, speed optimization, and booking flow. We maintain and improve it monthly. You don't manage anything." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 scroll-animate" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-500 text-neutral-950 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-lg shadow-emerald-500/20">
                      {i + 1}
                    </div>
                    {i < 2 && <div className="w-px h-full bg-gradient-to-b from-emerald-500/50 to-neutral-800 my-3"></div>}
                  </div>
                  <div className={i < 2 ? 'pb-10' : ''}>
                    <p className="text-xs text-emerald-500 font-medium mb-1">{step.time}</p>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 scroll-animate">Is this for you?</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="scroll-animate">
                <h3 className="text-xl font-bold mb-6">This is for you if:</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    'You run a local service business (clinic, gym, professional services)',
                    'You want more booked clients — not "branding"',
                    'Your business is already making money',
                    "You're ready to invest in growth"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="scroll-animate" style={{ transitionDelay: '150ms' }}>
                <h3 className="text-xl font-bold mb-6 text-neutral-400">This is NOT for you if:</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    'You want to DIY or just need "a website"',
                    "You're looking for the cheapest option",
                    "You don't want ongoing improvement"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-500">
                      <span className="text-red-500 mt-0.5 shrink-0">✖</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-16 px-6 md:py-24 bg-gradient-to-b from-neutral-900/50 to-transparent border-y border-neutral-800/50">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 scroll-animate">Zero risk</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 scroll-animate">
              Our Guarantees
            </h2>
            <p className="text-neutral-500 mb-10 scroll-animate">We put our money where our mouth is.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: '⏱', title: '14-Day Launch', desc: 'Late? You get €100/day credited back.' },
                { icon: '🚀', title: 'Performance', desc: 'Under 80 PageSpeed mobile? We fix it free.' },
                { icon: '📈', title: 'Conversion Safety Net', desc: 'No leads in 30 days? We rewrite the homepage free.' },
                { icon: '🚪', title: '30-Day Exit', desc: 'Cancel within 30 days. Keep the website.' }
              ].map((guarantee, i) => (
                <div 
                  key={i}
                  className="p-5 bg-neutral-900/80 border border-emerald-500/20 rounded-xl hover-lift gradient-border scroll-animate-scale"
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{guarantee.icon}</span>
                    <h3 className="font-semibold">{guarantee.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-400">{guarantee.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 scroll-animate">
              <a
                href="#book"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-lg hover-glow hover:bg-emerald-400 transition-all"
              >
                <span>Book your 15-minute call</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 scroll-animate">Pricing</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 scroll-animate">
              Simple. Transparent. No surprises.
            </h2>
            <p className="text-neutral-500 mb-10 scroll-animate">One setup fee. One monthly fee. That&apos;s it.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-neutral-900/80 border border-neutral-800 rounded-xl hover-lift scroll-animate-scale">
                <p className="text-sm text-neutral-500 mb-1">One-Time Setup</p>
                <p className="text-5xl font-bold mb-2">€1,200</p>
                <p className="text-xs text-neutral-600">Website build, launch, tracking setup</p>
              </div>
              <div className="p-6 bg-neutral-900/80 border border-emerald-500/30 rounded-xl hover-lift relative scroll-animate-scale" style={{ transitionDelay: '100ms' }}>
                <div className="absolute -top-3 left-4 px-3 py-1 bg-emerald-500 text-neutral-950 text-xs font-bold rounded-full">
                  Required
                </div>
                <p className="text-sm text-neutral-500 mb-1">Monthly Growth</p>
                <p className="text-5xl font-bold mb-2">€199<span className="text-xl font-normal text-neutral-500">/mo</span></p>
                <p className="text-xs text-neutral-600">Hosting, security, updates, improvements</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-neutral-500 leading-relaxed scroll-animate">
              Minimum 3 months commitment. This is how results compound — websites decay without maintenance.
            </p>
          </div>
        </section>

        {/* Why landyourweb */}
        <section className="py-16 px-6 md:py-24 bg-gradient-to-b from-neutral-900/50 to-transparent border-y border-neutral-800/50">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 scroll-animate">Why us</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 scroll-animate">
              We&apos;re not like other agencies.
            </h2>
            <div className="space-y-4 text-neutral-400">
              {[
                'We don\'t sell "projects" and disappear',
                "We don't chase design trends",
                "We don't promise and underdeliver"
              ].map((item, i) => (
                <p key={i} className="flex items-center gap-3 scroll-animate" style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="text-red-500">✖</span>
                  {item}
                </p>
              ))}
            </div>
            <p className="mt-8 text-xl font-semibold text-neutral-100 scroll-animate">
              We build, launch, maintain, and improve.
              <span className="text-neutral-500 font-normal"> That&apos;s it.</span>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 scroll-animate">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10 scroll-animate">
              Common questions
            </h2>
            <div className="space-y-0 divide-y divide-neutral-800">
              {[
                { q: 'Do I really need monthly maintenance?', a: 'Yes. Websites decay — speed drops, security issues appear, competitors improve. Maintenance is how results compound instead of dying after launch.' },
                { q: 'What if I already have a website?', a: "We'll audit it on the call. If it's salvageable, we'll tell you. If not, we rebuild it properly. No upselling." },
                { q: 'What kind of businesses is this for?', a: 'Service-based businesses that want more booked clients: clinics, dentists, gyms, physiotherapists, local professionals. If clients finding and trusting you matters, this applies.' },
                { q: 'Is SEO included?', a: 'We include solid technical and on-page SEO foundation. Ongoing SEO campaigns are separate, but your site will be built to rank and convert.' },
                { q: 'How much of my time does this take?', a: 'About 10–15 minutes for the intake form and one short feedback round. We handle everything else.' },
                { q: 'What if I want to cancel?', a: "Cancel within 30 days and keep the website. After that, it's month-to-month — cancel anytime." }
              ].map((faq, i) => (
                <div key={i} className="py-5 scroll-animate" style={{ transitionDelay: `${i * 50}ms` }}>
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="book" className="py-20 px-6 md:py-28 bg-emerald-500 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 text-neutral-950 scroll-animate">
              If your website isn&apos;t bringing clients, fix it.
            </h2>
            <p className="text-neutral-800 mb-8 max-w-xl mx-auto scroll-animate">
              We&apos;ll build it, launch it, and maintain it — so you can focus on running your business.
            </p>
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-emerald-500 bg-neutral-950 rounded-xl hover:bg-neutral-900 transition-all shadow-2xl shadow-black/20 scroll-animate"
            >
              <span>Book your 15-minute call</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="mt-4 text-sm text-neutral-800/70 scroll-animate">
              No pressure. No sales games. Just a conversation.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-neutral-950 border-t border-neutral-800/50">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
            <span className="font-bold text-neutral-300">
              <span className="text-emerald-500">land</span>yourweb
            </span>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </footer>

        {/* Bottom padding for mobile sticky CTA */}
        <div className="h-20 md:hidden"></div>
      </main>
    </>
  );
}
