// src/components/properties/PropertiesPageClient.tsx
'use client';

import { ReactNode } from 'react';
import {
  TextReveal,
  SectionTransition,
  StaggerGrid,
} from '@/components/animations';

interface PropertiesPageClientProps {
  filtersSlot: ReactNode;
  gridSlot: ReactNode;
}

export const PropertiesPageClient: React.FC<PropertiesPageClientProps> = ({
  filtersSlot,
  gridSlot,
}) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <TextReveal
              as="h1"
              type="words"
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              useScrollTrigger={false}
            >
              Propiedades
            </TextReveal>

            <SectionTransition type="blur-in" delay={0.3} duration={0.8}>
              <p className="mt-4 text-lg text-muted-foreground">
                Encontrá tu próximo hogar entre nuestra selección de propiedades
                en venta y alquiler en Buenos Aires
              </p>
            </SectionTransition>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Filtros */}
        <SectionTransition type="fade-up" delay={0.2}>
          {filtersSlot}
        </SectionTransition>

        {/* Grid de propiedades */}
        <div className="mt-8">
          {gridSlot}
        </div>
      </section>
    </div>
  );
};

/**
 * Wrapper para el grid de propiedades con animacion stagger
 */
interface AnimatedPropertyGridProps {
  children?: ReactNode;
  isEmpty?: boolean;
}

export const AnimatedPropertyGrid: React.FC<AnimatedPropertyGridProps> = ({
  children,
  isEmpty = false,
}) => {
  if (isEmpty) {
    return (
      <SectionTransition type="zoom-in">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-muted-foreground">
            No encontramos propiedades con esos filtros
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Probá ajustando los filtros de búsqueda
          </p>
        </div>
      </SectionTransition>
    );
  }

  return (
    <StaggerGrid
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      stagger={0.1}
      direction="up"
      distance={50}
    >
      {children}
    </StaggerGrid>
  );
};
