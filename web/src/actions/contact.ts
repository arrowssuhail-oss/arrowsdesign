'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message || !subject) {
        return { success: false, message: "Name, email, subject, and message are required" };
    }

    const subjectMap: Record<string, string> = {
        project: '🚀 New Project Inquiry',
        hiring: '💼 Job Application / Hiring',
        general: '💬 General Inquiry',
    };

    const displaySubject = subjectMap[subject] || '📬 New Contact Form Submission';

    try {
        const data = await resend.emails.send({
            from: `Contact Form <info@arrowsdesign.me>`, // Use the verified custom domain
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'arrows.suhail@gmail.com',
            replyTo: email,
            subject: `${displaySubject} from ${name}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>    
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Topic:</strong> ${displaySubject.replace(/[^\w\s]/gi, '').trim()}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
        });

        if (data.error) {
            console.error("Resend API Error:", data.error);
            return { success: false, message: data.error.message || "Failed to send email" };
        }

        return { success: true, message: "Message sent successfully!" };
    } catch (e) {
        console.error("Error sending email via Resend:", e);
        return { success: false, message: "An unexpected error occurred" };
    }
}
