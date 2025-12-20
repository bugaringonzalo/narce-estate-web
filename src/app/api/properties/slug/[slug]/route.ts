// src/app/api/properties/slug/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPropertyBySlug } from '@/lib/firebase/firestore';

interface RouteParams {
  params: {
    slug: string;
  };
}

// GET - Obtener propiedad por slug
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = params;
    
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
