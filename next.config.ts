import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for modern browsers only (no legacy polyfills)
  experimental: {
    optimizeCss: true, // Minimize CSS and reduce render blocking
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
