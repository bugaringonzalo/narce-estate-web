# 🏠 PROJECT RULES - Narce Estate Website

> **IMPORTANTE:** El nombre del proyecto/sitio web es **"Narce Estate"**. SIEMPRE usar "Narce Estate" en lugar de "Real Estate" en todo el código, componentes, metadata y contenido.

## 📋 Resumen del Proyecto

Sitio web inmobiliario **Narce Estate** para mostrar propiedades en venta y alquiler temporal (Airbnb). El objetivo es crear una experiencia visual moderna, con animaciones fluidas y una integración directa con los calendarios de disponibilidad de Airbnb.

**Referencia de diseño:** https://www.mirandabosch.com (estilo directo, profesional, cards efectivas)

**Cliente:** Inmobiliaria Narce Estate con propiedades en Airbnb

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Next.js** | 15.x | Framework principal (App Router) |
| **TypeScript** | 5.x | Tipado estricto obligatorio |
| **React** | 19.x | UI Library |
| **Tailwind CSS** | 4.x | Estilos utilitarios |
| **shadcn/ui** | latest | Componentes UI base |
| **GSAP** | 3.x | Animaciones (scroll, hover, transiciones) |
| **@gsap/react** | latest | Hook useGSAP para React |
| **Fluent UI Icons** | latest | Iconografía (Microsoft Open Source) |

### Backend & Database
| Tecnología | Uso |
|------------|-----|
| **Next.js API Routes** | Endpoints REST |
| **Firebase Firestore** | Base de datos NoSQL |
| **Firebase Auth** | Autenticación (admin panel) |
| **Firebase Storage** | Almacenamiento de imágenes |
| **node-ical** | Parser de calendarios iCal de Airbnb |

### Recursos Externos
- **tweakcn.com** - Temas UI para shadcn
- **mobbin.com** - Patrones de diseño
- **gsap.com** - Documentación animaciones
- **github.com/microsoft/fluentui-system-icons** - Iconos

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (marketing)/              # Páginas públicas
│   │   ├── page.tsx              # Home
│   │   ├── propiedades/
│   │   │   ├── page.tsx          # Listado
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Detalle propiedad
│   │   ├── nosotros/
│   │   │   └── page.tsx
│   │   └── contacto/
│   │       └── page.tsx
│   ├── (admin)/                  # Panel admin (protegido)
│   │   ├── layout.tsx            # Layout con auth check
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── propiedades/
│   │       │   ├── page.tsx      # CRUD propiedades
│   │       │   └── [id]/
│   │       │       └── page.tsx  # Editar propiedad
│   │       └── configuracion/
│   │           └── page.tsx      # URLs iCal, etc.
│   ├── api/
│   │   ├── properties/
│   │   │   ├── route.ts          # GET all, POST create
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET, PUT, DELETE
│   │   ├── availability/
│   │   │   └── [propertyId]/
│   │   │       └── route.ts      # Sync con Airbnb iCal
│   │   └── contact/
│   │       └── route.ts          # Formulario contacto
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn components
│   ├── animations/               # Wrappers GSAP
│   │   ├── FadeIn.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── StaggerChildren.tsx
│   │   └── PageTransition.tsx
│   ├── properties/
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyGrid.tsx
│   │   ├── PropertyFilters.tsx
│   │   ├── PropertyGallery.tsx
│   │   └── AvailabilityCalendar.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── Logo.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedProperties.tsx
│   │   ├── NeighborhoodGuide.tsx
│   │   └── ContactCTA.tsx
│   └── forms/
│       ├── ContactForm.tsx
│       ├── PropertyForm.tsx
│       └── SearchForm.tsx
├── lib/
│   ├── gsap/
│   │   └── gsapConfig.ts         # Configuración centralizada GSAP
│   ├── firebase/
│   │   ├── config.ts             # Inicialización Firebase
│   │   ├── firestore.ts          # Helpers Firestore
│   │   ├── auth.ts               # Helpers Auth
│   │   └── storage.ts            # Helpers Storage
│   ├── airbnb/
│   │   └── icalParser.ts         # Parser de calendarios
│   └── utils.ts                  # Utilidades generales (cn, formatPrice, etc.)
├── hooks/
│   ├── useGSAPAnimations.ts      # Hook custom para animaciones
│   ├── useAvailability.ts        # Hook para calendario Airbnb
│   ├── useProperties.ts          # Hook para propiedades
│   ├── useAuth.ts                # Hook para autenticación
│   └── useAppReady.ts            # Estado de carga de la app
├── types/
│   ├── index.ts                  # Export general
│   ├── property.ts               # Tipos de propiedad
│   ├── availability.ts           # Tipos de disponibilidad
│   └── user.ts                   # Tipos de usuario
├── constants/
│   ├── index.ts
│   └── navigation.ts             # Links de navegación
└── styles/
    └── globals.css
