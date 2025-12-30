// src/app/api/properties/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
// Usar Admin SDK para operaciones del servidor (ignora las reglas de seguridad)
import {
  getPropertyByIdAdmin,
  updatePropertyAdmin,
  deletePropertyAdmin,
  hardDeletePropertyAdmin,
} from '@/lib/firebase/firestore-admin';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET - Obtener propiedad por ID
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    
    const property = await getPropertyByIdAdmin(id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ property });

  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar propiedad
export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    await updatePropertyAdmin(id, body);
    
    return NextResponse.json({
      message: 'Property updated successfully',
      id,
    });

  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar propiedad
export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const hard = searchParams.get('hard') === 'true';
    
    if (hard) {
      // Hard delete: eliminar permanentemente
      await hardDeletePropertyAdmin(id);
    } else {
      // Soft delete: marcar como inactiva
      await deletePropertyAdmin(id);
    }
    
    return NextResponse.json({
      message: hard ? 'Property permanently deleted' : 'Property deactivated',
      id,
    });

  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}
