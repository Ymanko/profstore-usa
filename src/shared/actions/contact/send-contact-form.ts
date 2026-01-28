'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_FORM_EMAIL || 'support@profstore-usa.com';

interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface ContactFormResponse {
  success: boolean;
  error?: string;
}

export async function sendContactForm(input: ContactFormInput): Promise<ContactFormResponse> {
  try {
    const subjectLine = `[ProfStore] Contact form — ${input.name}${input.subject ? ` — ${input.subject}` : ''}`;

    // TODO: Change to 'ProfStore Contact <noreply@profstore-usa.com>' after domain verification
    const { error } = await resend.emails.send({
      from: 'ProfStore <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      replyTo: input.email,
      subject: subjectLine,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        ${input.phone ? `<p><strong>Phone:</strong> ${input.phone}</p>` : ''}
        ${input.subject ? `<p><strong>Subject:</strong> ${input.subject}</p>` : ''}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${input.message.replace(/\n/g, '<br />')}</p>
      `,
      text: `
New Contact Form Submission

Name: ${input.name}
Email: ${input.email}
${input.phone ? `Phone: ${input.phone}\n` : ''}${input.subject ? `Subject: ${input.subject}\n` : ''}
Message:
${input.message}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      return { success: false, error: `Resend error: ${error.message}` };
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message',
    };
  }
}
