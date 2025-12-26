import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPropertyBySlug, getActiveProperties } from '@/lib/firebase/firestore';
import { PropertyDetail } from '@/components/properties/PropertyDetail';
import { LISTING_TYPE_LABELS, PROPERTY_TYPE_LABELS, CURRENCY_SYMBOLS } from '@/types/property';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Generar metadata dinámica
export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Propiedad no encontrada',
    };
  }

  const symbol = CURRENCY_SYMBOLS[property.currency as keyof typeof CURRENCY_SYMBOLS] || '$';
  const formattedPrice = new Intl.NumberFormat('es-AR').format(property.price);
  const priceText = `${symbol} ${formattedPrice}`;
  const listingType = LISTING_TYPE_LABELS[property.listingType];

  const title = `${property.title} - ${priceText}`;
  const description = `${listingType} en ${property.neighborhood}, ${property.city}. ${property.bedrooms} amb, ${property.bathrooms} baños, ${property.area}m². ${property.description.slice(0, 100)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${siteUrl}/propiedades/${property.slug}`,
      siteName: 'Narce Estate',
      locale: 'es_AR',
      images: property.images[0] ? [{
        url: property.images[0],
        width: 1200,
        height: 630,
        alt: property.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

// Componente para JSON-LD structured data
function PropertyJsonLd({ property }: { property: Awaited<ReturnType<typeof getPropertyBySlug>> }) {
  if (!property) return null;

  const symbol = CURRENCY_SYMBOLS[property.currency as keyof typeof CURRENCY_SYMBOLS] || '$';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${siteUrl}/propiedades/${property.slug}`,
    image: property.images,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.neighborhood,
      addressRegion: property.city,
      addressCountry: 'AR',
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency,
      availability: 'https://schema.org/InStock',
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitCode: 'MTK',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <>
      <PropertyJsonLd property={property} />
      <PropertyDetail property={property} />
    </>
  );
}
