import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, date, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'M Event House <onboarding@resend.dev>',
      to: ['your-email@example.com'], // Replace with client email
      subject: `Nouveau Message - ${eventType}`,
      html: `
        <h1>Nouvelle demande de devis</h1>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Type d'événement:</strong> ${eventType}</p>
        <p><strong>Date prévue:</strong> ${date}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
