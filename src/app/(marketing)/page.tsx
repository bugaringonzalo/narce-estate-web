import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
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
import { Skeleton } from '@/components/ui/skeleton';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { getFeaturedProperties, getActiveProperties } from '@/lib/firebase/firestore';

// Renderizar dinámicamente para evitar errores de Firebase en build
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Narce Estate | Tu inmobiliaria de confianza en Buenos Aires',
  description: 'Encontrá tu próximo hogar con Narce Estate. Propiedades en venta, alquiler y alquiler temporal en Buenos Aires.',
};

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

// Skeleton para propiedades
function FeaturedPropertiesSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-56 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}

// Componente async para propiedades destacadas
async function FeaturedProperties() {
  // Intentar obtener destacadas, si no hay, obtener las últimas
  let properties = await getFeaturedProperties(3);

  if (properties.length === 0) {
    const allProperties = await getActiveProperties();
    properties = allProperties.slice(0, 3);
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Próximamente más propiedades disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, index) => (
        <PropertyCard
          key={property.id}
          property={property}
          priority={index < 3}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/30">
        <div className="container mx-auto px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Encontrá tu{' '}
              <span className="text-primary">hogar ideal</span>{' '}
              en Buenos Aires
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Somos tu inmobiliaria de confianza. Te ayudamos a encontrar
              la propiedad perfecta para vos, ya sea para comprar, alquilar
              o para estadías temporales.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/propiedades">
                  <Search className="h-5 w-5" />
                  Ver propiedades
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contacto">Contactanos</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </section>

      {/* Servicios */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nuestros servicios
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ofrecemos soluciones para todas tus necesidades inmobiliarias.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio) => {
            const Icon = servicio.icon;
            return (
              <Link key={servicio.title} href={servicio.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
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
        </div>
      </section>

      {/* Propiedades destacadas */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Propiedades destacadas
              </h2>
              <p className="mt-2 text-muted-foreground">
                Descubrí las mejores opciones seleccionadas para vos.
              </p>
            </div>
            <Button asChild variant="outline" className="gap-2 self-start sm:self-auto">
              <Link href="/propiedades">
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Suspense fallback={<FeaturedPropertiesSkeleton />}>
            <FeaturedProperties />
          </Suspense>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Por qué elegirnos?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Somos tu mejor opción para encontrar propiedades en Buenos Aires.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {ventajas.map((ventaja) => {
            const Icon = ventaja.icon;
            return (
              <div key={ventaja.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{ventaja.title}</h3>
                <p className="mt-2 text-muted-foreground">{ventaja.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para dar el próximo paso?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contactanos y te ayudamos a encontrar tu próxima propiedad.
              Estamos para asesorarte en todo el proceso.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/propiedades">
                  Explorar propiedades
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contacto">Contactanos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
