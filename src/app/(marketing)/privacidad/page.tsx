import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Narce Estate. Conocé cómo protegemos tu información personal.',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">
              Política de Privacidad
            </h1>
            <p className="mt-4 text-muted-foreground">
              Última actualización: Diciembre 2024
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-gray mx-auto max-w-3xl dark:prose-invert">
          <h2>1. Información que recopilamos</h2>
          <p>
            En Narce Estate, recopilamos información que nos proporcionás directamente cuando:
          </p>
          <ul>
            <li>Completás el formulario de contacto</li>
            <li>Te registrás para recibir actualizaciones</li>
            <li>Realizás consultas sobre propiedades</li>
          </ul>
          <p>
            La información puede incluir: nombre, dirección de correo electrónico,
            número de teléfono y cualquier otra información que elijas proporcionar.
          </p>

          <h2>2. Uso de la información</h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul>
            <li>Responder a tus consultas y solicitudes</li>
            <li>Enviarte información sobre propiedades que puedan interesarte</li>
            <li>Mejorar nuestros servicios y experiencia del usuario</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>

          <h2>3. Compartir información</h2>
          <p>
            No vendemos ni alquilamos tu información personal a terceros.
            Podemos compartir tu información con:
          </p>
          <ul>
            <li>Proveedores de servicios que nos ayudan a operar el sitio</li>
            <li>Autoridades cuando sea requerido por ley</li>
          </ul>

          <h2>4. Seguridad de los datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger
            tu información personal contra acceso no autorizado, pérdida o alteración.
          </p>

          <h2>5. Tus derechos</h2>
          <p>Tenés derecho a:</p>
          <ul>
            <li>Acceder a tu información personal</li>
            <li>Solicitar la corrección de datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al procesamiento de tu información</li>
          </ul>

          <h2>6. Cookies</h2>
          <p>
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia
            en nuestro sitio. Podés configurar tu navegador para rechazar cookies,
            aunque esto puede afectar la funcionalidad del sitio.
          </p>

          <h2>7. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política de privacidad ocasionalmente.
            Te notificaremos sobre cambios significativos publicando la nueva
            política en esta página.
          </p>

          <h2>8. Contacto</h2>
          <p>
            Si tenés preguntas sobre esta política de privacidad, podés contactarnos a través de:
          </p>
          <ul>
            <li>Email: contacto@narceestate.com</li>
            <li>Formulario de contacto en nuestro sitio web</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
