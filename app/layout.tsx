import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "landyourweb | Conversion-Ready Websites in 14 Days",
  description:
    "We build and launch a conversion-ready website in 14 days, then maintain and improve it so it keeps generating leads — or we keep fixing it for free.",
  metadataBase: new URL("https://landyourweb.com"),
  openGraph: {
    title: "landyourweb | Conversion-Ready Websites in 14 Days",
    description:
      "We build and launch a conversion-ready website in 14 days, then maintain and improve it so it keeps generating leads.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BC30R7GF1N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BC30R7GF1N');
            
            // Track CTA button clicks
            document.addEventListener('click', function(e) {
              var target = e.target.closest('a[href*="calendly.com"]');
              if (target) {
                var location = 'unknown';
                if (target.closest('nav')) location = 'nav';
                else if (target.closest('.fixed')) location = 'mobile_sticky';
                else if (target.closest('section')) {
                  var section = target.closest('section');
                  var heading = section.querySelector('h1, h2');
                  if (heading) {
                    var text = heading.textContent.toLowerCase();
                    if (text.includes('decoration') || text.includes('book a client')) location = 'hero';
                    else if (text.includes('solution') || text.includes('system')) location = 'solution';
                    else if (text.includes('guarantee')) location = 'guarantee';
                    else if (text.includes('pricing')) location = 'pricing';
                    else if (text.includes('fix it')) location = 'final_cta';
                    else location = 'section';
                  }
                }
                else if (target.closest('footer')) location = 'footer';
                
                gtag('event', 'cta_click', {
                  button_location: location,
                  button_text: target.textContent.trim().substring(0, 50)
                });
              }
            });
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
