export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold">landyourweb</span>
          <a 
            href="#book-call"
            className="px-5 py-2.5 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Turn your website into a client-acquisition asset.
          </h1>
          <p className="text-xl text-zinc-600 mb-4 max-w-2xl mx-auto">
            If your website doesn't bring you clients, it's not doing its job.
          </p>
          <p className="text-lg text-zinc-500 mb-8 max-w-2xl mx-auto">
            We build and launch a conversion-ready website in 14 days, then maintain and improve it so it keeps generating leads — or we keep fixing it for free.
          </p>
          <a 
            href="#book-call"
            className="inline-block px-8 py-4 bg-zinc-900 text-white rounded-lg font-semibold text-lg hover:bg-zinc-800 transition-colors"
          >
            👉 Get your website live in 14 days
          </a>
          <p className="mt-4 text-sm text-zinc-400">
            Built for TikTok traffic. Optimized for conversions.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-6 bg-zinc-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-600">
            Built using proven structures we've seen work across dozens of real businesses.
          </p>
          <p className="text-zinc-500 font-medium mt-2">
            No trends. No fluff. Just what converts.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Most business websites fail for 3 reasons:
          </h2>
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="flex items-start gap-4 p-4 bg-zinc-50 rounded-lg">
              <span className="text-red-500 font-bold">1</span>
              <p className="text-zinc-700">They look nice but don't guide visitors</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-zinc-50 rounded-lg">
              <span className="text-red-500 font-bold">2</span>
              <p className="text-zinc-700">They're slow, outdated, or broken on mobile</p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-zinc-50 rounded-lg">
              <span className="text-red-500 font-bold">3</span>
              <p className="text-zinc-700">Nobody maintains or improves them after launch</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-xl text-zinc-600 mb-2">The result?</p>
            <p className="text-2xl font-semibold">Traffic comes in. Clients don't.</p>
            <p className="text-zinc-500 mt-2">Your website becomes decoration.</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-400 mb-4">The Solution</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Clients-Ready Website System™
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            We don't "design websites."
          </p>
          <p className="text-lg text-zinc-400 mb-4">
            We install a client-acquisition system built to:
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="px-4 py-2 bg-white/10 rounded-full">Look credible</span>
            <span className="px-4 py-2 bg-white/10 rounded-full">Load fast</span>
            <span className="px-4 py-2 bg-white/10 rounded-full">Convert visitors into leads</span>
            <span className="px-4 py-2 bg-white/10 rounded-full">Improve over time</span>
          </div>
          <p className="mt-8 text-zinc-300 font-medium">And we handle everything.</p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            What You Get
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Website Build */}
            <div className="p-6 border border-zinc-200 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Website Build (Done-For-You)</h3>
              <ul className="space-y-3 text-zinc-600">
                <li>✓ 5–7 page conversion-focused website</li>
                <li>✓ Proven page structure (no guessing)</li>
                <li>✓ Mobile-first design</li>
                <li>✓ One clear goal: leads</li>
              </ul>
            </div>
            {/* Performance */}
            <div className="p-6 border border-zinc-200 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Performance & Tracking</h3>
              <ul className="space-y-3 text-zinc-600">
                <li>✓ Google Analytics + conversion tracking</li>
                <li>✓ Speed optimization (Core Web Vitals)</li>
                <li>✓ Basic SEO setup</li>
              </ul>
            </div>
            {/* Growth */}
            <div className="p-6 border border-zinc-200 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Growth & Protection (Ongoing)</h3>
              <ul className="space-y-3 text-zinc-600">
                <li>✓ Hosting included</li>
                <li>✓ Security & backups</li>
                <li>✓ Monthly updates & small changes</li>
                <li>✓ Conversion improvements</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Book a Call (15 minutes)</h3>
                <p className="text-zinc-600">
                  We review your business, your current website (if you have one), and decide if this is a fit.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Website Sprint</h3>
                <p className="text-zinc-600">
                  You fill out a short intake form. We build the first version in 3 days.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Launch & Improve</h3>
                <p className="text-zinc-600">
                  Your site goes live in 14 days with tracking, speed optimization, and ongoing maintenance. You don't manage anything. We do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Guarantees
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 border border-green-100 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">14-Day Launch Guarantee</h3>
              <p className="text-zinc-600">If we're late, you get €100/day credited back.</p>
            </div>
            <div className="p-6 bg-green-50 border border-green-100 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Performance Guarantee</h3>
              <p className="text-zinc-600">If your site scores under 80 on Google PageSpeed (mobile), we fix it free.</p>
            </div>
            <div className="p-6 bg-green-50 border border-green-100 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Conversion Safety Net</h3>
              <p className="text-zinc-600">If you get no leads in 30 days, we rewrite the homepage copy for free.</p>
            </div>
            <div className="p-6 bg-green-50 border border-green-100 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">30-Day Exit</h3>
              <p className="text-zinc-600">Cancel within 30 days. Keep the website.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pricing
          </h2>
          <p className="text-zinc-400 mb-12">Simple. No hidden fees. No surprises.</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-zinc-400 mb-2">One-Time Setup</p>
              <p className="text-5xl font-bold">€1,200</p>
            </div>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-zinc-400 mb-2">Monthly Growth & Maintenance</p>
              <p className="text-5xl font-bold">€199<span className="text-xl font-normal">/mo</span></p>
            </div>
          </div>
          <p className="mt-8 text-zinc-400 text-sm max-w-lg mx-auto">
            Includes hosting, security, updates, speed monitoring, and ongoing conversion improvements. Minimum 3 months. This is how results are maintained/improved.
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Who This Is For</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zinc-700">
                  <span className="text-green-500">✔</span> Service businesses
                </li>
                <li className="flex items-center gap-3 text-zinc-700">
                  <span className="text-green-500">✔</span> Clinics, gyms, professionals, local companies
                </li>
                <li className="flex items-center gap-3 text-zinc-700">
                  <span className="text-green-500">✔</span> Owners who want leads, not "branding"
                </li>
                <li className="flex items-center gap-3 text-zinc-700">
                  <span className="text-green-500">✔</span> Businesses already making money
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Who This Is NOT For</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zinc-500">
                  <span className="text-red-500">✖</span> DIY builders
                </li>
                <li className="flex items-center gap-3 text-zinc-500">
                  <span className="text-red-500">✖</span> People who want the cheapest option
                </li>
                <li className="flex items-center gap-3 text-zinc-500">
                  <span className="text-red-500">✖</span> Businesses that don't want ongoing improvement
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why landyourweb */}
      <section className="py-20 px-6 bg-zinc-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Why landyourweb.com
          </h2>
          <div className="space-y-4 text-lg text-zinc-600">
            <p>We don't sell projects</p>
            <p>We don't disappear after launch</p>
            <p>We don't chase trends</p>
            <p className="font-semibold text-zinc-900 pt-4">We build, launch, maintain, and improve. That's it.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b border-zinc-200 pb-6">
              <h3 className="font-semibold text-lg mb-2">Do I really need monthly maintenance?</h3>
              <p className="text-zinc-600">Yes. Websites decay. Speed drops, plugins break, competitors improve, and user behavior changes. Maintenance is how results compound instead of dying after launch.</p>
            </div>
            <div className="border-b border-zinc-200 pb-6">
              <h3 className="font-semibold text-lg mb-2">What if I already have a website?</h3>
              <p className="text-zinc-600">We can rebuild it or improve it, depending on its condition. If it's salvageable, we'll tell you. If not, we rebuild it properly.</p>
            </div>
            <div className="border-b border-zinc-200 pb-6">
              <h3 className="font-semibold text-lg mb-2">What kind of businesses is this best for?</h3>
              <p className="text-zinc-600">Service-based businesses that want more leads: clinics, gyms, professionals, local companies. If your business depends on clients finding and trusting you, this applies.</p>
            </div>
            <div className="border-b border-zinc-200 pb-6">
              <h3 className="font-semibold text-lg mb-2">Is SEO included?</h3>
              <p className="text-zinc-600">We include a solid technical and on-page SEO foundation. Ongoing SEO campaigns are separate, but your site will be built to rank and convert.</p>
            </div>
            <div className="border-b border-zinc-200 pb-6">
              <h3 className="font-semibold text-lg mb-2">How much time do I need to invest?</h3>
              <p className="text-zinc-600">About 10–15 minutes to fill the intake form and one short feedback round. We handle everything else.</p>
            </div>
            <div className="pb-6">
              <h3 className="font-semibold text-lg mb-2">What if I want to cancel?</h3>
              <p className="text-zinc-600">You can cancel within 30 days and keep the website. After that, it's month-to-month.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="book-call" className="py-20 px-6 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            If your website isn't bringing you clients, fix it.
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            We'll build it, launch it, and maintain it — so you can focus on running your business.
          </p>
          <a 
            href="#"
            className="inline-block px-8 py-4 bg-white text-zinc-900 rounded-lg font-semibold text-lg hover:bg-zinc-100 transition-colors"
          >
            👉 Book your 15-minute call
          </a>
          <p className="mt-4 text-zinc-400">
            No pressure. No sales games.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto text-center text-zinc-500">
          <p>© {new Date().getFullYear()} landyourweb.com</p>
        </div>
      </footer>
      </main>
  );
}
