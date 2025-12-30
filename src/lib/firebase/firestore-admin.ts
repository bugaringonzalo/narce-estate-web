// src/lib/firebase/firestore-admin.ts
// Operaciones de Firestore usando Admin SDK (para API Routes del servidor)
// Este archivo se usa para operaciones que requieren permisos de escritura
import { adminDb } from './admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { Property, PropertyFormData } from '@/types/property';

const PROPERTIES_COLLECTION = 'properties';
const CONTACTS_COLLECTION = 'contacts';

// ============================================
// PROPIEDADES - OPERACIONES DE LECTURA (ADMIN)
// ============================================

// Obtener todas las propiedades (incluyendo inactivas, para admin)
export async function getAllPropertiesAdmin(): Promise<Property[]> {
  const snapshot = await adminDb
    .collection(PROPERTIES_COLLECTION)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  })) as Property[];
}

// Obtener propiedad por ID (admin - incluye inactivas)
export async function getPropertyByIdAdmin(id: string): Promise<Property | null> {
  const docRef = adminDb.collection(PROPERTIES_COLLECTION).doc(id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) return null;

  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    createdAt: data?.createdAt?.toDate() || new Date(),
    updatedAt: data?.updatedAt?.toDate() || new Date(),
  } as Property;
}

// ============================================
// PROPIEDADES - OPERACIONES DE ESCRITURA (ADMIN)
// ============================================

// Crear nueva propiedad
export async function createPropertyAdmin(data: PropertyFormData): Promise<string> {
  const docRef = await adminDb.collection(PROPERTIES_COLLECTION).add({
    ...data,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return docRef.id;
}

// Actualizar propiedad
export async function updatePropertyAdmin(
  id: string,
  data: Partial<PropertyFormData>
): Promise<void> {
  const docRef = adminDb.collection(PROPERTIES_COLLECTION).doc(id);
  await docRef.update({
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

// Eliminar propiedad (soft delete)
export async function deletePropertyAdmin(id: string): Promise<void> {
  const docRef = adminDb.collection(PROPERTIES_COLLECTION).doc(id);
  await docRef.update({
    isActive: false,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

// Eliminar propiedad permanentemente (hard delete)
export async function hardDeletePropertyAdmin(id: string): Promise<void> {
  const docRef = adminDb.collection(PROPERTIES_COLLECTION).doc(id);
  await docRef.delete();
}

// ============================================
// CONTACTOS - OPERACIONES DE ADMIN
// ============================================

// Obtener todos los contactos (admin)
export async function getAllContactsAdmin() {
  const snapshot = await adminDb
    .collection(CONTACTS_COLLECTION)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  }));
}

// Actualizar status de contacto
export async function updateContactStatusAdmin(
  id: string,
  status: 'pending' | 'contacted' | 'closed'
): Promise<void> {
  const docRef = adminDb.collection(CONTACTS_COLLECTION).doc(id);
  await docRef.update({ status });
}

// Eliminar contacto permanentemente
export async function deleteContactAdmin(id: string): Promise<void> {
  const docRef = adminDb.collection(CONTACTS_COLLECTION).doc(id);
  await docRef.delete();
}
