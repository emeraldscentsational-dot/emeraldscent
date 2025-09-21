import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/utils/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Email template for contact form
    const emailTemplate = `
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
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <h2>Contact Details:</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            
            <h2>Message:</h2>
            <p>${message}</p>
          </div>
          <div class="footer">
            <p>© 2025 EmeraldScentSational. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to admin
    await sendEmail(
      process.env.ADMIN_EMAIL || 'admin@emeraldscentsational.com',
      `Contact Form: ${subject}`,
      emailTemplate
    );

    // Send confirmation email to user
    const confirmationTemplate = `
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
            <h1>Thank You for Contacting Us!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <p><strong>Your message:</strong></p>
            <p style="background-color: #f9fafb; padding: 15px; border-radius: 5px;">${message}</p>
            <p>Thank you for choosing EmeraldScentSational!</p>
          </div>
          <div class="footer">
            <p>© 2025 EmeraldScentSational. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail(
      email,
      'Thank you for contacting EmeraldScentSational',
      confirmationTemplate
    );

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    );
  }
}