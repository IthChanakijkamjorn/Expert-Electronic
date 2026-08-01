import { NextResponse } from 'next/server';

// Simple in-memory rate limit: max 1 submission per IP per 60 seconds
const rateLimitMap = new Map();

export async function POST(request) {
  try {
    // Rate limiting by IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const now = Date.now();
    const lastSubmit = rateLimitMap.get(ip) || 0;

    if (now - lastSubmit < 60000) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before submitting again.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    // Clean up old entries
    if (rateLimitMap.size > 100) {
      for (const [key, time] of rateLimitMap.entries()) {
        if (now - time > 60000) rateLimitMap.delete(key);
      }
    }

    const body = await request.json();
    const { fullName, email, company, topic, message, recaptchaToken } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json({ error: 'Missing reCAPTCHA token.' }, { status: 400 });
    }

    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' }
    );
    const recaptchaData = await recaptchaRes.json();

    // Block if score is too low (0.0 = bot, 1.0 = human). 0.5 is a safe threshold.
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json({ error: 'Failed reCAPTCHA verification.' }, { status: 403 });
    }

    // Basic honeypot / bot check
    const urlPattern = /https?:\/\//i;
    if (urlPattern.test(message) && urlPattern.test(fullName)) {
      return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Expert Electronic <noreply@expertelectronic.co.th>',
        to: ['admin@expertelectronic.co.th', 'auth@expertelectronic.co.th'],
        reply_to: email,
        subject: `New enquiry from ${fullName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Topic:</strong> ${topic}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    const resBody = await res.text();

    if (!res.ok) {
      return NextResponse.json({ error: resBody }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
