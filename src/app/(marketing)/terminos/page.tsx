import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso del sitio web de Narce Estate.',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">
              Términos y Condiciones
            </h1>
            <p className="mt-4 text-muted-foreground">
              Última actualización: Diciembre 2024
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-gray mx-auto max-w-3xl dark:prose-invert">
          <h2>1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar el sitio web de Narce Estate, aceptás estos
            términos y condiciones en su totalidad. Si no estás de acuerdo con
            estos términos, te pedimos que no utilices nuestro sitio.
          </p>

          <h2>2. Descripción del servicio</h2>
          <p>
            Narce Estate es una plataforma inmobiliaria que ofrece servicios de:
          </p>
          <ul>
            <li>Publicación de propiedades en venta</li>
            <li>Publicación de propiedades en alquiler</li>
            <li>Alquiler temporal de propiedades</li>
            <li>Intermediación inmobiliaria</li>
          </ul>

          <h2>3. Información de las propiedades</h2>
          <p>
            Nos esforzamos por mantener la información de las propiedades actualizada
            y precisa. Sin embargo, no garantizamos que toda la información sea
            completamente exacta en todo momento. Te recomendamos verificar los
            detalles directamente con nosotros antes de tomar decisiones.
          </p>

          <h2>4. Uso del sitio</h2>
          <p>Te comprometés a:</p>
          <ul>
            <li>Usar el sitio solo para fines legales</li>
            <li>No intentar acceder a áreas restringidas del sitio</li>
            <li>No utilizar el sitio para enviar spam o contenido malicioso</li>
            <li>Proporcionar información veraz en los formularios de contacto</li>
          </ul>

          <h2>5. Propiedad intelectual</h2>
          <p>
            Todo el contenido del sitio, incluyendo textos, imágenes, logos y diseño,
            es propiedad de Narce Estate o sus licenciantes y está protegido por
            las leyes de propiedad intelectual.
          </p>

          <h2>6. Limitación de responsabilidad</h2>
          <p>
            Narce Estate no se hace responsable de:
          </p>
          <ul>
            <li>Errores u omisiones en la información publicada</li>
            <li>Interrupciones en el servicio del sitio web</li>
            <li>Daños derivados del uso o imposibilidad de uso del sitio</li>
            <li>Decisiones tomadas basándose en la información del sitio</li>
          </ul>

          <h2>7. Enlaces a terceros</h2>
          <p>
            Nuestro sitio puede contener enlaces a sitios web de terceros.
            No tenemos control sobre el contenido de estos sitios y no asumimos
            responsabilidad por ellos.
          </p>

          <h2>8. Intermediación inmobiliaria</h2>
          <p>
            Narce Estate actúa como intermediario entre compradores/inquilinos
            y propietarios. Las transacciones finales están sujetas a las
            condiciones acordadas entre las partes y a la legislación vigente.
          </p>

          <h2>9. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Los cambios entrarán en vigencia inmediatamente después de su publicación
            en el sitio.
          </p>

          <h2>10. Legislación aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República Argentina.
            Cualquier disputa será sometida a los tribunales competentes de la
            Ciudad Autónoma de Buenos Aires.
          </p>

          <h2>11. Contacto</h2>
          <p>
            Para consultas sobre estos términos, contactanos a través de:
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
