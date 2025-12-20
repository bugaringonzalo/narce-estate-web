// src/components/properties/PropertyCard.tsx
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap/gsapConfig';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Bed20Regular,
  VehicleCar20Regular,
  Ruler20Regular,
  Location20Regular,
} from '@fluentui/react-icons';
import type { PropertyCardProps } from '@/types/property';
import {
  PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
  CURRENCY_SYMBOLS,
} from '@/types/property';
import { cn } from '@/lib/utils';

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  priority = false,
  onClick,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Animación de hover con GSAP
  useGSAP(() => {
    if (!cardRef.current || !imageRef.current) return;

    const card = cardRef.current;
    const image = imageRef.current;

    // Animación al hacer hover
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(image, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    // Animación al salir del hover
    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(image, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup al desmontar
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Formatear precio
  const formatPrice = (price: number, currency: string): string => {
    const symbol = CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] || '$';
    
    // Formatear con separadores de miles
    const formattedNumber = new Intl.NumberFormat('es-AR').format(price);
    
    return `${symbol} ${formattedNumber}`;
  };

  // Imagen por defecto si no hay imágenes
  const mainImage = property.images[0] || '/images/property-placeholder.jpg';

  return (
    <Link href={`/propiedades/${property.slug}`} onClick={onClick}>
      <Card
        ref={cardRef}
        className={cn(
          'overflow-hidden cursor-pointer transition-colors',
          'border border-neutral-200 dark:border-neutral-800',
          className
        )}
      >
        {/* Contenedor de imagen */}
        <div className="relative h-56 overflow-hidden">
          <div ref={imageRef} className="h-full w-full">
            <Image
              src={mainImage}
              alt={property.title}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Badges superpuestos */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {/* Tipo de listado */}
            <Badge
              variant={property.listingType === 'sale' ? 'default' : 'secondary'}
              className="text-xs font-medium"
            >
              {LISTING_TYPE_LABELS[property.listingType]}
            </Badge>

            {/* Badge de destacado */}
            {property.isFeatured && (
              <Badge variant="destructive" className="text-xs font-medium">
                Destacado
              </Badge>
            )}
          </div>

          {/* Tipo de propiedad */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-white/90 text-xs backdrop-blur-sm">
              {PROPERTY_TYPE_LABELS[property.propertyType]}
            </Badge>
          </div>
        </div>

        {/* Contenido */}
        <CardContent className="p-4">
          {/* Precio */}
          <p className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {formatPrice(property.price, property.currency)}
          </p>

          {/* Título */}
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            {property.title}
          </h3>

          {/* Ubicación */}
          <div className="mb-3 flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
            <Location20Regular className="h-4 w-4" />
            <span className="line-clamp-1">
              {property.neighborhood}, {property.city}
            </span>
          </div>

          {/* Características */}
          <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            {/* Habitaciones */}
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed20Regular className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}

            {/* Baños */}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <VehicleCar20Regular className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}

            {/* Área */}
            {property.area > 0 && (
              <div className="flex items-center gap-1">
                <Ruler20Regular className="h-4 w-4" />
                <span>{property.area} m²</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
