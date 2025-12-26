// Templates de email para Narce Estate

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://real-estate-web-neon.vercel.app';
const WHATSAPP_NUMBER = '5491112345678'; // Cambiar por el número real

interface ContactConfirmationData {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  propiedad?: string;
}

interface ContactNotificationData {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  asunto?: string;
  propiedad?: string;
  propiedadId?: string;
}

/**
 * Template de email de confirmación para el usuario
 */
export function getContactConfirmationTemplate(data: ContactConfirmationData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recibimos tu consulta - Narce Estate</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: 2px;">
                NARCE ESTATE
              </h1>
              <p style="margin: 8px 0 0 0; color: #a0c4e8; font-size: 14px;">
                Tu inmobiliaria de confianza
              </p>
            </td>
          </tr>

          <!-- Ícono de confirmación -->
          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <div style="width: 80px; height: 80px; background-color: #d4edda; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                <span style="font-size: 40px; line-height: 1;">✓</span>
              </div>
            </td>
          </tr>

          <!-- Mensaje principal -->
          <tr>
            <td style="padding: 0 40px 30px 40px; text-align: center;">
              <h2 style="margin: 0 0 15px 0; color: #1a365d; font-size: 24px; font-weight: 600;">
                ¡Recibimos tu consulta!
              </h2>
              <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Hola <strong>${data.nombre}</strong>, gracias por contactarnos.<br>
                Nuestro equipo revisará tu mensaje y te responderá a la brevedad.
              </p>
            </td>
          </tr>

          <!-- Resumen de la consulta -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">

                <tr>
                  <td style="padding: 20px 20px 15px 20px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #1a365d; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Resumen de tu consulta
                    </p>
                  </td>
                </tr>

                ${data.propiedad ? `
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 5px 0; color: #718096; font-size: 12px; text-transform: uppercase;">
                      Propiedad de interés
                    </p>
                    <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: 500;">
                      ${data.propiedad}
                    </p>
                  </td>
                </tr>
                ` : ''}

                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 5px 0; color: #718096; font-size: 12px; text-transform: uppercase;">
                      Tu email
                    </p>
                    <p style="margin: 0; color: #2d3748; font-size: 15px;">
                      ${data.email}
                    </p>
                  </td>
                </tr>

                ${data.telefono ? `
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 5px 0; color: #718096; font-size: 12px; text-transform: uppercase;">
                      Tu teléfono
                    </p>
                    <p style="margin: 0; color: #2d3748; font-size: 15px;">
                      ${data.telefono}
                    </p>
                  </td>
                </tr>
                ` : ''}

                <tr>
                  <td style="padding: 15px 20px;">
                    <p style="margin: 0 0 5px 0; color: #718096; font-size: 12px; text-transform: uppercase;">
                      Tu mensaje
                    </p>
                    <p style="margin: 0; color: #2d3748; font-size: 15px; line-height: 1.5; font-style: italic;">
                      "${data.mensaje}"
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Tiempo de respuesta -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #ebf8ff; border-radius: 8px; border-left: 4px solid #3182ce;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 5px 0; color: #2c5282; font-size: 14px; font-weight: 600;">
                      Tiempo estimado de respuesta
                    </p>
                    <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.5;">
                      Generalmente respondemos dentro de las <strong>24 horas hábiles</strong>. Si tu consulta es urgente, podés contactarnos directamente por WhatsApp.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Botones -->
          <tr>
            <td align="center" style="padding: 0 40px 30px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-right: 10px;">
                    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Narce%20Estate!%20Hice%20una%20consulta%20por%20la%20web" style="display: inline-block; background-color: #25d366; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                      WhatsApp
                    </a>
                  </td>
                  <td>
                    <a href="${SITE_URL}/propiedades" style="display: inline-block; background-color: #2d5a87; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                      Ver propiedades
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Mensaje adicional -->
          <tr>
            <td style="padding: 0 40px 30px 40px; text-align: center;">
              <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.6;">
                Este es un email automático de confirmación.<br>
                No es necesario que respondas a este mensaje.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #1a365d; font-size: 18px; font-weight: 600; letter-spacing: 1px;">
                      NARCE ESTATE
                    </p>
                    <p style="margin: 0 0 5px 0; color: #718096; font-size: 13px;">
                      Buenos Aires, Argentina
                    </p>
                    <p style="margin: 0 0 15px 0; color: #718096; font-size: 13px;">
                      contacto@narceestate.com
                    </p>
                    <p style="margin: 0; color: #2d5a87; font-size: 13px;">
                      <a href="${SITE_URL}" style="color: #2d5a87; text-decoration: none;">narceestate.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <p style="margin: 20px 0 0 0; color: #a0aec0; font-size: 12px; text-align: center;">
          © ${new Date().getFullYear()} Narce Estate. Todos los derechos reservados.
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}

