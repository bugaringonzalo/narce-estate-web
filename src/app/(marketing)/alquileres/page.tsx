import type { Metadata } from 'next';
import { getActiveProperties } from '@/lib/firebase/firestore';
import { ServicePageHero, ServiceSection, ServiceCTA, EmbeddedPropertyListing } from '@/components/services';
import { alquileresContent } from '@/constants/services';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Alquileres',
  description: 'Alquileres tradicionales en Buenos Aires. Asesoramiento profesional para propietarios e inquilinos.',
};

export default async function AlquileresPage() {
  const properties = await getActiveProperties();

  return (
    <div className="min-h-screen">
      <ServicePageHero
        kicker="Alquileres"
        title={alquileresContent.title}
        subtitle={alquileresContent.subtitle}
        intro={alquileresContent.intro}
      />

      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceSection
            title="Servicios incluidos"
            description=""
            items={alquileresContent.items}
            footer={alquileresContent.footer}
          />
        </div>
      </section>

      <EmbeddedPropertyListing
        properties={properties}
        listingType="rent"
        title="Propiedades en alquiler"
      />

      <ServiceCTA />
    </div>
  );
}
