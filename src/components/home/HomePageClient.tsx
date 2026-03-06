// src/components/home/HomePageClient.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  TrendingUp,
  Home,
  Key,
  Calendar,
  BarChart3,
  Scale,
  Network,
  LineChart,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    icon: TrendingUp,
    label: '01',
    title: 'Inversiones',
    description:
      'Flipping, pozo, cash flow y oportunidades off market. Estrategia con visión financiera para maximizar retornos.',
    href: '/inversiones',
    accent: true,
  },
  {
    icon: Home,
    label: '02',
    title: 'Compra / Venta',
    description:
      'Acompañamiento integral en operaciones de compra y venta. Valuación precisa, comercialización y cierre seguro.',
    href: '/compra-venta',
    accent: false,
  },
  {
    icon: Key,
    label: '03',
    title: 'Alquileres',
    description:
      'Gestión de contratos tradicionales para propietarios e inquilinos. Procesos transparentes y respaldo legal.',
    href: '/alquileres',
    accent: false,
  },
  {
    icon: Calendar,
    label: '04',
    title: 'Temporales',
    description:
      'Renta temporaria en plataformas globales. Puesta en valor, pricing dinámico y operación profesional.',
    href: '/alquileres-temporales',
    accent: false,
  },
];

const diferenciadores = [
  {
    icon: BarChart3,
    title: 'Análisis de mercado',
    description:
      'Interpretamos datos y tendencias para fundamentar cada decisión con evidencia real del mercado porteño.',
  },
  {
    icon: LineChart,
    title: 'Estrategia financiera',
    description:
      'Cada operación se evalúa con criterio financiero: TIR, cap rate, flujo de fondos y horizonte de inversión.',
  },
  {
    icon: Scale,
    title: 'Seguridad jurídica',
    description:
      'Operaciones blindadas desde el análisis de título hasta la escritura. Sin surpresas, sin riesgos ocultos.',
  },
  {
    icon: Network,
    title: 'Red privada',
    description:
      'Acceso a oportunidades off market y una red de inversores, desarrolladores y operadores de primer nivel.',
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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40">

        {/* Background ruled lines — editorial texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 48px)',
          }}
        />

        {/* Large decorative numeral — architectural weight */}
        <span
          className="pointer-events-none absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 select-none font-serif text-[clamp(200px,35vw,500px)] font-bold leading-none text-foreground/[0.03]"
          aria-hidden="true"
        >
          AM
        </span>

        <FloatingDecoration
          className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full blur-3xl bg-primary/5"
          direction="down"
          speed={0.6}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">

            {/* Kicker badge */}
            <SectionTransition type="fade-up" delay={0}>
              <div className="mb-8 inline-flex items-center gap-3">
                <span
                  className="h-px w-12 bg-current opacity-30"
                  style={{ color: 'var(--color-warm, oklch(0.55 0.05 65))' }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.25em]"
                  style={{ color: 'var(--color-warm, oklch(0.55 0.05 65))' }}
                >
                  Buenos Aires · Argentina
                </span>
              </div>
            </SectionTransition>

            <HeroTitle className="font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
              Estrategias inmobiliarias con visión financiera
            </HeroTitle>

            <HeroSubtitle
              className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              delay={0.5}
            >
              Analizamos el mercado, estructuramos la operación y ejecutamos con precisión.
              Más que inmobiliaria — somos tu socio estratégico en real estate.
            </HeroSubtitle>

            <HeroButtons
              className="mt-10 flex flex-wrap gap-4"
              delay={0.8}
            >
              <Button asChild size="lg" className="gap-2 rounded-full px-8 font-semibold">
                <Link href="/propiedades">
                  Ver propiedades
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 rounded-full border-foreground/20 px-8 font-semibold hover:border-foreground/50"
              >
                <Link href="/inversiones">
                  Oportunidades de inversión
                </Link>
              </Button>
            </HeroButtons>
          </div>
        </div>

        {/* Bottom ruled line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border/60" />
      </section>

      {/* ── Servicios ────────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:px-8">

        <div className="mb-14 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionTransition type="fade-up">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: 'var(--color-warm, oklch(0.55 0.05 65))' }}
              >
                Áreas de servicio
              </p>
            </SectionTransition>
            <MaskReveal direction="up" duration={0.9}>
              <TextReveal
                as="h2"
                type="words"
                className="font-serif text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Todo lo que necesitás en un solo lugar
              </TextReveal>
            </MaskReveal>
          </div>
          <AnimatedLine
            className="hidden w-24 sm:block"
            color="var(--color-warm, oklch(0.55 0.05 65))"
          />
        </div>

        <StaggerGrid
          className="grid gap-5 sm:grid-cols-2"
          stagger={0.12}
          direction="up"
          distance={60}
        >
          {servicios.map((servicio) => {
            const Icon = servicio.icon;
            return (
              <Link
                key={servicio.title}
                href={servicio.href}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 transition-all duration-500 hover:border-foreground/20 hover:shadow-xl"
              >
                {/* Hover fill */}
                <div className="absolute inset-0 -translate-y-full bg-foreground/[0.02] transition-transform duration-500 group-hover:translate-y-0" />

                <div className="relative flex flex-col gap-5">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: 'color-mix(in oklch, var(--color-warm, oklch(0.55 0.05 65)) 12%, transparent)',
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: 'var(--color-warm, oklch(0.55 0.05 65))' }}
                      />
                    </div>
                    <span className="font-serif text-4xl font-bold text-foreground/10 transition-colors duration-300 group-hover:text-foreground/20">
                      {servicio.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold tracking-tight">
                      {servicio.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {servicio.description}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
                    style={{ color: 'var(--color-warm, oklch(0.55 0.05 65))' }}
                  >
                    Ver más
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </StaggerGrid>
      </section>

      {/* ── Propiedades destacadas ────────────────────────────── */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionTransition type="slide-left">
                <TextReveal
                  as="h2"
                  type="words"
                  className="font-serif text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Propiedades seleccionadas
                </TextReveal>
              </SectionTransition>
              <SectionTransition type="fade-up" delay={0.2}>
                <p className="mt-2 text-muted-foreground">
                  Una selección curada por nuestro equipo.
                </p>
              </SectionTransition>
            </div>

            <SectionTransition type="slide-right" delay={0.3}>
              <Button
                asChild
                variant="outline"
                className="group gap-2 self-start rounded-full sm:self-auto"
              >
                <Link href="/propiedades">
                  Ver todas
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </SectionTransition>
          </div>

          <StaggerGrid
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.15}
            direction="scale"
          >
            {featuredPropertiesSlot}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Diferenciadores ──────────────────────────────────── */}
      <section className="container mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:px-8">

        <div className="mb-14 text-center">
          <SectionTransition type="fade-up">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: 'var(--color-warm, oklch(0.55 0.05 65))' }}
            >
              Nuestro diferencial
            </p>
          </SectionTransition>
          <MaskReveal direction="left" maskColor="var(--color-warm, oklch(0.55 0.05 65))">
            <TextReveal
              as="h2"
              type="words"
              className="mx-auto max-w-2xl font-serif text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Estrategia, análisis y ejecución
            </TextReveal>
          </MaskReveal>
          <SectionTransition type="blur-in" delay={0.3}>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              No especulamos. Trabajamos con datos, criterio financiero y una red que te abre puertas que otros no ven.
            </p>
          </SectionTransition>
        </div>

        <StaggerGrid
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.15}
          direction="up"
          distance={50}
        >
          {diferenciadores.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group flex flex-col gap-4">
                {/* Number + line */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-serif text-2xl font-bold"
                    style={{ color: 'var(--color-warm, oklch(0.55 0.05 65))' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="h-px flex-1 transition-all duration-500 group-hover:opacity-80"
                    style={{ background: 'var(--color-warm, oklch(0.55 0.05 65))', opacity: 0.3 }}
                  />
                </div>

                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'color-mix(in oklch, var(--color-warm, oklch(0.55 0.05 65)) 10%, transparent)',
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: 'var(--color-warm, oklch(0.55 0.05 65))' }}
                  />
                </div>

                <h3 className="font-serif text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </StaggerGrid>
      </section>

      {/* ── CTA Final ────────────────────────────────────────── */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-background sm:px-14 sm:py-20">

          {/* Background texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 24px)',
            }}
          />

          {/* Decorative serif AM */}
          <span
            className="pointer-events-none absolute -right-8 -top-8 select-none font-serif text-[200px] font-bold leading-none opacity-[0.04]"
            aria-hidden="true"
          >
            AM
          </span>

          <div className="relative mx-auto max-w-2xl text-center">
            <SectionTransition type="flip">
              <TextReveal
                as="h2"
                type="words"
                className="font-serif text-3xl font-bold leading-tight tracking-tight text-background sm:text-4xl md:text-5xl"
              >
                ¿Listo para dar el próximo paso?
              </TextReveal>
            </SectionTransition>

            <SectionTransition type="blur-in" delay={0.3}>
              <p className="mt-5 text-background/60 sm:text-lg">
                Hablemos de tu próxima operación. Sin compromiso, con toda la información
                que necesitás para decidir con claridad.
              </p>
            </SectionTransition>

            <SectionTransition type="zoom-in" delay={0.5}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 rounded-full bg-background px-8 font-semibold text-foreground hover:bg-background/90"
                >
                  <a
                    href="https://wa.me/5491156196355"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-full border-background/30 px-8 font-semibold text-background hover:border-background/60 hover:bg-background/10"
                >
                  <a href="mailto:arcemonsegur@gmail.com">
                    <Mail className="h-5 w-5" />
                    Escribinos
                  </a>
                </Button>
              </div>
            </SectionTransition>
          </div>
        </div>
      </section>

    </div>
  );
};
