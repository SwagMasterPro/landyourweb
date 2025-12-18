import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  metadataBase: new URL("https://landyourweb.vercel.app"),
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
