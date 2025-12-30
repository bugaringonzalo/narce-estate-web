// src/app/api/properties/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getActiveProperties,
  getFeaturedProperties,
  getFilteredProperties,
} from '@/lib/firebase/firestore';
// Usar Admin SDK para operaciones de escritura (ignora las reglas de seguridad)
import { createPropertyAdmin } from '@/lib/firebase/firestore-admin';
import type { PropertyFilters } from '@/types/property';

// GET - Obtener propiedades (todas, destacadas, o filtradas)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Obtener propiedades destacadas
    const featured = searchParams.get('featured');
    if (featured === 'true') {
      const limit = parseInt(searchParams.get('limit') || '6');
      const properties = await getFeaturedProperties(limit);
      return NextResponse.json({ properties, count: properties.length });
    }

    // Obtener propiedades con filtros
    const hasFilters = searchParams.has('listingType') ||
                      searchParams.has('propertyType') ||
                      searchParams.has('neighborhood') ||
                      searchParams.has('minPrice') ||
                      searchParams.has('maxPrice') ||
                      searchParams.has('minBedrooms') ||
                      searchParams.has('minBathrooms') ||
                      searchParams.has('minArea');

    if (hasFilters) {
      const filters: PropertyFilters = {};
      
      const listingType = searchParams.get('listingType');
      if (listingType) filters.listingType = listingType as any;
      
      const propertyType = searchParams.get('propertyType');
      if (propertyType) filters.propertyType = propertyType as any;
      
      const neighborhood = searchParams.get('neighborhood');
      if (neighborhood) filters.neighborhood = neighborhood;
      
      const minPrice = searchParams.get('minPrice');
      if (minPrice) filters.minPrice = parseInt(minPrice);
      
      const maxPrice = searchParams.get('maxPrice');
      if (maxPrice) filters.maxPrice = parseInt(maxPrice);
      
      const minBedrooms = searchParams.get('minBedrooms');
      if (minBedrooms) filters.minBedrooms = parseInt(minBedrooms);
      
      const minBathrooms = searchParams.get('minBathrooms');
      if (minBathrooms) filters.minBathrooms = parseInt(minBathrooms);
      
      const minArea = searchParams.get('minArea');
      if (minArea) filters.minArea = parseInt(minArea);

      const properties = await getFilteredProperties(filters);
      return NextResponse.json({ properties, count: properties.length, filters });
    }

    // Por defecto: obtener todas las propiedades activas
    const properties = await getActiveProperties();
    return NextResponse.json({ properties, count: properties.length });

  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva propiedad
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validación básica (se puede mejorar con Zod)
    if (!body.title || !body.slug || !body.price) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, price' },
        { status: 400 }
      );
    }

    const propertyId = await createPropertyAdmin(body);
    
    return NextResponse.json(
      { id: propertyId, message: 'Property created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
