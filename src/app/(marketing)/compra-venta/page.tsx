import type { Metadata } from 'next';
import { getActiveProperties } from '@/lib/firebase/firestore';
import { ServicePageHero, ServiceSection, ServiceCTA, EmbeddedPropertyListing } from '@/components/services';
import { compraVentaContent } from '@/constants/services';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Compra y Venta de Propiedades',
  description: 'Asesoramiento integral en operaciones de compra y venta de inmuebles en Buenos Aires. Valuación, comercialización y acompañamiento.',
};

export default async function CompraVentaPage() {
  const properties = await getActiveProperties();

  return (
    <div className="min-h-screen">
      <ServicePageHero
        kicker="Compra / Venta"
        title={compraVentaContent.title}
        subtitle={compraVentaContent.subtitle}
        intro={compraVentaContent.intro}
      />

      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <ServiceSection
              title={compraVentaContent.seller.title}
              description=""
              items={compraVentaContent.seller.items}
              footer={compraVentaContent.seller.footer}
            />
            <ServiceSection
              title={compraVentaContent.buyer.title}
              description=""
              items={compraVentaContent.buyer.items}
              footer={compraVentaContent.buyer.footer}
            />
          </div>
        </div>
      </section>

      <EmbeddedPropertyListing
        properties={properties}
        listingType="sale"
        title="Propiedades en venta"
      />

      <ServiceCTA />
    </div>
  );
}
