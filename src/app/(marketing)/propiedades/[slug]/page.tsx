import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPropertyBySlug, getActiveProperties } from '@/lib/firebase/firestore';
import { PropertyDetail } from '@/components/properties/PropertyDetail';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

// Generar metadata dinámica
export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Propiedad no encontrada | Narce Estate',
    };
  }

  return {
    title: `${property.title} | Narce Estate`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images[0] ? [property.images[0]] : [],
    },
  };
}

// Generar rutas estáticas para las propiedades
export async function generateStaticParams() {
  const properties = await getActiveProperties();

  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetail property={property} />;
}
