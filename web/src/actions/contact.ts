'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, message: "Name, email, and message are required" };
    }

    try {
        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // Update this when you have a verified domain
            to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'arrows.suhail@gmail.com',
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            // In a production app, it's better to use HTML template:
            // html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`
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
