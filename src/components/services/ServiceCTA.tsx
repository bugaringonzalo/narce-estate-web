'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionTransition } from '@/components/animations';

interface ServiceCTAProps {
  title?: string;
  description?: string;
  whatsappNumber?: string;
  email?: string;
}

const DEFAULT_WHATSAPP = '5491112345678';
const DEFAULT_EMAIL = 'info@arcemonsegur.com';

export const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title = '¿Listo para dar el próximo paso?',
  description = 'Contactanos y coordinamos una charla para entender tu objetivo. Te acompañamos en todo el proceso.',
  whatsappNumber = DEFAULT_WHATSAPP,
  email = DEFAULT_EMAIL,
}) => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTransition type="blur-in" duration={0.8}>
          <div className="rounded-3xl bg-foreground p-8 md:p-12 text-background">
            <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-background/70 leading-relaxed">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-background text-foreground hover:bg-background/90"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-background/20 text-background hover:bg-background/10"
              >
                <Link href={`mailto:${email}`}>
                  Enviar email
                </Link>
              </Button>
            </div>
          </div>
        </SectionTransition>
      </div>
    </section>
  );
};
