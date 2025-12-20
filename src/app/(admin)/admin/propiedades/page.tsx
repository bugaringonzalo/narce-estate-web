import Link from 'next/link';
import { Add24Regular } from '@fluentui/react-icons';
import { Button } from '@/components/ui/button';
import { PropertiesTable } from '@/components/admin/PropertiesTable';
import { getActiveProperties } from '@/lib/firebase/firestore';

export default async function AdminPropertiesPage() {
  // Obtener todas las propiedades activas
  const properties = await getActiveProperties();

  return (
    <div className="space-y-6">
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
        <span>{properties.length} propiedades activas</span>
        <span>·</span>
        <span>{properties.filter(p => p.isFeatured).length} destacadas</span>
        <span>·</span>
        <span>{properties.filter(p => p.listingType === 'temporary').length} en Airbnb</span>
      </div>

      {/* Tabla de propiedades */}
      <PropertiesTable properties={properties} />
    </div>
  );
}
