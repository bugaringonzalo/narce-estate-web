// src/types/property.ts

// Tipos de propiedad
export type PropertyType = 'apartment' | 'house' | 'ph' | 'office' | 'land' | 'local';

// Tipos de listado
export type ListingType = 'sale' | 'rent' | 'temporary';

// Moneda
export type Currency = 'USD' | 'ARS';

// Propiedad completa (como viene de Firestore)
export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: Currency;
  propertyType: PropertyType;
  listingType: ListingType;
  address: string;
  neighborhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  airbnbUrl?: string;
  icalUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Datos del formulario para crear/editar propiedad
export interface PropertyFormData {
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: Currency;
  propertyType: PropertyType;
  listingType: ListingType;
  address: string;
  neighborhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  airbnbUrl?: string;
  icalUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
}

// Filtros para búsqueda de propiedades
export interface PropertyFilters {
  listingType?: ListingType;
  propertyType?: PropertyType;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minArea?: number;
}

// Props del componente PropertyCard
export interface PropertyCardProps {
  property: Property;
  priority?: boolean; // Para next/image priority loading
  onClick?: () => void;
  className?: string;
}

// Mapeo de tipos para mostrar en español
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: 'Departamento',
  house: 'Casa',
  ph: 'PH',
  office: 'Oficina',
  land: 'Terreno',
  local: 'Local comercial',
};

export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  sale: 'Venta',
  rent: 'Alquiler',
  temporary: 'Alquiler temporario',
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: 'USD',
  ARS: '$',
};
