'use client';

import Link from 'next/link';
import { Add24Regular } from '@fluentui/react-icons';
import { Button } from '@/components/ui/button';

interface PropertiesHeaderProps {
  totalCount: number;
  featuredCount: number;
  temporaryCount: number;
}

export function PropertiesHeader({
  totalCount,
  featuredCount,
  temporaryCount,
}: PropertiesHeaderProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Propiedades</h1>
          <p className="text-muted-foreground">
            Administrá las propiedades del sitio
          </p>
        </div>
        <Link href="/admin/propiedades/nueva">
          <Button className="gap-2">
            <Add24Regular className="h-4 w-4" />
            Nueva Propiedad
          </Button>
        </Link>
      </div>

      {/* Stats rápidos */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>{totalCount} propiedades activas</span>
        <span>·</span>
        <span>{featuredCount} destacadas</span>
        <span>·</span>
        <span>{temporaryCount} en Airbnb</span>
      </div>
    </>
  );
}
