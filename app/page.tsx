export default function Home() {
  return (
    <>
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-neutral-950 border-t border-neutral-800 md:hidden">
        <a
          href="#book"
          className="block w-full py-3 text-center text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
        >
          Book your 15-minute call →
        </a>
      </div>

      <main className="min-h-screen bg-neutral-950 text-neutral-100">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40 bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-900">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight">landyourweb</span>
            <a
              href="#book"
              className="hidden md:inline-block px-4 py-2 text-sm font-medium text-neutral-950 bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
            >
              Book a Call
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-28 pb-16 px-6 md:pt-36 md:pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-fade-in">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Live in 14 days or €100/day back
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6 animate-fade-in delay-100">
              Turn your website into a
              <br className="hidden sm:block" />
              <span className="text-emerald-400">client-acquisition asset.</span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed mb-3 max-w-2xl animate-fade-in delay-200">
              If your website isn&apos;t bringing you booked clients, it&apos;s not doing its job.
            </p>
            <p className="text-neutral-500 leading-relaxed mb-8 max-w-2xl animate-fade-in delay-300">
              We build and launch a conversion-ready website in 14 days, then maintain and improve it so it keeps generating leads — or we keep fixing it for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-400">
              <a
                href="#book"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
              >
                Get your website live in 14 days →
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                See how it works
              </a>
            </div>
          </div>
        </section>

        {/* Tech Credibility Strip */}
        <section className="py-4 px-6 border-y border-neutral-900 bg-neutral-900/20">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-neutral-500">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              Next.js
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              Tailwind CSS
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              PageSpeed 90+
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              Core Web Vitals
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              Hosting included
            </span>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-10 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-neutral-400 text-sm leading-relaxed">
              Built using proven conversion structures we&apos;ve seen work across dozens of local service businesses.
              <span className="block mt-1 text-neutral-300 font-medium">No trends. No fluff. Just what gets clients booked.</span>
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">The problem</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Most business websites fail for 3 reasons:
            </h2>
            <div className="space-y-3">
              <div className="flex gap-4 p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <span className="text-red-500 font-mono font-bold shrink-0 text-sm">01</span>
                <p className="text-neutral-300">They look nice but don&apos;t guide visitors to book</p>
              </div>
              <div className="flex gap-4 p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <span className="text-red-500 font-mono font-bold shrink-0 text-sm">02</span>
                <p className="text-neutral-300">They&apos;re slow, outdated, or broken on mobile</p>
              </div>
              <div className="flex gap-4 p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <span className="text-red-500 font-mono font-bold shrink-0 text-sm">03</span>
                <p className="text-neutral-300">Nobody maintains or improves them after launch</p>
              </div>
            </div>
            <div className="mt-12 p-6 bg-red-500/5 border border-red-500/10 rounded-lg">
              <p className="text-neutral-500 mb-2 text-sm">The result?</p>
              <p className="text-xl font-semibold text-neutral-100">
                Traffic comes in. Clients don&apos;t book.
              </p>
              <p className="text-neutral-500 mt-1 text-sm">Your website becomes decoration — not a business asset.</p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 px-6 md:py-24 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">
              The Solution
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The Clients-Ready Website System™
            </h2>
            <p className="text-xl text-neutral-400 mb-6">
              We don&apos;t &quot;design websites.&quot; We install client-acquisition systems.
            </p>
            <p className="text-neutral-500 mb-6">
              Built to:
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                <p className="text-sm font-medium text-neutral-200">Look credible & professional</p>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                <p className="text-sm font-medium text-neutral-200">Load fast (PageSpeed 90+)</p>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                <p className="text-sm font-medium text-neutral-200">Convert visitors into booked clients</p>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                <p className="text-sm font-medium text-neutral-200">Improve over time with data</p>
              </div>
            </div>
            <p className="text-neutral-300 font-medium mb-8">
              And we handle everything. You focus on your business.
            </p>
            <a
              href="#book"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
            >
              Book your 15-minute call →
            </a>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">What you get</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Everything you need. Nothing you don&apos;t.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-500 text-lg">⚡</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Website Build</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    5–7 page conversion-focused site
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Proven page structure
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Mobile-first design
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Booking / contact flow
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-500 text-lg">📊</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Performance & Tracking</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Google Analytics setup
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Conversion tracking
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Core Web Vitals optimized
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Basic SEO setup
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-500 text-lg">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Ongoing Growth</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Hosting included
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Security & daily backups
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Monthly updates
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    Conversion improvements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-16 px-6 md:py-24 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">How it works</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">
              From call to live in 14 days
            </h2>
            <div className="space-y-0">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-emerald-500 text-neutral-950 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    1
                  </div>
                  <div className="w-px h-full bg-neutral-800 my-3"></div>
                </div>
                <div className="pb-8">
                  <p className="text-xs text-neutral-500 mb-1">15 minutes</p>
                  <h3 className="text-lg font-semibold mb-2">Book a Call</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    We review your business and current website (if any). We&apos;ll tell you honestly if this is a fit — no pressure, no games.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-emerald-500 text-neutral-950 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    2
                  </div>
                  <div className="w-px h-full bg-neutral-800 my-3"></div>
                </div>
                <div className="pb-8">
                  <p className="text-xs text-neutral-500 mb-1">Days 1–7</p>
                  <h3 className="text-lg font-semibold mb-2">Website Sprint</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    You fill out a short intake form (10 min). We build the first version. One feedback round, that&apos;s it.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-emerald-500 text-neutral-950 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    3
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Day 14</p>
                  <h3 className="text-lg font-semibold mb-2">Launch & Grow</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Your site goes live with tracking, speed optimization, and booking flow. We maintain and improve it monthly. You don&apos;t manage anything.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">Is this for you?</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6">This is for you if:</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-neutral-300">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    You run a local service business (clinic, gym, professional services)
                  </li>
                  <li className="flex items-start gap-3 text-neutral-300">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    You want more booked clients — not &quot;branding&quot;
                  </li>
                  <li className="flex items-start gap-3 text-neutral-300">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    Your business is already making money
                  </li>
                  <li className="flex items-start gap-3 text-neutral-300">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    You&apos;re ready to invest in growth
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6 text-neutral-400">This is NOT for you if:</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-neutral-500">
                    <span className="text-red-500 mt-0.5 shrink-0">✖</span>
                    You want to DIY or just need &quot;a website&quot;
                  </li>
                  <li className="flex items-start gap-3 text-neutral-500">
                    <span className="text-red-500 mt-0.5 shrink-0">✖</span>
                    You&apos;re looking for the cheapest option
                  </li>
                  <li className="flex items-start gap-3 text-neutral-500">
                    <span className="text-red-500 mt-0.5 shrink-0">✖</span>
                    You don&apos;t want ongoing improvement
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-16 px-6 md:py-24 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">Zero risk</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Our Guarantees
            </h2>
            <p className="text-neutral-500 mb-10">We put our money where our mouth is.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-5 bg-neutral-900 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">⏱</span>
                  <h3 className="font-semibold">14-Day Launch</h3>
                </div>
                <p className="text-sm text-neutral-400">Late? You get €100/day credited back.</p>
              </div>
              <div className="p-5 bg-neutral-900 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">🚀</span>
                  <h3 className="font-semibold">Performance</h3>
                </div>
                <p className="text-sm text-neutral-400">Under 80 PageSpeed mobile? We fix it free.</p>
              </div>
              <div className="p-5 bg-neutral-900 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">📈</span>
                  <h3 className="font-semibold">Conversion Safety Net</h3>
                </div>
                <p className="text-sm text-neutral-400">No leads in 30 days? We rewrite the homepage free.</p>
              </div>
              <div className="p-5 bg-neutral-900 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-500">🚪</span>
                  <h3 className="font-semibold">30-Day Exit</h3>
                </div>
                <p className="text-sm text-neutral-400">Cancel within 30 days. Keep the website.</p>
              </div>
            </div>
            <div className="mt-10">
              <a
                href="#book"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
              >
                Book your 15-minute call →
              </a>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">Pricing</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Simple. Transparent. No surprises.
            </h2>
            <p className="text-neutral-500 mb-10">One setup fee. One monthly fee. That&apos;s it.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
                <p className="text-sm text-neutral-500 mb-1">One-Time Setup</p>
                <p className="text-4xl font-bold mb-2">€1,200</p>
                <p className="text-xs text-neutral-600">Website build, launch, tracking setup</p>
              </div>
              <div className="p-6 bg-neutral-900 border border-emerald-500/30 rounded-lg relative">
                <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-emerald-500 text-neutral-950 text-xs font-semibold rounded">
                  Required
                </div>
                <p className="text-sm text-neutral-500 mb-1">Monthly Growth</p>
                <p className="text-4xl font-bold mb-2">€199<span className="text-lg font-normal text-neutral-500">/mo</span></p>
                <p className="text-xs text-neutral-600">Hosting, security, updates, improvements</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-neutral-500 leading-relaxed">
              Minimum 3 months commitment. This is how results compound — websites decay without maintenance.
            </p>
          </div>
        </section>

        {/* Why landyourweb */}
        <section className="py-16 px-6 md:py-24 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">Why us</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
              We&apos;re not like other agencies.
            </h2>
            <div className="space-y-4 text-neutral-400">
              <p className="flex items-center gap-3">
                <span className="text-red-500">✖</span>
                We don&apos;t sell &quot;projects&quot; and disappear
              </p>
              <p className="flex items-center gap-3">
                <span className="text-red-500">✖</span>
                We don&apos;t chase design trends
              </p>
              <p className="flex items-center gap-3">
                <span className="text-red-500">✖</span>
                We don&apos;t promise and underdeliver
              </p>
            </div>
            <p className="mt-8 text-lg font-semibold text-neutral-100">
              We build, launch, maintain, and improve.
              <span className="text-neutral-500 font-normal"> That&apos;s it.</span>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Common questions
            </h2>
            <div className="space-y-0 divide-y divide-neutral-800">
              <div className="py-5">
                <h3 className="font-semibold mb-2">Do I really need monthly maintenance?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Yes. Websites decay — speed drops, security issues appear, competitors improve. Maintenance is how results compound instead of dying after launch.
                </p>
              </div>
              <div className="py-5">
                <h3 className="font-semibold mb-2">What if I already have a website?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  We&apos;ll audit it on the call. If it&apos;s salvageable, we&apos;ll tell you. If not, we rebuild it properly. No upselling.
                </p>
              </div>
              <div className="py-5">
                <h3 className="font-semibold mb-2">What kind of businesses is this for?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Service-based businesses that want more booked clients: clinics, dentists, gyms, physiotherapists, local professionals. If clients finding and trusting you matters, this applies.
                </p>
              </div>
              <div className="py-5">
                <h3 className="font-semibold mb-2">Is SEO included?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  We include solid technical and on-page SEO foundation. Ongoing SEO campaigns are separate, but your site will be built to rank and convert.
                </p>
              </div>
              <div className="py-5">
                <h3 className="font-semibold mb-2">How much of my time does this take?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  About 10–15 minutes for the intake form and one short feedback round. We handle everything else.
                </p>
              </div>
              <div className="py-5">
                <h3 className="font-semibold mb-2">What if I want to cancel?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Cancel within 30 days and keep the website. After that, it&apos;s month-to-month — cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="book" className="py-16 px-6 md:py-24 bg-emerald-500">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-neutral-950">
              If your website isn&apos;t bringing clients, fix it.
            </h2>
            <p className="text-neutral-800 mb-8 max-w-xl mx-auto">
              We&apos;ll build it, launch it, and maintain it — so you can focus on running your business.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-emerald-500 bg-neutral-950 rounded-md hover:bg-neutral-900 transition-colors"
            >
              Book your 15-minute call →
            </a>
            <p className="mt-4 text-sm text-neutral-800/70">
              No pressure. No sales games. Just a conversation.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-neutral-950 border-t border-neutral-900">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
            <span className="font-medium text-neutral-400">landyourweb.com</span>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </footer>

        {/* Bottom padding for mobile sticky CTA */}
        <div className="h-20 md:hidden"></div>
      </main>
    </>
  );
}
