// src/types/index.ts

// Exportar todos los tipos desde un solo lugar
export * from './property';

// Tipos de disponibilidad (Airbnb calendar)
export interface BlockedDate {
  start: Date;
  end: Date;
  summary?: string;
}

export interface AvailabilityData {
  propertyId: string;
  blockedDates: BlockedDate[];
  lastSync: Date;
}

export interface DayAvailability {
  date: Date;
  available: boolean;
}

// Tipos de contacto
export type ContactStatus = 'pending' | 'contacted' | 'closed';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
  status: ContactStatus;
  createdAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
}

// Tipos de navegación
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Tipos de configuración del sitio
export interface SiteConfig {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
  };
}
