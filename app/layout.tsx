import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TrackingProvider } from "./components/TrackingProvider";

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

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://landyourweb.com/#organization",
      "name": "Land Your Web",
      "url": "https://landyourweb.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://landyourweb.com/logo.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@landyourweb.com",
        "contactType": "customer service",
        "availableLanguage": ["English"]
      },
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "@id": "https://landyourweb.com/#website",
      "url": "https://landyourweb.com",
      "name": "Land Your Web",
      "publisher": {
        "@id": "https://landyourweb.com/#organization"
      }
    },
    {
      "@type": "Service",
      "@id": "https://landyourweb.com/#service",
      "name": "Conversion-Ready Website Development",
      "provider": {
        "@id": "https://landyourweb.com/#organization"
      },
      "description": "We build and launch conversion-ready websites in 14 days for local service businesses. Includes ongoing maintenance and conversion optimization.",
      "areaServed": ["United States", "United Kingdom", "Canada", "Australia", "Europe"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Website Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Website Build",
            "price": "1200",
            "priceCurrency": "USD",
            "description": "5-7 page conversion-focused website with mobile-first design"
          },
          {
            "@type": "Offer",
            "name": "Monthly Growth & Maintenance",
            "price": "199",
            "priceCurrency": "USD",
            "description": "Hosting, security, updates, and conversion improvements"
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://landyourweb.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do I really need monthly maintenance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Websites decay — speed drops, security issues appear, competitors improve. Maintenance is how results compound instead of dying after launch."
          }
        },
        {
          "@type": "Question",
          "name": "What if I already have a website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We'll audit it on the call. If it's salvageable, we'll tell you. If not, we rebuild it properly. No upselling."
          }
        },
        {
          "@type": "Question",
          "name": "What kind of businesses is this for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Service-based businesses that want more booked clients: clinics, dentists, gyms, physiotherapists, local professionals."
          }
        },
        {
          "@type": "Question",
          "name": "How much of my time does this take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "About 10–15 minutes for the intake form and one short feedback round. We handle everything else."
          }
        },
        {
          "@type": "Question",
          "name": "What if I want to cancel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cancel within 30 days and keep the website. After that, it's month-to-month — cancel anytime."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BC30R7GF1N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BC30R7GF1N', {
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>

        {/* TikTok Pixel - Replace YOUR_TIKTOK_PIXEL_ID with your actual pixel ID */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('YOUR_TIKTOK_PIXEL_ID');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>

        {/* Meta Pixel - Replace YOUR_META_PIXEL_ID with your actual pixel ID */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_META_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=YOUR_META_PIXEL_ID&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <TrackingProvider>
          {children}
        </TrackingProvider>
      </body>
    </html>
  );
}
