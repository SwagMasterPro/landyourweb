import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Land Your Web | Web Development Agency',
  description: 'We build stunning, high-performance websites that convert visitors into customers.',
  metadataBase: new URL('https://mothership-website.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