```

---

## 🎨 Convenciones de Código

### TypeScript - Tipado Obligatorio
```typescript
// ✅ SIEMPRE tipar props de componentes ANTES de definirlos
interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  currency: 'USD' | 'ARS';
  images: string[];
  location: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: 'apartment' | 'house' | 'ph' | 'office';
  listingType: 'sale' | 'rent' | 'temporary';
  isAvailable?: boolean;
  isFeatured?: boolean;
  onClick?: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  price,
  currency,
  images,
  location,
  neighborhood,
  bedrooms,
  bathrooms,
  area,
  propertyType,
  listingType,
  isAvailable = true,
  isFeatured = false,
  onClick,
}) => {
  return (
    // ...
  );
};
```

### Comentarios en Código - ESPAÑOL
```typescript
// ✅ Comentarios en ESPAÑOL dentro del código
// Filtrar propiedades disponibles por barrio
const filteredProperties = properties.filter(
  (property) => property.neighborhood === selectedNeighborhood
);

// Ordenar por precio de mayor a menor
const sortedByPrice = filteredProperties.sort(
  (a, b) => b.price - a.price
);
```

### ❌ PROHIBIDO: if dentro de forEach
```typescript
// ❌ NUNCA hacer esto
properties.forEach((property) => {
  if (property.isAvailable) {
    // ...
  }
});

// ✅ CORRECTO: usar filter + map o filter + forEach
// Razón: filter + map es más declarativo, legible y sigue principios funcionales
// Además, permite encadenar operaciones de manera limpia
properties
  .filter((property) => property.isAvailable)
  .map((property) => ({
    ...property,
    formattedPrice: formatPrice(property.price),
  }));

// ✅ También válido si solo necesitás ejecutar side effects
properties
  .filter((property) => property.isFeatured)
  .forEach((property) => {
    console.log(`Featured: ${property.title}`);
  });
```

### Comillas - Mantener Estilo Existente
```typescript
// Si el archivo usa comillas simples → mantener simples
import { Button } from '@/components/ui/button';

const styles = {
  container: 'flex items-center',
  title: 'text-2xl font-bold',
};

// Si el archivo usa comillas dobles → mantener dobles
import { Button } from "@/components/ui/button";

// NO mezclar ni cambiar el estilo existente
```

### Mobile Heights - NO usar vh
```css
/* ❌ PROHIBIDO en móviles - vh no considera barras del navegador */
.hero {
  height: 100vh;
}

/* ✅ CORRECTO: usar dvh (dynamic viewport height) */
.hero {
  height: 100dvh;
}

/* ✅ También válido con Tailwind */
.hero {
  @apply h-[100dvh];
}
```

### Marcado de Cambios en Código Existente
```typescript
// Cuando modifiques código existente, SIEMPRE comentar el cambio:
<Card
  sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
    cursor: 'pointer', // MODIFICADO: Añadir cursor pointer para indicar clickeable
  }}
/>
```

---

## 🎬 Configuración GSAP

### Archivo de configuración centralizado
```typescript
// lib/gsap/gsapConfig.ts
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins una sola vez para evitar memory leaks
if (typeof window !== 'undefined' && !gsap.core.globals()['ScrollTrigger']) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

