'use client';

import { Badge } from '@/components/ui/badge';
import { TextReveal, SectionTransition } from '@/components/animations';

interface ServicePageHeroProps {
  kicker: string;
  title: string;
  subtitle: string;
  intro?: string;
}

export const ServicePageHero: React.FC<ServicePageHeroProps> = ({
  kicker,
  title,
  subtitle,
  intro,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-muted/50 to-background py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionTransition type="blur-in" duration={0.6}>
            <Badge variant="outline" className="mb-4 text-xs font-semibold uppercase tracking-widest">
              {kicker}
            </Badge>
          </SectionTransition>

          <TextReveal
            as="h1"
            type="words"
            className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            useScrollTrigger={false}
          >
            {title}
          </TextReveal>

          <SectionTransition type="blur-in" delay={0.4} duration={0.8}>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
              {subtitle}
            </p>
          </SectionTransition>

          {intro && (
            <SectionTransition type="blur-in" delay={0.6} duration={0.8}>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                {intro}
              </p>
            </SectionTransition>
          )}
        </div>
      </div>
    </section>
  );
};
