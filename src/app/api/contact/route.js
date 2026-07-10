import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, company, topic, message } = body;

    console.log('Form received:', { fullName, email, topic });
    console.log('API key exists:', !!process.env.RESEND_API_KEY);

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Expert Electronic <onboarding@resend.dev>',
        to: 'ithcha2525@gmail.com',
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
    console.log('Resend status:', res.status);
    console.log('Resend response:', resBody);

    if (!res.ok) {
      return NextResponse.json({ error: resBody }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log('Exception:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