### Hook personalizado para animaciones
```typescript
// hooks/useGSAPAnimations.ts
'use client';

import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsapConfig';

interface UseGSAPAnimationsOptions {
  animations: (() => (() => void) | void)[];
  delay?: number;
  dependencies?: unknown[];
}

export const useGSAPAnimations = ({
  animations,
  delay = 100,
  dependencies = [],
}: UseGSAPAnimationsOptions) => {
  useGSAP(() => {
    const cleanupFns: Array<() => void> = [];

    // Delay para asegurar que el DOM está listo
    const timer = setTimeout(() => {
      animations.forEach((fn) => {
        const cleanup = fn();
        if (typeof cleanup === 'function') cleanupFns.push(cleanup);
      });
      // Refrescar ScrollTrigger después de configurar animaciones
      ScrollTrigger.refresh();
    }, delay);

    // Cleanup al desmontar
    return () => {
      clearTimeout(timer);
      cleanupFns.forEach((fn) => fn());
    };
  }, dependencies);
};
```

### Componente ScrollReveal reutilizable
```typescript
// components/animations/ScrollReveal.tsx
'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsapConfig';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Configuración de posición inicial según dirección
  const getInitialPosition = () => {
    const positions = {
      up: { y: 50, x: 0 },
      down: { y: -50, x: 0 },
      left: { x: 50, y: 0 },
      right: { x: -50, y: 0 },
    };
    return positions[direction];
  };

  useGSAP(() => {
    if (!ref.current) return;

    const initial = getInitialPosition();

    gsap.fromTo(
      ref.current,
      { opacity: 0, ...initial },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [direction, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
```

### Componente StaggerChildren para listas
```typescript
// components/animations/StaggerChildren.tsx
'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsapConfig';

interface StaggerChildrenProps {
  children: ReactNode;
  stagger?: number;
  duration?: number;
  className?: string;
  childSelector?: string;
}

export const StaggerChildren: React.FC<StaggerChildrenProps> = ({
  children,
  stagger = 0.1,
  duration = 0.6,
  className,
  childSelector = ':scope > *', // Hijos directos por defecto
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(childSelector);

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [stagger, duration, childSelector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
```

---

## 🔥 Configuración Firebase

### Inicialización
```typescript
// lib/firebase/config.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar solo si no existe ya una app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
```

### Estructura de Firestore
```
firestore/
├── properties/                    # Colección de propiedades
│   └── {propertyId}/
│       ├── title: string
│       ├── slug: string
│       ├── description: string
│       ├── price: number
│       ├── currency: 'USD' | 'ARS'
│       ├── propertyType: 'apartment' | 'house' | 'ph' | 'office'
│       ├── listingType: 'sale' | 'rent' | 'temporary'
│       ├── address: string
│       ├── neighborhood: string
│       ├── city: string
│       ├── bedrooms: number
│       ├── bathrooms: number
│       ├── area: number
│       ├── amenities: string[]
│       ├── images: string[]       # URLs de Firebase Storage
│       ├── airbnbUrl?: string     # Link directo a Airbnb
│       ├── icalUrl?: string       # URL del calendario iCal
│       ├── isFeatured: boolean
│       ├── isActive: boolean
│       ├── createdAt: Timestamp
│       └── updatedAt: Timestamp
│
├── contacts/                      # Consultas de contacto
│   └── {contactId}/
│       ├── name: string
│       ├── email: string
│       ├── phone?: string
│       ├── message: string
│       ├── propertyId?: string
│       ├── status: 'pending' | 'contacted' | 'closed'
│       └── createdAt: Timestamp
│
└── config/                        # Configuración general
    └── site/
        ├── companyName: string
        ├── phone: string
        ├── email: string
        ├── address: string
        └── socialLinks: { ... }
```

### Helpers de Firestore
```typescript
// lib/firebase/firestore.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';
import { db } from './config';
import type { Property, PropertyFormData } from '@/types/property';

const PROPERTIES_COLLECTION = 'properties';

// Obtener todas las propiedades activas
export async function getActiveProperties(): Promise<Property[]> {
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  
  // Mapear documentos a tipo Property
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Property[];
}

// Obtener propiedades destacadas
export async function getFeaturedProperties(maxCount = 6): Promise<Property[]> {
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    where('isActive', '==', true),
    where('isFeatured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(maxCount)
  );

  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Property[];
}

// Obtener propiedad por slug
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    where('slug', '==', slug),
    where('isActive', '==', true),
    limit(1)
  );

  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  } as Property;
}

// Crear nueva propiedad
export async function createProperty(data: PropertyFormData): Promise<string> {
  const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

// Actualizar propiedad
export async function updateProperty(
  id: string,
  data: Partial<PropertyFormData>
): Promise<void> {
  const docRef = doc(db, PROPERTIES_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

// Eliminar propiedad (soft delete)
export async function deleteProperty(id: string): Promise<void> {
  const docRef = doc(db, PROPERTIES_COLLECTION, id);
  await updateDoc(docRef, {
    isActive: false,
    updatedAt: Timestamp.now(),
  });
}
```

