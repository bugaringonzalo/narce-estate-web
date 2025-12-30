// src/lib/firebase/admin.ts
// Firebase Admin SDK para operaciones del servidor
// Este SDK ignora las reglas de seguridad de Firestore
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Configuración del Admin SDK usando variables de entorno
// La private key viene con \n escapados, hay que convertirlos
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

let adminApp: App;
let adminDb: Firestore;

// Inicializar solo si no existe ya una instancia
if (getApps().length === 0) {
  adminApp = initializeApp({
    credential: cert(serviceAccount as Parameters<typeof cert>[0]),
  });
} else {
  adminApp = getApps()[0];
}

adminDb = getFirestore(adminApp);

export { adminApp, adminDb };
