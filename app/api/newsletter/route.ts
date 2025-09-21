import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/utils/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Check if email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Add to newsletter
    await prisma.newsletter.create({
      data: { email },
    });

    // Send welcome email
    const welcomeTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #7e22ce, #a855f7); color: white; padding: 40px 20px; text-align: center; }
          .content { padding: 40px 20px; }
          .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to EmeraldScentSational!</h1>
          </div>
          <div class="content">
            <h2>Thank you for subscribing!</h2>
            <p>You're now part of our exclusive fragrance community. Be the first to know about:</p>
            <ul>
              <li>New fragrance launches</li>
              <li>Exclusive offers and discounts</li>
              <li>Fragrance tips and guides</li>
              <li>Behind-the-scenes content</li>
            </ul>
            <p>Get ready to discover your signature scent!</p>
          </div>
          <div class="footer">
            <p>© 2025 EmeraldScentSational. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await sendEmail(
        email,
        'Welcome to EmeraldScentSational Newsletter!',
        welcomeTemplate
      );
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    return NextResponse.json({ message: 'Successfully subscribed' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}