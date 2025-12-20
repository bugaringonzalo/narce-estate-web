// scripts/seed-properties.ts
// Script para agregar propiedades de ejemplo a Firestore
// Ejecutar con: npx tsx scripts/seed-properties.ts

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Configuración de Firebase (usar las mismas variables que en la app)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Propiedades de ejemplo
const sampleProperties = [
  {
    title: 'Moderno Loft en Palermo Soho',
    slug: 'moderno-loft-palermo-soho',
    description: 'Hermoso loft totalmente renovado en el corazón de Palermo Soho. Ideal para parejas o profesionales. A pasos de bares, restaurantes y transporte público.',
    price: 1200,
    currency: 'USD' as const,
    propertyType: 'apartment' as const,
    listingType: 'temporary' as const,
    address: 'Honduras 4500',
    neighborhood: 'Palermo Soho',
    city: 'Buenos Aires',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    amenities: ['WiFi', 'Aire acondicionado', 'Cocina equipada', 'TV', 'Ropa de cama'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    airbnbUrl: 'https://www.airbnb.com/rooms/ejemplo1',
    icalUrl: '',
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Departamento 2 Ambientes en Recoleta',
    slug: 'departamento-2-ambientes-recoleta',
    description: 'Elegante departamento en zona residencial de Recoleta. Luminoso, con balcón y excelente vista. Edificio con seguridad 24hs.',
    price: 180000,
    currency: 'USD' as const,
    propertyType: 'apartment' as const,
    listingType: 'sale' as const,
    address: 'Av. Alvear 1800',
    neighborhood: 'Recoleta',
    city: 'Buenos Aires',
    bedrooms: 2,
    bathrooms: 2,
    area: 65,
    amenities: ['Balcón', 'Seguridad 24hs', 'Calefacción', 'Gas natural', 'Cocina integrada'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Casa de 3 Dormitorios en Villa Urquiza',
    slug: 'casa-3-dormitorios-villa-urquiza',
    description: 'Amplia casa con patio y parrilla. Perfecta para familias. Zona tranquila con buena conectividad.',
    price: 250000,
    currency: 'USD' as const,
    propertyType: 'house' as const,
    listingType: 'sale' as const,
    address: 'Monroe 5200',
    neighborhood: 'Villa Urquiza',
    city: 'Buenos Aires',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    amenities: ['Patio', 'Parrilla', 'Garage', 'Quincho', 'Jardín'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    isFeatured: false,
    isActive: true,
  },
  {
    title: 'Estudio Amoblado en Belgrano',
    slug: 'estudio-amoblado-belgrano',
    description: 'Acogedor estudio completamente amoblado y equipado. Ideal para estadías temporales. Incluye todos los servicios.',
    price: 800,
    currency: 'USD' as const,
    propertyType: 'apartment' as const,
    listingType: 'temporary' as const,
    address: 'Cabildo 2100',
    neighborhood: 'Belgrano',
    city: 'Buenos Aires',
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
    amenities: ['WiFi', 'Aire acondicionado', 'Cocina equipada', 'Lavarropas', 'Servicio de limpieza'],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
    ],
    airbnbUrl: 'https://www.airbnb.com/rooms/ejemplo2',
    icalUrl: '',
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'PH 2 Plantas en San Telmo',
    slug: 'ph-2-plantas-san-telmo',
    description: 'Único PH de dos plantas con terraza propia. Conserva detalles originales de la época. En pleno barrio histórico.',
    price: 220000,
    currency: 'USD' as const,
    propertyType: 'ph' as const,
    listingType: 'sale' as const,
    address: 'Defensa 800',
    neighborhood: 'San Telmo',
    city: 'Buenos Aires',
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    amenities: ['Terraza', 'Patio', 'Detalles originales', 'Techos altos'],
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
    ],
    isFeatured: false,
    isActive: true,
  },
];

async function seedProperties() {
  console.log('Iniciando seed de propiedades...\n');

  try {
    for (const property of sampleProperties) {
      const docRef = await addDoc(collection(db, 'properties'), {
        ...property,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      console.log(`Creada: ${property.title} (ID: ${docRef.id})`);
    }

    console.log(`\n${sampleProperties.length} propiedades creadas exitosamente!`);
    console.log('\nResumen:');
    console.log(`   - Destacadas: ${sampleProperties.filter(p => p.isFeatured).length}`);
    console.log(`   - Venta: ${sampleProperties.filter(p => p.listingType === 'sale').length}`);
    console.log(`   - Alquiler temporal: ${sampleProperties.filter(p => p.listingType === 'temporary').length}`);

  } catch (error) {
    console.error('Error al crear propiedades:', error);
    process.exit(1);
  }
}

// Ejecutar el seed
seedProperties()
  .then(() => {
    console.log('\nProceso completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