---

## 📅 Integración Airbnb Calendar

### Parser de iCal
```typescript
// lib/airbnb/icalParser.ts
import ICAL from 'ical.js';

interface BlockedDate {
  start: Date;
  end: Date;
  summary?: string;
}

interface AvailabilityResult {
  propertyId: string;
  blockedDates: BlockedDate[];
  lastSync: Date;
}

export async function fetchAirbnbAvailability(
  icalUrl: string,
  propertyId: string
): Promise<AvailabilityResult> {
  try {
    const response = await fetch(icalUrl, {
      next: { revalidate: 3600 }, // Cache por 1 hora (Airbnb actualiza cada 3h)
    });

    if (!response.ok) {
      throw new Error(`Error fetching iCal: ${response.status}`);
    }

    const icalData = await response.text();
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const events = comp.getAllSubcomponents('vevent');

    // Parsear eventos bloqueados
    const blockedDates: BlockedDate[] = events.map((event) => {
      const vevent = new ICAL.Event(event);
      return {
        start: vevent.startDate.toJSDate(),
        end: vevent.endDate.toJSDate(),
        summary: vevent.summary,
      };
    });

    return {
      propertyId,
      blockedDates,
      lastSync: new Date(),
    };
  } catch (error) {
    console.error('Error parsing iCal:', error);
    throw error;
  }
}

// Verificar si una fecha específica está disponible
export function isDateAvailable(
  date: Date,
  blockedDates: BlockedDate[]
): boolean {
  return !blockedDates.some(
    (blocked) => date >= blocked.start && date < blocked.end
  );
}

// Obtener rango de fechas disponibles para los próximos N días
export function getAvailabilityForRange(
  blockedDates: BlockedDate[],
  days: number = 90
): { date: Date; available: boolean }[] {
  const result: { date: Date; available: boolean }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    result.push({
      date,
      available: isDateAvailable(date, blockedDates),
    });
  }

  return result;
}
```

### API Route para disponibilidad
```typescript
// app/api/availability/[propertyId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { fetchAirbnbAvailability } from '@/lib/airbnb/icalParser';

export async function GET(
  request: NextRequest,
  { params }: { params: { propertyId: string } }
) {
  const { propertyId } = params;

  try {
    // Obtener la propiedad de Firestore para conseguir la URL iCal
    const propertyRef = doc(db, 'properties', propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (!propertySnap.exists()) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    const property = propertySnap.data();
    const icalUrl = property.icalUrl;

    if (!icalUrl) {
      return NextResponse.json(
        { error: 'No calendar configured for this property' },
        { status: 400 }
      );
    }

    // Obtener disponibilidad de Airbnb
    const availability = await fetchAirbnbAvailability(icalUrl, propertyId);
    
    return NextResponse.json(availability);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
```

### Hook para disponibilidad
```typescript
// hooks/useAvailability.ts
'use client';

import { useState, useEffect } from 'react';

interface BlockedDate {
  start: Date;
  end: Date;
  summary?: string;
}

interface UseAvailabilityResult {
  blockedDates: BlockedDate[];
  isLoading: boolean;
  error: string | null;
  lastSync: Date | null;
  refetch: () => void;
}

export function useAvailability(propertyId: string | null): UseAvailabilityResult {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const fetchAvailability = async () => {
    if (!propertyId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/availability/${propertyId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }

      const data = await response.json();
      
      // Convertir strings a Date objects
      const dates = data.blockedDates.map((d: any) => ({
        start: new Date(d.start),
        end: new Date(d.end),
        summary: d.summary,
      }));

      setBlockedDates(dates);
      setLastSync(new Date(data.lastSync));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [propertyId]);

  return {
    blockedDates,
    isLoading,
    error,
    lastSync,
    refetch: fetchAvailability,
  };
}
```

---

## 📝 Tipos TypeScript

