// src/app/api/availability/[propertyId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { fetchAirbnbAvailability } from '@/lib/airbnb/icalParser';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  // En Next.js 15, params es una Promise
  const { propertyId } = await params;

  try {
    // Obtener la propiedad de Firestore para conseguir la URL iCal
    const propertyRef = doc(db, 'properties', propertyId);
    const propertySnap = await getDoc(propertyRef);

    // Verificar que la propiedad existe
    if (!propertySnap.exists()) {
      return NextResponse.json(
        { error: 'Propiedad no encontrada' },
        { status: 404 }
      );
    }

    const property = propertySnap.data();
    const icalUrl = property.icalUrl;

    // Verificar que tiene URL de calendario configurada
    if (!icalUrl) {
      return NextResponse.json(
        { error: 'Esta propiedad no tiene calendario configurado' },
        { status: 400 }
      );
    }

    // Obtener disponibilidad de Airbnb
    const availability = await fetchAirbnbAvailability(icalUrl, propertyId);

    // Respuesta exitosa
    return NextResponse.json(availability, {
      headers: {
        // Cache en el cliente por 30 minutos
        'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching availability:', error);

    return NextResponse.json(
      { error: 'Error al obtener disponibilidad' },
      { status: 500 }
    );
  }
}
