'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { StaggerGrid, SectionTransition } from '@/components/animations';
import type { Property, ListingType } from '@/types/property';

interface EmbeddedPropertyListingProps {
  properties: Property[];
  listingType: ListingType;
  title?: string;
  maxItems?: number;
}

const TYPE_LABELS: Record<ListingType, string> = {
  sale: 'En Venta',
  rent: 'En Alquiler',
  temporary: 'Alquiler Temporal',
};

export const EmbeddedPropertyListing: React.FC<EmbeddedPropertyListingProps> = ({
  properties,
  listingType,
  title = 'Propiedades disponibles',
  maxItems = 6,
}) => {
  const filtered = properties
    .filter((p) => p.listingType === listingType)
    .slice(0, maxItems);

  if (filtered.length === 0) {
    return (
      <section className="py-14 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTransition type="blur-in">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Próximamente más propiedades disponibles.
              </p>
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link href={`/propiedades?type=${listingType}`}>
                  Ver todas las propiedades
                </Link>
              </Button>
            </div>
          </SectionTransition>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="outline" className="mb-3 text-xs font-semibold uppercase tracking-widest">
            {TYPE_LABELS[listingType]}
          </Badge>
          <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>

        <StaggerGrid
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
          direction="up"
          distance={50}
        >
          {filtered.map((property, index) => (
            <div key={property.id}>
              <PropertyCard property={property} priority={index < 3} />
            </div>
          ))}
        </StaggerGrid>

        <div className="mt-8">
          <Button asChild variant="outline" className="gap-2 rounded-full group">
            <Link href={`/propiedades?type=${listingType}`}>
              Ver todas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
