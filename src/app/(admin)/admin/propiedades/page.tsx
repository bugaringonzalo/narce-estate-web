import { PropertiesHeader } from '@/components/admin/PropertiesHeader';
import { PropertiesTable } from '@/components/admin/PropertiesTable';
import { getActiveProperties } from '@/lib/firebase/firestore';

export default async function AdminPropertiesPage() {
  // Obtener todas las propiedades activas
  const properties = await getActiveProperties();

  // Calcular stats
  const totalCount = properties.length;
  const featuredCount = properties.filter(p => p.isFeatured).length;
  const temporaryCount = properties.filter(p => p.listingType === 'temporary').length;

  return (
    <div className="space-y-6">
      <PropertiesHeader
        totalCount={totalCount}
        featuredCount={featuredCount}
        temporaryCount={temporaryCount}
      />

      {/* Tabla de propiedades */}
      <PropertiesTable properties={properties} />
    </div>
  );
}
