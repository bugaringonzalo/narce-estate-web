'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bed, MapPin, Ruler, Check, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ShareButtons } from './ShareButtons';
import { FavoriteButton } from './FavoriteButton';
import type { Property } from '@/types/property';
import {
  PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
  CURRENCY_SYMBOLS,
} from '@/types/property';

interface PropertyDetailProps {
  property: Property;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Formatear precio
  const formatPrice = (price: number, currency: string): string => {
    const symbol = CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] || '$';
    const formattedNumber = new Intl.NumberFormat('es-AR').format(price);
    return `${symbol} ${formattedNumber}`;
  };

  // Navegación de imágenes
  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  }, [property.images.length]);

  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  }, [property.images.length]);

  // Imagen principal
  const mainImage = property.images[selectedImageIndex] || property.images[0];

  return (
    <div className="min-h-screen pb-20">
      {/* Header con navegación */}
      <div className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur md:top-20">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/propiedades">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div className="flex gap-2">
            <FavoriteButton propertyId={property.id} />
            <ShareButtons
              title={property.title}
              url={`/propiedades/${property.slug}`}
              description={`${LISTING_TYPE_LABELS[property.listingType]} en ${property.neighborhood}`}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Columna principal */}
          <div className="space-y-8 lg:col-span-2">
            {/* Galería de imágenes */}
            <div className="space-y-4">
              {/* Imagen principal con controles */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl group">
                {mainImage ? (
                  <>
                    <Image
                      src={mainImage}
                      alt={property.title}
                      fill
                      priority
                      className="object-cover cursor-pointer transition-transform hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      onClick={() => setLightboxOpen(true)}
                    />
                    {/* Controles de navegación */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                          aria-label="Siguiente imagen"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                        {/* Contador de imágenes */}
                        <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                          {selectedImageIndex + 1} / {property.images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <span className="text-muted-foreground">Sin imagen</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-primary'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.title} - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Lightbox */}
              <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogContent className="max-w-6xl border-none bg-black/95 p-0">
                  <div className="relative flex h-[80vh] items-center justify-center">
                    {/* Botón cerrar */}
                    <button
                      onClick={() => setLightboxOpen(false)}
                      className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    >
                      <X className="h-6 w-6" />
                    </button>

                    {/* Imagen */}
                    {mainImage && (
                      <Image
                        src={mainImage}
                        alt={property.title}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    )}

                    {/* Navegación en lightbox */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                        >
                          <ChevronLeft className="h-8 w-8" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                        >
                          <ChevronRight className="h-8 w-8" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
                          {selectedImageIndex + 1} / {property.images.length}
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Información principal */}
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant={property.listingType === 'sale' ? 'default' : 'secondary'}>
                  {LISTING_TYPE_LABELS[property.listingType]}
                </Badge>
                <Badge variant="outline">
                  {PROPERTY_TYPE_LABELS[property.propertyType]}
                </Badge>
                {property.isFeatured && (
                  <Badge variant="destructive">Destacada</Badge>
                )}
              </div>

              <h1 className="mb-2 text-3xl font-bold">{property.title}</h1>

              <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{property.address}, {property.neighborhood}, {property.city}</span>
              </div>

              <p className="text-4xl font-bold text-primary">
                {formatPrice(property.price, property.currency)}
                {property.listingType !== 'sale' && (
                  <span className="text-lg font-normal text-muted-foreground"> /mes</span>
                )}
              </p>
            </div>

            {/* Características principales */}
            <div className="grid grid-cols-3 gap-4 rounded-xl bg-muted/50 p-6">
              <div className="text-center">
                <Bed className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="text-2xl font-bold">{property.bedrooms}</p>
                <p className="text-sm text-muted-foreground">Ambientes</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center text-2xl text-primary">
                  🚿
                </div>
                <p className="text-2xl font-bold">{property.bathrooms}</p>
                <p className="text-sm text-muted-foreground">Baños</p>
              </div>
              <div className="text-center">
                <Ruler className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="text-2xl font-bold">{property.area}</p>
                <p className="text-sm text-muted-foreground">m² totales</p>
              </div>
            </div>

            {/* Descripción */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-muted-foreground">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card de contacto */}
            <Card className="sticky top-40">
              <CardHeader>
                <CardTitle>¿Te interesa esta propiedad?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Contactanos para coordinar una visita o recibir más información.
                </p>
                <Link href="/contacto">
                  <Button className="w-full" size="lg">
                    Contactar
                  </Button>
                </Link>

                {/* Botón de Airbnb si es alquiler temporal */}
                {property.listingType === 'temporary' && property.airbnbUrl && (
                  <a
                    href={property.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full gap-2" size="lg">
                      <ExternalLink className="h-4 w-4" />
                      Ver en Airbnb
                    </Button>
                  </a>
                )}

                <div className="rounded-lg bg-muted p-4">
                  <p className="text-center text-sm text-muted-foreground">
                    Código de propiedad
                  </p>
                  <p className="text-center font-mono text-lg font-bold">
                    {property.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
