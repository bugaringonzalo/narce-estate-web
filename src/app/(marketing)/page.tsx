// src/app/(marketing)/page.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Skeleton } from '@/components/ui/skeleton';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { HomePageClient } from '@/components/home/HomePageClient';
import { getFeaturedProperties, getActiveProperties } from '@/lib/firebase/firestore';

// ISR: revalidar cada 60 segundos para mejor performance
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Narce Estate | Tu inmobiliaria de confianza en Buenos Aires',
  description: 'Encontrá tu próximo hogar con Narce Estate. Propiedades en venta, alquiler y alquiler temporal en Buenos Aires.',
};

// Skeleton para propiedades
function FeaturedPropertiesSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-56 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </>
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
      <div className="col-span-full text-center py-12">
        <p className="text-muted-foreground">
          Próximamente más propiedades disponibles.
        </p>
      </div>
    );
  }

  return (
    <>
      {properties.map((property, index) => (
        <div key={property.id}>
          <PropertyCard
            property={property}
            priority={index < 3}
          />
        </div>
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <HomePageClient
      featuredPropertiesSlot={
        <Suspense fallback={<FeaturedPropertiesSkeleton />}>
          <FeaturedProperties />
        </Suspense>
      }
    />
  );
}
