// src/app/(marketing)/nosotros/page.tsx
'use client';

import Link from 'next/link';
import {
  Users,
  Star,
  Handshake,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  TextReveal,
  SectionTransition,
  StaggerGrid,
  AnimatedCounter,
  MaskReveal,
  ParallaxSection,
  AnimatedLine,
} from '@/components/animations';

const valores = [
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Trabajamos con transparencia y honestidad en cada operación.',
  },
  {
    icon: Handshake,
    title: 'Compromiso',
    description: 'Nos comprometemos a encontrar la mejor opción para vos.',
  },
  {
    icon: Star,
    title: 'Excelencia',
    description: 'Buscamos la excelencia en cada detalle de nuestro servicio.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Te acompañamos en todo el proceso de manera personalizada.',
  },
];

const estadisticas = [
  { valor: 10, suffix: '+', label: 'Años de experiencia' },
  { valor: 500, suffix: '+', label: 'Propiedades vendidas' },
  { valor: 1000, suffix: '+', label: 'Clientes satisfechos' },
  { valor: 50, suffix: '+', label: 'Propiedades activas' },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <TextReveal
              as="h1"
              type="words"
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              useScrollTrigger={false}
            >
              Sobre Nosotros
            </TextReveal>

            <SectionTransition type="blur-in" delay={0.5} duration={0.8}>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Somos una inmobiliaria con más de 10 años de experiencia en el mercado
                inmobiliario de Buenos Aires, comprometidos con encontrar el hogar
                perfecto para cada cliente.
              </p>
            </SectionTransition>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <SectionTransition type="slide-left" delay={0.1}>
            <div>
              <MaskReveal direction="left">
                <TextReveal
                  as="h2"
                  type="words"
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Nuestra Historia
                </TextReveal>
              </MaskReveal>

              <AnimatedLine className="my-6 max-w-[80px]" color="hsl(var(--primary))" delay={0.3} />

              <StaggerGrid className="space-y-4 text-muted-foreground" stagger={0.1} direction="up">
                <p>
                  Narce Estate nació de la pasión por conectar personas con sus hogares
                  ideales. Desde nuestros inicios, nos propusimos ofrecer un servicio
                  diferente: cercano, transparente y enfocado en las necesidades reales
                  de cada cliente.
                </p>
                <p>
                  A lo largo de los años, hemos construido relaciones duraderas basadas
                  en la confianza y el profesionalismo. Cada propiedad que gestionamos
                  es tratada con el mismo cuidado y dedicación.
                </p>
                <p>
                  Hoy, seguimos creciendo y evolucionando, incorporando tecnología y
                  nuevas herramientas para brindarte la mejor experiencia en la búsqueda
                  de tu próximo hogar.
                </p>
              </StaggerGrid>
            </div>
          </SectionTransition>

          <SectionTransition type="slide-right" delay={0.3}>
            <div className="relative">
              <ParallaxSection speed={0.2}>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="text-6xl font-bold text-primary">
                      <AnimatedCounter value={10} suffix="+" duration={2.5} />
                    </span>
                    <p className="mt-2 text-lg text-muted-foreground">
                      Años construyendo hogares
                    </p>
                  </div>
                </div>
              </ParallaxSection>
            </div>
          </SectionTransition>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="bg-muted/30 py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerGrid
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
            stagger={0.15}
            direction="scale"
          >
            {estadisticas.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary md:text-5xl">
                  <AnimatedCounter
                    value={stat.valor}
                    suffix={stat.suffix}
                    duration={2}
                    delay={index * 0.1}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <MaskReveal direction="up">
            <TextReveal
              as="h2"
              type="words"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Nuestros Valores
            </TextReveal>
          </MaskReveal>

          <SectionTransition type="blur-in" delay={0.3}>
            <p className="mt-4 text-muted-foreground">
              Los principios que guían nuestro trabajo día a día.
            </p>
          </SectionTransition>

          <AnimatedLine className="mx-auto mt-6 max-w-[100px]" color="hsl(var(--primary))" delay={0.4} />
        </div>

        <StaggerGrid
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
          direction="up"
          distance={60}
        >
          {valores.map((valor) => {
            const Icon = valor.icon;
            return (
              <Card
                key={valor.title}
                className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50 group"
              >
                <CardContent className="pt-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="mt-4 font-semibold">{valor.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {valor.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </StaggerGrid>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <SectionTransition type="flip">
              <TextReveal
                as="h2"
                type="words"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                ¿Listo para encontrar tu hogar?
              </TextReveal>
            </SectionTransition>

            <SectionTransition type="blur-in" delay={0.3}>
              <p className="mt-4 text-muted-foreground">
                Contactanos y te ayudamos a encontrar la propiedad perfecta para vos.
              </p>
            </SectionTransition>

            <SectionTransition type="zoom-in" delay={0.5}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="gap-2 group">
                  <Link href="/propiedades">
                    Ver propiedades
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
}
