import type { Metadata } from 'next';
import { ServicePageHero, ServiceSection, ServiceCTA } from '@/components/services';
import { inversionesContent } from '@/constants/services';

export const metadata: Metadata = {
  title: 'Inversiones Inmobiliarias',
  description: 'Estrategias de inversión inmobiliaria: flipping, pozo, renta, oportunidades off market y proyectos a medida. Buenos Aires.',
};

export default function InversionesPage() {
  return (
    <div className="min-h-screen">
      <ServicePageHero
        kicker="Inversiones Inmobiliarias"
        title={inversionesContent.title}
        subtitle={inversionesContent.subtitle}
      />

      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {inversionesContent.sections.map((section) => (
              <ServiceSection
                key={section.title}
                title={section.title}
                description={section.description}
                listTitle={section.listTitle}
                items={section.items}
                footer={section.footer}
              />
            ))}
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Hablemos de tu próxima inversión"
        description="Si sos inversor y buscás oportunidades inmobiliarias con visión estratégica, contactanos para coordinar una reunión."
      />
    </div>
  );
}
