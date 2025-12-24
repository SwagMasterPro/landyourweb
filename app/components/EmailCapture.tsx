'use client';

import { useState, FormEvent } from 'react';
import { trackEmailCapture } from '../lib/tracking';
import { getUTMForSubmission } from '../lib/utm';

interface EmailCaptureProps {
  source: string;
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  onSuccess?: () => void;
  variant?: 'default' | 'inline' | 'minimal';
  className?: string;
}

export function EmailCapture({
  source,
  title = "Get your full report",
  description = "Enter your email and we'll send you a detailed analysis with action steps.",
  buttonText = "Send My Report",
  placeholder = "your@email.com",
  onSuccess,
  variant = 'default',
  className = '',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Get UTM data for attribution
    const utmData = getUTMForSubmission();

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, utmData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Track successful email capture
      trackEmailCapture(source);
      
      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Check your inbox!</h3>
        <p className="text-[#A1A1AA]">We&apos;ve sent your report to {email}</p>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#ea7126]/50 transition-all text-sm"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 text-sm whitespace-nowrap"
        >
          {isLoading ? 'Sending...' : buttonText}
        </button>
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`p-6 rounded-2xl bg-white/[0.02] border border-white/10 ${className}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-[#A1A1AA]">{description}</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#ea7126]/50 transition-all text-sm"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-xl transition-all hover:shadow-lg disabled:opacity-50 text-sm whitespace-nowrap"
            >
              {isLoading ? '...' : buttonText}
            </button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 ${className}`}>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-[#A1A1AA] mb-6">{description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#ea7126]/50 focus:ring-2 focus:ring-[#ea7126]/20 transition-all"
        />
        
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#ea7126] to-[#d4580f] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(234,113,38,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>{buttonText}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </>
          )}
        </button>
      </form>
      
      <p className="mt-4 text-xs text-[#52525B] text-center">
        No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  );
}

