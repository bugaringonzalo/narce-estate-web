// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email de destino (donde llegan los mensajes de contacto)
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contacto@narce.com';

// Email del remitente (debe ser un dominio verificado en Resend o usar onboarding@resend.dev para testing)
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validar campos requeridos
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Construir el asunto del email
    const subject = body.propertyTitle
      ? `Consulta sobre: ${body.propertyTitle}`
      : body.subject || 'Nueva consulta desde el sitio web';

    // Construir el cuerpo del email en HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
          Nueva consulta de contacto
        </h2>

        <div style="margin: 20px 0;">
          <p><strong>Nombre:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          ${body.phone ? `<p><strong>Teléfono:</strong> ${body.phone}</p>` : ''}
          ${body.propertyTitle ? `<p><strong>Propiedad:</strong> ${body.propertyTitle}</p>` : ''}
          ${body.propertyId ? `<p><strong>ID Propiedad:</strong> ${body.propertyId}</p>` : ''}
        </div>

        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Mensaje:</h3>
          <p style="white-space: pre-line; color: #333;">${body.message}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
        <p style="color: #888; font-size: 12px;">
          Este mensaje fue enviado desde el formulario de contacto de Narce Estate.
        </p>
      </div>
    `;

    // Enviar email al equipo
    const { data, error } = await resend.emails.send({
      from: `Narce Estate <${FROM_EMAIL}>`,
      to: [CONTACT_EMAIL],
      replyTo: body.email,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje' },
        { status: 500 }
      );
    }

    // Enviar email de confirmación al usuario
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
          ¡Gracias por contactarnos!
        </h2>

        <p style="color: #555;">Hola ${body.name},</p>

        <p style="color: #555;">
          Recibimos tu mensaje y te responderemos a la brevedad.
        </p>

        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #555; font-size: 14px;"><strong>Tu mensaje:</strong></p>
          <p style="white-space: pre-line; color: #333; margin-top: 10px;">${body.message}</p>
        </div>

        <p style="color: #555;">
          Mientras tanto, podés seguir explorando nuestras propiedades en
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://narceestate.com'}" style="color: #0066cc;">
            nuestro sitio web
          </a>.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
        <p style="color: #888; font-size: 12px;">
          Narce Estate - Tu inmobiliaria de confianza
        </p>
      </div>
    `;

    // Intentar enviar confirmación (no bloqueante)
    resend.emails.send({
      from: `Narce Estate <${FROM_EMAIL}>`,
      to: [body.email],
      subject: 'Recibimos tu consulta - Narce Estate',
      html: confirmationHtml,
    }).catch((err) => {
      console.error('Error sending confirmation email:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente',
      id: data?.id,
    });

  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
