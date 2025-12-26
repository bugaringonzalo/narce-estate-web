import { DashboardStats } from '@/components/admin/DashboardStats';
import { getActiveProperties, getFeaturedProperties } from '@/lib/firebase/firestore';

// No pre-renderizar esta página durante el build
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Obtener estadísticas de propiedades
  const allProperties = await getActiveProperties();
  const featuredProperties = await getFeaturedProperties(100);

  // Calcular stats
  const totalProperties = allProperties.length;
  const totalFeatured = featuredProperties.length;
  const forSale = allProperties.filter(p => p.listingType === 'sale').length;
  const temporary = allProperties.filter(p => p.listingType === 'temporary').length;

  return (
    <DashboardStats
      totalProperties={totalProperties}
      totalFeatured={totalFeatured}
      forSale={forSale}
      temporary={temporary}
    />
  );
}
