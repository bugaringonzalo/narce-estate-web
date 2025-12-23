import { notFound } from 'next/navigation';
import { PropertyForm } from '@/components/admin/PropertyForm';
import { getPropertyById } from '@/lib/firebase/firestore';

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;

  // Obtener la propiedad de Firestore
  const property = await getPropertyById(id);

  // Si no existe, mostrar 404
  if (!property) {
    notFound();
  }

  return <PropertyForm property={property} mode="edit" />;
}
