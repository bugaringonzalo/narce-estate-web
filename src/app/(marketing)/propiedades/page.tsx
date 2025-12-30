// src/app/(marketing)/propiedades/page.tsx
import { Suspense } from 'react';
import { getActiveProperties } from '@/lib/firebase/firestore';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertiesFilters } from '@/components/properties/PropertiesFilters';
import { PropertiesPageClient, AnimatedPropertyGrid } from '@/components/properties/PropertiesPageClient';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

// ISR: revalidar cada 60 segundos
export const revalidate = 60;

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
    return <AnimatedPropertyGrid isEmpty />;
  }

  return (
    <AnimatedPropertyGrid>
      {filteredProperties.map((property, index) => (
        <div key={property.id}>
          <PropertyCard
            property={property}
            priority={index < 6}
          />
        </div>
      ))}
    </AnimatedPropertyGrid>
  );
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <PropertiesPageClient
      filtersSlot={
        <Suspense fallback={<Skeleton className="h-12 w-full max-w-2xl" />}>
          <PropertiesFilters />
        </Suspense>
      }
      gridSlot={
        <Suspense fallback={<PropertyGridSkeleton />}>
          <PropertyGrid searchParams={searchParams} />
        </Suspense>
      }
    />
  );
}
