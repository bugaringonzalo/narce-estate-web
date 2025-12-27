// src/components/home/HomePageClient.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Home,
  Key,
  Calendar,
  Shield,
  Star,
  Users,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  FloatingDecoration,
  SectionTransition,
  TextReveal,
  StaggerGrid,
  MaskReveal,
  AnimatedLine,
} from '@/components/animations';

const servicios = [
  {
    icon: Home,
    title: 'Venta',
    description: 'Encontrá la propiedad perfecta para comprar.',
    href: '/propiedades?type=sale',
  },
  {
    icon: Key,
    title: 'Alquiler',
    description: 'Alquileres tradicionales con contratos seguros.',
    href: '/propiedades?type=rent',
  },
  {
    icon: Calendar,
    title: 'Alquiler Temporal',
    description: 'Estadías cortas con toda la flexibilidad.',
    href: '/propiedades?type=temporary',
  },
];

const ventajas = [
  {
    icon: Shield,
    title: 'Operaciones seguras',
    description: 'Trabajamos con total transparencia y respaldo legal.',
  },
  {
    icon: Star,
    title: '+10 años de experiencia',
    description: 'Conocemos el mercado y te asesoramos mejor.',
  },
  {
    icon: Users,
    title: 'Atención personalizada',
    description: 'Te acompañamos en todo el proceso.',
  },
];

interface HomePageClientProps {
  featuredPropertiesSlot: ReactNode;
}

export const HomePageClient: React.FC<HomePageClientProps> = ({
  featuredPropertiesSlot,
}) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/30">
        <div className="container mx-auto px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <HeroTitle className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Encontrá tu hogar ideal en Buenos Aires
            </HeroTitle>

            <HeroSubtitle className="mt-6 text-lg text-muted-foreground md:text-xl" delay={0.6}>
              Somos tu inmobiliaria de confianza. Te ayudamos a encontrar
              la propiedad perfecta para vos, ya sea para comprar, alquilar
              o para estadías temporales.
            </HeroSubtitle>

            <HeroButtons className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center" delay={0.9}>
              <Button asChild size="lg" className="gap-2">
                <Link href="/propiedades">
                  <Search className="h-5 w-5" />
                  Ver propiedades
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contacto">Contactanos</Link>
              </Button>
            </HeroButtons>
          </div>
        </div>

        {/* Decoraciones flotantes animadas */}
        <FloatingDecoration
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          direction="up"
          speed={0.8}
        />
        <FloatingDecoration
          className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          direction="down"
          speed={1.2}
        />
      </section>

      {/* Servicios */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <MaskReveal direction="up" duration={1}>
            <TextReveal
              as="h2"
              type="words"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Nuestros servicios
            </TextReveal>
          </MaskReveal>

          <SectionTransition type="blur-in" delay={0.3}>
            <p className="mt-4 text-muted-foreground">
              Ofrecemos soluciones para todas tus necesidades inmobiliarias.
            </p>
          </SectionTransition>

          <AnimatedLine className="mx-auto mt-6 max-w-[100px]" color="hsl(var(--primary))" />
        </div>

        <StaggerGrid
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.15}
          direction="up"
          distance={80}
        >
          {servicios.map((servicio) => {
            const Icon = servicio.icon;
            return (
              <Link key={servicio.title} href={servicio.href}>
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{servicio.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {servicio.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </StaggerGrid>
      </section>

      {/* Propiedades destacadas */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <SectionTransition type="slide-left">
                <TextReveal
                  as="h2"
                  type="words"
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Propiedades destacadas
                </TextReveal>
              </SectionTransition>

              <SectionTransition type="fade-up" delay={0.2}>
                <p className="mt-2 text-muted-foreground">
                  Descubrí las mejores opciones seleccionadas para vos.
                </p>
              </SectionTransition>
            </div>

            <SectionTransition type="slide-right" delay={0.3}>
              <Button asChild variant="outline" className="gap-2 self-start sm:self-auto group">
                <Link href="/propiedades">
                  Ver todas
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </SectionTransition>
          </div>

          {/* Slot para las propiedades (vienen del server component) */}
          <StaggerGrid
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.2}
            direction="scale"
          >
            {featuredPropertiesSlot}
          </StaggerGrid>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <MaskReveal direction="left" maskColor="hsl(var(--primary))">
            <TextReveal
              as="h2"
              type="words"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              ¿Por qué elegirnos?
            </TextReveal>
          </MaskReveal>

          <SectionTransition type="blur-in" delay={0.3}>
            <p className="mt-4 text-muted-foreground">
              Somos tu mejor opción para encontrar propiedades en Buenos Aires.
            </p>
          </SectionTransition>
        </div>

        <StaggerGrid
          className="mt-12 grid gap-8 md:grid-cols-3"
          stagger={0.2}
          direction="up"
        >
          {ventajas.map((ventaja) => {
            const Icon = ventaja.icon;
            return (
              <div key={ventaja.title} className="text-center group">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
                  <Icon className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{ventaja.title}</h3>
                <p className="mt-2 text-muted-foreground">{ventaja.description}</p>
              </div>
            );
          })}
        </StaggerGrid>
      </section>

      {/* CTA Final */}
      <section className="bg-primary/5 py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <SectionTransition type="flip">
              <TextReveal
                as="h2"
                type="words"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                ¿Listo para dar el próximo paso?
              </TextReveal>
            </SectionTransition>

            <SectionTransition type="blur-in" delay={0.3}>
              <p className="mt-4 text-muted-foreground">
                Contactanos y te ayudamos a encontrar tu próxima propiedad.
                Estamos para asesorarte en todo el proceso.
              </p>
            </SectionTransition>

            <SectionTransition type="zoom-in" delay={0.5}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="gap-2 group">
                  <Link href="/propiedades">
                    Explorar propiedades
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contacto">Contactanos</Link>
                </Button>
              </div>
            </SectionTransition>
          </div>
        </div>
      </section>
    </div>
  );
};
