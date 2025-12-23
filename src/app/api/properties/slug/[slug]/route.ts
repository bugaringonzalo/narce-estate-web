// src/app/api/properties/slug/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPropertyBySlug } from '@/lib/firebase/firestore';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

// GET - Obtener propiedad por slug
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { slug } = await params;
    
    const property = await getPropertyBySlug(slug);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ property });

  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}
