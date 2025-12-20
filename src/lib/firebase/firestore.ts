// src/lib/firebase/firestore.ts
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
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './config';
import type { Property, PropertyFormData, PropertyFilters } from '@/types/property';

const PROPERTIES_COLLECTION = 'properties';
const CONTACTS_COLLECTION = 'contacts';

// ============================================
// PROPIEDADES
// ============================================

// Obtener todas las propiedades activas
export async function getActiveProperties(): Promise<Property[]> {
  const q = query(
    collection(db, PROPERTIES_COLLECTION),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);

  // Mapear documentos a tipo Property
  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
    // Convertir Timestamps a Date
    createdAt: docSnapshot.data().createdAt?.toDate() || new Date(),
    updatedAt: docSnapshot.data().updatedAt?.toDate() || new Date(),
  })) as Property[];
}

// Obtener propiedades con filtros
export async function getFilteredProperties(
  filters: PropertyFilters
): Promise<Property[]> {
  const constraints: QueryConstraint[] = [
    where('isActive', '==', true),
  ];

  // Aplicar filtros dinámicamente
  if (filters.listingType) {
    constraints.push(where('listingType', '==', filters.listingType));
  }

  if (filters.propertyType) {
    constraints.push(where('propertyType', '==', filters.propertyType));
  }

  if (filters.neighborhood) {
    constraints.push(where('neighborhood', '==', filters.neighborhood));
  }

  if (filters.minBedrooms) {
    constraints.push(where('bedrooms', '>=', filters.minBedrooms));
  }

  // Ordenar por fecha de creación
  constraints.push(orderBy('createdAt', 'desc'));

  const q = query(collection(db, PROPERTIES_COLLECTION), ...constraints);
  const snapshot = await getDocs(q);

  // Mapear y aplicar filtros adicionales que Firestore no soporta bien
  // (como rangos de precio que requieren índices compuestos)
  let properties = snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
    createdAt: docSnapshot.data().createdAt?.toDate() || new Date(),
    updatedAt: docSnapshot.data().updatedAt?.toDate() || new Date(),
  })) as Property[];

  // Filtros adicionales en cliente (precio y área)
  // Razón: Firestore requiere índices compuestos para múltiples rangos
  if (filters.minPrice !== undefined) {
    properties = properties.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    properties = properties.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.minArea !== undefined) {
    properties = properties.filter((p) => p.area >= filters.minArea!);
  }

  return properties;
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

  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
    createdAt: docSnapshot.data().createdAt?.toDate() || new Date(),
    updatedAt: docSnapshot.data().updatedAt?.toDate() || new Date(),
  })) as Property[];
}

// Obtener propiedad por ID
export async function getPropertyById(id: string): Promise<Property | null> {
  const docRef = doc(db, PROPERTIES_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate() || new Date(),
    updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
  } as Property;
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

  const docSnapshot = snapshot.docs[0];
  return {
    id: docSnapshot.id,
    ...docSnapshot.data(),
    createdAt: docSnapshot.data().createdAt?.toDate() || new Date(),
    updatedAt: docSnapshot.data().updatedAt?.toDate() || new Date(),
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
  // Soft delete: marcamos como inactiva en lugar de eliminar
  await updateDoc(docRef, {
    isActive: false,
    updatedAt: Timestamp.now(),
  });
}

// Eliminar propiedad permanentemente (hard delete)
export async function hardDeleteProperty(id: string): Promise<void> {
  const docRef = doc(db, PROPERTIES_COLLECTION, id);
  await deleteDoc(docRef);
}

// ============================================
// CONTACTOS
// ============================================

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
}

// Crear nueva consulta de contacto
export async function createContact(data: ContactFormData): Promise<string> {
  const docRef = await addDoc(collection(db, CONTACTS_COLLECTION), {
    ...data,
    status: 'pending',
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

// Obtener todas las consultas (para admin)
export async function getAllContacts() {
  const q = query(
    collection(db, CONTACTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
    createdAt: docSnapshot.data().createdAt?.toDate() || new Date(),
  }));
}

// Actualizar status de contacto
export async function updateContactStatus(
  id: string,
  status: 'pending' | 'contacted' | 'closed'
): Promise<void> {
  const docRef = doc(db, CONTACTS_COLLECTION, id);
  await updateDoc(docRef, { status });
}

// ============================================
// UTILIDADES
// ============================================

// Obtener barrios únicos (para filtros)
export async function getNeighborhoods(): Promise<string[]> {
  const properties = await getActiveProperties();
  
  // Extraer barrios únicos usando Set
  const neighborhoods = [...new Set(properties.map((p) => p.neighborhood))];
  
  // Ordenar alfabéticamente
  return neighborhoods.sort();
}
