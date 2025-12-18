export default function Home() {
  return (
    <>
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-neutral-950 border-t border-neutral-800 md:hidden">
        <a
          href="#book"
          className="block w-full py-3 text-center text-sm font-semibold text-neutral-950 bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
        >
          Get your website live in 14 days →
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
        <section className="pt-28 pb-20 px-6 md:pt-36 md:pb-28">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4 animate-fade-in">
              Websites that convert
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in delay-100">
              Turn your website into a client-acquisition asset.
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed mb-4 max-w-2xl animate-fade-in delay-200">
              If your website doesn&apos;t bring you clients, it&apos;s not doing its job.
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
            </div>
            <p className="mt-6 text-xs text-neutral-600">
              Built for TikTok traffic. Optimized for conversions.
            </p>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="py-8 px-6 border-y border-neutral-900">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-neutral-500 text-sm">
              Built using proven structures we&apos;ve seen work across dozens of real businesses.
              <span className="text-neutral-400 font-medium ml-1">No trends. No fluff. Just what converts.</span>
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 px-6 md:py-28">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Most business websites fail for 3 reasons:
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <span className="text-red-500 font-mono font-bold shrink-0">01</span>
                <p className="text-neutral-300">They look nice but don&apos;t guide visitors</p>
              </div>
              <div className="flex gap-4 p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <span className="text-red-500 font-mono font-bold shrink-0">02</span>
                <p className="text-neutral-300">They&apos;re slow, outdated, or broken on mobile</p>
              </div>
              <div className="flex gap-4 p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <span className="text-red-500 font-mono font-bold shrink-0">03</span>
                <p className="text-neutral-300">Nobody maintains or improves them after launch</p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-neutral-800">
              <p className="text-neutral-500 mb-2">The result?</p>
              <p className="text-2xl font-semibold text-neutral-100">
                Traffic comes in. Clients don&apos;t.
              </p>
              <p className="text-neutral-500 mt-2">Your website becomes decoration.</p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 px-6 md:py-28 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-3xl mx-auto">
            <p className="text-emerald-500 text-sm font-medium tracking-wide uppercase mb-4">
              The Solution
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              The Clients-Ready Website System™
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              We don&apos;t &quot;design websites.&quot;
            </p>
            <p className="text-neutral-500 mb-8">
              We install a client-acquisition system built to:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
                <p className="text-sm font-medium text-neutral-200">Look credible</p>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
                <p className="text-sm font-medium text-neutral-200">Load fast</p>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
                <p className="text-sm font-medium text-neutral-200">Convert visitors</p>
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
                <p className="text-sm font-medium text-neutral-200">Improve over time</p>
              </div>
            </div>
            <p className="mt-8 text-neutral-300 font-medium">
              And we handle everything.
            </p>
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

        {/* What You Get */}
        <section className="py-20 px-6 md:py-28">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12 text-center">
              What You Get
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <p className="text-xs font-medium text-emerald-500 uppercase tracking-wide mb-3">Build</p>
                <h3 className="text-lg font-semibold mb-4">Website Build (Done-For-You)</h3>
                <ul className="space-y-2.5 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    5–7 page conversion-focused website
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Proven page structure (no guessing)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Mobile-first design
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    One clear goal: leads
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <p className="text-xs font-medium text-emerald-500 uppercase tracking-wide mb-3">Performance</p>
                <h3 className="text-lg font-semibold mb-4">Performance & Tracking</h3>
                <ul className="space-y-2.5 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Google Analytics + conversion tracking
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Speed optimization (Core Web Vitals)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Basic SEO setup
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <p className="text-xs font-medium text-emerald-500 uppercase tracking-wide mb-3">Ongoing</p>
                <h3 className="text-lg font-semibold mb-4">Growth & Protection</h3>
                <ul className="space-y-2.5 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Hosting included
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Security & backups
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Monthly updates & small changes
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Conversion improvements
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    Priority support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 md:py-28 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">
              How It Works
            </h2>
            <div className="space-y-0">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-emerald-500 text-neutral-950 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    1
                  </div>
                  <div className="w-px h-full bg-neutral-800 my-2"></div>
                </div>
                <div className="pb-10">
                  <h3 className="text-lg font-semibold mb-2">Book a Call (15 minutes)</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    We review your business, your current website (if you have one), and decide if this is a fit.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-emerald-500 text-neutral-950 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    2
                  </div>
                  <div className="w-px h-full bg-neutral-800 my-2"></div>
                </div>
                <div className="pb-10">
                  <h3 className="text-lg font-semibold mb-2">Website Sprint</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    You fill out a short intake form. We build the first version in 3 days.
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
                  <h3 className="text-lg font-semibold mb-2">Launch & Improve</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Your site goes live in 14 days with tracking, speed optimization, and ongoing maintenance. You don&apos;t manage anything. We do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-20 px-6 md:py-28">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">
              Our Guarantees
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <h3 className="font-semibold mb-2">14-Day Launch Guarantee</h3>
                <p className="text-sm text-neutral-400">If we&apos;re late, you get €100/day credited back.</p>
              </div>
              <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <h3 className="font-semibold mb-2">Performance Guarantee</h3>
                <p className="text-sm text-neutral-400">If your site scores under 80 on Google PageSpeed (mobile), we fix it free.</p>
              </div>
              <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <h3 className="font-semibold mb-2">Conversion Safety Net</h3>
                <p className="text-sm text-neutral-400">If you get no leads in 30 days, we rewrite the homepage copy for free.</p>
              </div>
              <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                <h3 className="font-semibold mb-2">30-Day Exit</h3>
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
        <section className="py-20 px-6 md:py-28 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Pricing
            </h2>
            <p className="text-neutral-500 mb-10">Simple. No hidden fees. No surprises.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
                <p className="text-sm text-neutral-500 mb-1">One-Time Setup</p>
                <p className="text-4xl font-bold">€1,200</p>
              </div>
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
                <p className="text-sm text-neutral-500 mb-1">Monthly Growth & Maintenance</p>
                <p className="text-4xl font-bold">€199<span className="text-lg font-normal text-neutral-500">/mo</span></p>
              </div>
            </div>
            <p className="mt-6 text-sm text-neutral-500 leading-relaxed">
              Includes hosting, security, updates, speed monitoring, and ongoing conversion improvements. Minimum 3 months. This is how results are maintained/improved.
            </p>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 px-6 md:py-28">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6">Who This Is For</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-neutral-300">
                    <span className="text-emerald-500 mt-0.5">✔</span>
                    Service businesses
                  </li>
                  <li className="flex items-start gap-3 text-neutral-300">
                    <span className="text-emerald-500 mt-0.5">✔</span>
                    Clinics, gyms, professionals, local companies
                  </li>
                  <li className="flex items-start gap-3 text-neutral-300">
                    <span className="text-emerald-500 mt-0.5">✔</span>
                    Owners who want leads, not &quot;branding&quot;
                  </li>
                  <li className="flex items-start gap-3 text-neutral-300">
                    <span className="text-emerald-500 mt-0.5">✔</span>
                    Businesses already making money
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Who This Is NOT For</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-neutral-500">
                    <span className="text-red-500 mt-0.5">✖</span>
                    DIY builders
                  </li>
                  <li className="flex items-start gap-3 text-neutral-500">
                    <span className="text-red-500 mt-0.5">✖</span>
                    People who want the cheapest option
                  </li>
                  <li className="flex items-start gap-3 text-neutral-500">
                    <span className="text-red-500 mt-0.5">✖</span>
                    Businesses that don&apos;t want ongoing improvement
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why landyourweb */}
        <section className="py-20 px-6 md:py-28 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
              Why landyourweb.com
            </h2>
            <div className="space-y-3 text-neutral-400">
              <p>We don&apos;t sell projects</p>
              <p>We don&apos;t disappear after launch</p>
              <p>We don&apos;t chase trends</p>
            </div>
            <p className="mt-6 text-lg font-semibold text-neutral-100">
              We build, launch, maintain, and improve. That&apos;s it.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 md:py-28">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-0 divide-y divide-neutral-800">
              <div className="py-6">
                <h3 className="font-semibold mb-2">Do I really need monthly maintenance?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Yes. Websites decay. Speed drops, plugins break, competitors improve, and user behavior changes. Maintenance is how results compound instead of dying after launch.
                </p>
              </div>
              <div className="py-6">
                <h3 className="font-semibold mb-2">What if I already have a website?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  We can rebuild it or improve it, depending on its condition. If it&apos;s salvageable, we&apos;ll tell you. If not, we rebuild it properly.
                </p>
              </div>
              <div className="py-6">
                <h3 className="font-semibold mb-2">What kind of businesses is this best for?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Service-based businesses that want more leads: clinics, gyms, professionals, local companies. If your business depends on clients finding and trusting you, this applies.
                </p>
              </div>
              <div className="py-6">
                <h3 className="font-semibold mb-2">Is SEO included?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  We include a solid technical and on-page SEO foundation. Ongoing SEO campaigns are separate, but your site will be built to rank and convert.
                </p>
              </div>
              <div className="py-6">
                <h3 className="font-semibold mb-2">How much time do I need to invest?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  About 10–15 minutes to fill the intake form and one short feedback round. We handle everything else.
                </p>
              </div>
              <div className="py-6">
                <h3 className="font-semibold mb-2">What if I want to cancel?</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  You can cancel within 30 days and keep the website. After that, it&apos;s month-to-month.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="book" className="py-20 px-6 md:py-28 bg-neutral-900 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              If your website isn&apos;t bringing you clients, fix it.
            </h2>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
              We&apos;ll build it, launch it, and maintain it — so you can focus on running your business.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-neutral-950 bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
            >
              Book your 15-minute call →
            </a>
            <p className="mt-4 text-sm text-neutral-600">
              No pressure. No sales games.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-neutral-900">
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
