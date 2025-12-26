import { Suspense } from 'react';
import { getActiveProperties } from '@/lib/firebase/firestore';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertiesFilters } from '@/components/properties/PropertiesFilters';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

// Renderizar dinámicamente
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Propiedades | Narce Estate',
  description: 'Explorá nuestra selección de propiedades en venta y alquiler en Buenos Aires.',
};

// Componente de loading para el grid
function PropertyGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
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

// Componente async para el grid de propiedades
async function PropertyGrid({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const properties = await getActiveProperties();

  // Filtrar propiedades según los parámetros de búsqueda
  let filteredProperties = properties;

  if (params.type) {
    filteredProperties = filteredProperties.filter(
      (p) => p.listingType === params.type
    );
  }

  if (params.propertyType) {
    filteredProperties = filteredProperties.filter(
      (p) => p.propertyType === params.propertyType
    );
  }

  if (params.neighborhood) {
    filteredProperties = filteredProperties.filter(
      (p) => p.neighborhood === params.neighborhood
    );
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-muted-foreground">
          No encontramos propiedades con esos filtros
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Probá ajustando los filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProperties.map((property, index) => (
        <PropertyCard
          key={property.id}
          property={property}
          priority={index < 6}
        />
      ))}
    </div>
  );
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Propiedades
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Encontrá tu próximo hogar entre nuestra selección de propiedades
              en venta y alquiler en Buenos Aires
            </p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Filtros */}
        <Suspense fallback={<Skeleton className="h-12 w-full max-w-2xl" />}>
          <PropertiesFilters />
        </Suspense>

        {/* Grid de propiedades */}
        <div className="mt-8">
          <Suspense fallback={<PropertyGridSkeleton />}>
            <PropertyGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
