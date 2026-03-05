import type { Metadata } from 'next';
import { getActiveProperties } from '@/lib/firebase/firestore';
import { ServicePageHero, ServiceSection, ServiceCTA, EmbeddedPropertyListing } from '@/components/services';
import { temporalesContent } from '@/constants/services';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Alquileres Temporales',
  description: 'Gestión completa de renta temporaria en Buenos Aires. Puesta en valor, pricing dinámico, operación y reportes al propietario.',
};

export default async function TemporalesPage() {
  const properties = await getActiveProperties();

  return (
    <div className="min-h-screen">
      <ServicePageHero
        kicker="Alquileres Temporales"
        title={temporalesContent.title}
        subtitle={temporalesContent.subtitle}
        intro={temporalesContent.intro}
      />

      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <ServiceSection
              title="Nuestro servicio incluye"
              description=""
              items={temporalesContent.items}
            />
            <ServiceSection
              title="Enfoque estratégico"
              description={temporalesContent.strategicApproach}
            />
          </div>
        </div>
      </section>

      <EmbeddedPropertyListing
        properties={properties}
        listingType="temporary"
        title="Propiedades para renta temporaria"
      />

      <ServiceCTA
        title="¿Tenés una propiedad para renta temporaria?"
        description="Si sos propietario y querés maximizar la rentabilidad de tu inmueble con gestión profesional, hablemos."
      />
    </div>
  );
}
