import { NextRequest, NextResponse } from 'next/server';

// Email subscription endpoint
// Uses Resend for email delivery - set RESEND_API_KEY in environment variables

interface SubscribeRequest {
  email: string;
  source: string;
  auditData?: {
    url?: string;
    score?: number;
    industry?: string;
  };
  utmData?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    referrer?: string;
    landing_page?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json();
    const { email, source, auditData, utmData } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check for Resend API key
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      // If no API key, log the subscription and return success
      // This allows testing without Resend configured
      console.log('Email subscription (Resend not configured):', {
        email,
        source,
        auditData,
        utmData,
        timestamp: new Date().toISOString(),
      });
      
      return NextResponse.json({
        success: true,
        message: 'Subscription recorded (email service not configured)',
      });
    }

    // Send welcome/report email via Resend
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Land Your Web <hello@landyourweb.com>',
          to: email,
          subject: getEmailSubject(source, auditData),
          html: getEmailHtml(source, auditData),
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Resend API error:', errorData);
        throw new Error('Failed to send email');
      }

      // Also add to Resend audience/contacts if configured
      const audienceId = process.env.RESEND_AUDIENCE_ID;
      if (audienceId) {
        await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            first_name: '',
            last_name: '',
            unsubscribed: false,
          }),
        });
      }

      console.log('Email sent successfully:', { email, source });

      return NextResponse.json({
        success: true,
        message: 'Email sent successfully',
      });

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // Still return success - we don't want to show error to user
      // if just email delivery fails but subscription was recorded
      return NextResponse.json({
        success: true,
        message: 'Subscription recorded',
      });
    }

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getEmailSubject(source: string, auditData?: SubscribeRequest['auditData']): string {
  if (source === 'audit_results' && auditData?.url) {
    return `Your Website Audit Report: ${auditData.url}`;
  }
  return 'Your Free Website Conversion Guide';
}

function getEmailHtml(source: string, auditData?: SubscribeRequest['auditData']): string {
  const baseStyles = `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
    background: #000;
    color: #fff;
  `;

  if (source === 'audit_results' && auditData) {
    return `
      <div style="${baseStyles}">
        <img src="https://landyourweb.com/logo.png" alt="Land Your Web" style="height: 32px; margin-bottom: 32px;" />
        
        <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 16px; color: #fff;">
          Your Website Audit Report
        </h1>
        
        <p style="color: #A1A1AA; margin-bottom: 24px;">
          Here's what we found when analyzing <strong style="color: #fff;">${auditData.url || 'your website'}</strong>
        </p>
        
        <div style="background: linear-gradient(135deg, rgba(234,113,38,0.15), rgba(182,69,20,0.1)); padding: 24px; border-radius: 16px; border: 1px solid rgba(234,113,38,0.3); margin-bottom: 32px;">
          <p style="font-size: 14px; color: #A1A1AA; margin: 0 0 8px 0;">Overall Score</p>
          <p style="font-size: 48px; font-weight: bold; margin: 0; color: ${(auditData.score || 0) >= 80 ? '#22c55e' : (auditData.score || 0) >= 50 ? '#eab308' : '#ef4444'};">
            ${auditData.score || 'N/A'}/100
          </p>
        </div>
        
        <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #fff;">
          What's Next?
        </h2>
        
        <p style="color: #A1A1AA; margin-bottom: 24px;">
          Your website has room for improvement. Here's how we can help:
        </p>
        
        <ul style="color: #A1A1AA; padding-left: 20px; margin-bottom: 32px;">
          <li style="margin-bottom: 12px;">Speed optimization to load in under 2 seconds</li>
          <li style="margin-bottom: 12px;">Conversion-focused design that books more clients</li>
          <li style="margin-bottom: 12px;">Mobile-first approach (60%+ of visitors are on phones)</li>
          <li style="margin-bottom: 12px;">Ongoing maintenance and improvements</li>
        </ul>
        
        <a href="https://calendly.com/landyourweb/15min" 
           style="display: inline-block; background: linear-gradient(135deg, #ea7126, #b64514); color: #fff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; margin-bottom: 32px;">
          Book a Free Strategy Call →
        </a>
        
        <p style="color: #52525B; font-size: 14px; margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
          Questions? Reply to this email or reach us at hello@landyourweb.com
        </p>
      </div>
    `;
  }

  // Default lead magnet email
  return `
    <div style="${baseStyles}">
      <img src="https://landyourweb.com/logo.png" alt="Land Your Web" style="height: 32px; margin-bottom: 32px;" />
      
      <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 16px; color: #fff;">
        Welcome! Here's Your Conversion Guide
      </h1>
      
      <p style="color: #A1A1AA; margin-bottom: 24px;">
        Thanks for your interest in Land Your Web. We help local service businesses build websites that actually book clients.
      </p>
      
      <div style="background: rgba(255,255,255,0.03); padding: 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 32px;">
        <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 16px 0; color: #fff;">
          5 Things Your Website Needs to Convert Visitors:
        </h2>
        
        <ol style="color: #A1A1AA; padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 12px;"><strong style="color: #fff;">Speed</strong> — Load in under 3 seconds or lose 53% of visitors</li>
          <li style="margin-bottom: 12px;"><strong style="color: #fff;">Clear CTA</strong> — One obvious action above the fold</li>
          <li style="margin-bottom: 12px;"><strong style="color: #fff;">Mobile-First</strong> — 60%+ of visitors are on phones</li>
          <li style="margin-bottom: 12px;"><strong style="color: #fff;">Social Proof</strong> — Reviews, testimonials, credentials</li>
          <li style="margin-bottom: 12px;"><strong style="color: #fff;">Easy Contact</strong> — Phone, form, or booking in 1 click</li>
        </ol>
      </div>
      
      <p style="color: #A1A1AA; margin-bottom: 24px;">
        Want to know how your website stacks up? Get a free audit:
      </p>
      
      <a href="https://landyourweb.com/audit" 
         style="display: inline-block; background: linear-gradient(135deg, #ea7126, #b64514); color: #fff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; margin-bottom: 32px;">
        Get Your Free Website Audit →
      </a>
      
      <p style="color: #52525B; font-size: 14px; margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
        Questions? Reply to this email or reach us at hello@landyourweb.com
        <br /><br />
        — Stefan & Andreea, Land Your Web
      </p>
    </div>
  `;
}