/**
 * Template de email de notificación para el equipo
 */
export function getContactNotificationTemplate(data: ContactNotificationData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva consulta - Narce Estate</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); padding: 25px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                Nueva consulta de contacto
              </h1>
            </td>
          </tr>

          <!-- Contenido -->
          <tr>
            <td style="padding: 30px 40px;">

              <!-- Info del contacto -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <p style="margin: 0 0 5px 0; color: #718096; font-size: 12px; text-transform: uppercase;">Nombre</p>
                    <p style="margin: 0; color: #1a365d; font-size: 18px; font-weight: 600;">${data.nombre}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 15px;">
                    <p style="margin: 0 0 5px 0; color: #718096; font-size: 12px; text-transform: uppercase;">Email</p>
                    <p style="margin: 0; color: #2d3748; font-size: 16px;">
                      <a href="mailto:${data.email}" style="color: #2d5a87; text-decoration: none;">${data.email}</a>
                    </p>
                  </td>
                </tr>
                ${data.telefono ? `
                <tr>
                  <td style="padding-bottom: 15px;">
                    <p style="margin: 0 0 5px 0; color: #718096; font-size: 12px; text-transform: uppercase;">Teléfono</p>
                    <p style="margin: 0; color: #2d3748; font-size: 16px;">
                      <a href="tel:${data.telefono}" style="color: #2d5a87; text-decoration: none;">${data.telefono}</a>
                    </p>
                  </td>
                </tr>
                ` : ''}
              </table>

              ${data.propiedad ? `
              <!-- Propiedad -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 25px; background-color: #ebf8ff; border-radius: 8px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <p style="margin: 0 0 5px 0; color: #2c5282; font-size: 12px; text-transform: uppercase; font-weight: 600;">Propiedad consultada</p>
                    <p style="margin: 0; color: #2d3748; font-size: 15px;">${data.propiedad}</p>
                    ${data.propiedadId ? `<p style="margin: 5px 0 0 0; color: #718096; font-size: 12px;">ID: ${data.propiedadId}</p>` : ''}
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Mensaje -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #1a365d; font-size: 14px; font-weight: 600;">Mensaje:</p>
                    <p style="margin: 0; color: #4a5568; font-size: 15px; line-height: 1.6; white-space: pre-line;">${data.mensaje}</p>
                  </td>
                </tr>
              </table>

              <!-- Botones de acción -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 25px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}" style="display: inline-block; background-color: #2d5a87; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; margin-right: 10px;">
                      Responder por email
                    </a>
                    ${data.telefono ? `
                    <a href="https://wa.me/${data.telefono.replace(/\D/g, '')}" style="display: inline-block; background-color: #25d366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600;">
                      WhatsApp
                    </a>
                    ` : ''}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; color: #718096; font-size: 13px;">
                <a href="${SITE_URL}/admin/contactos" style="color: #2d5a87; text-decoration: none;">Ver en el panel de admin</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}