```typescript
// types/property.ts
export type PropertyType = 'apartment' | 'house' | 'ph' | 'office' | 'land';
export type ListingType = 'sale' | 'rent' | 'temporary';
export type Currency = 'USD' | 'ARS';

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
```

```typescript
// types/availability.ts
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
```

```typescript
// types/contact.ts
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
```

---

## 🚀 Dependencias a Instalar

```bash
# Crear proyecto Next.js 15
npx create-next-app@latest nombre-proyecto --typescript --tailwind --eslint --app --src-dir

# UI Components - shadcn
npx shadcn@latest init

# Instalar componentes shadcn necesarios
npx shadcn@latest add button card input textarea select badge
npx shadcn@latest add calendar
npx shadcn@latest add dialog sheet dropdown-menu
npx shadcn@latest add carousel skeleton
npx shadcn@latest add form label
npx shadcn@latest add navigation-menu

# Animations - GSAP
npm install gsap @gsap/react

# Icons - Fluent UI (Microsoft)
npm install @fluentui/react-icons

# Firebase
npm install firebase

# Calendar/iCal parsing
npm install ical.js
npm install -D @types/ical.js

# Forms
npm install react-hook-form zod @hookform/resolvers

# Date handling
npm install date-fns

# Utilities
npm install clsx tailwind-merge class-variance-authority
```

---

## 🔧 Variables de Entorno

```env
# .env.local

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 📱 Páginas Principales

1. **Home (`/`)**: Hero con video/imagen, buscador, propiedades destacadas, guía de zonas, CTA contacto
2. **Propiedades (`/propiedades`)**: Grid filtrable por tipo, barrio, precio. Paginación o infinite scroll
3. **Detalle (`/propiedades/[slug]`)**: Galería de fotos, info completa, calendario disponibilidad, mapa, botón "Ver en Airbnb"
4. **Nosotros (`/nosotros`)**: Historia de la inmobiliaria, equipo, valores
5. **Contacto (`/contacto`)**: Formulario, mapa de ubicación, datos de contacto
6. **Admin (`/admin/*`)**: CRUD propiedades, gestión de URLs iCal, consultas recibidas (protegido con Firebase Auth)

---

## ✅ Checklist Pre-Desarrollo

- [ ] Crear proyecto Next.js 15 con App Router
- [ ] Configurar TypeScript en modo estricto
- [ ] Instalar y configurar Tailwind CSS
- [ ] Inicializar shadcn/ui con tema personalizado
- [ ] Configurar GSAP con `gsapConfig.ts` centralizado
- [ ] Crear estructura de carpetas según especificación
- [ ] Configurar ESLint + Prettier
- [ ] Crear proyecto en Firebase Console
- [ ] Configurar Firestore con reglas de seguridad
- [ ] Configurar Firebase Storage para imágenes
- [ ] Configurar Firebase Auth para admin
- [ ] Crear tipos base (Property, Availability, Contact)
- [ ] Configurar variables de entorno
- [ ] Obtener URLs iCal de propiedades Airbnb del cliente

---

## 📝 Notas Importantes

1. **Server vs Client Components**: GSAP solo funciona en Client Components (`'use client'`)
2. **Airbnb iCal**: El cliente debe proporcionar las URLs de exportación de cada propiedad desde su panel de Airbnb
3. **Reservas**: NO se pueden hacer reservas desde el sitio, solo mostrar disponibilidad y redirigir a Airbnb
4. **Cache**: Las disponibilidades se cachean 1 hora (Airbnb actualiza su iCal cada 3 horas)
5. **SEO**: Aprovechar SSR/SSG de Next.js para las páginas de propiedades (metadata dinámico)
6. **Imágenes**: Usar `next/image` con Firebase Storage para optimización automática
7. **Seguridad Firestore**: Configurar reglas para que solo admins autenticados puedan escribir

---

## 🎯 Próximos Pasos Sugeridos

1. Crear el proyecto base con Next.js
2. Configurar Firebase y crear las colecciones
3. Implementar layout principal (Header, Footer)
4. Crear componente PropertyCard con animaciones GSAP
5. Implementar página Home con hero y propiedades destacadas
6. Crear el listado de propiedades con filtros
7. Implementar detalle de propiedad con calendario de disponibilidad
8. Crear panel admin básico
9. Testing y optimización de performance
10. Deploy en Vercel

---

**Última actualización:** Diciembre 2024
