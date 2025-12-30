'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Edit24Regular,
  Delete24Regular,
  Eye24Regular,
  MoreHorizontal24Regular,
} from '@fluentui/react-icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/types/property';
import {
  PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
  CURRENCY_SYMBOLS,
} from '@/types/property';

interface PropertiesTableProps {
  properties: Property[];
}

export function PropertiesTable({ properties }: PropertiesTableProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Formatear precio
  const formatPrice = (price: number, currency: string) => {
    const symbol = CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] || currency;
    return `${symbol} ${price.toLocaleString('es-AR')}`;
  };

  // Obtener color del badge según tipo de listado
  const getListingTypeBadgeVariant = (listingType: string) => {
    switch (listingType) {
      case 'sale':
        return 'default';
      case 'rent':
        return 'secondary';
      case 'temporary':
        return 'outline';
      default:
        return 'default';
    }
  };

  // Manejar eliminación
  const handleDeleteClick = (property: Property) => {
    setPropertyToDelete(property);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!propertyToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/properties/${propertyToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refrescar la página para mostrar los cambios
        router.refresh();
      } else {
        console.error('Error al eliminar propiedad');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-4">No hay propiedades todavía</p>
        <Link href="/admin/propiedades/nueva">
          <Button>Crear primera propiedad</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Propiedad</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Operación</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Barrio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {property.images[0] && (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.bedrooms} amb · {property.area} m²
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {PROPERTY_TYPE_LABELS[property.propertyType]}
                </TableCell>
                <TableCell>
                  <Badge variant={getListingTypeBadgeVariant(property.listingType)}>
                    {LISTING_TYPE_LABELS[property.listingType]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatPrice(property.price, property.currency)}
                </TableCell>
                <TableCell>{property.neighborhood}</TableCell>
                <TableCell>
                  <Badge variant={property.isFeatured ? 'default' : 'secondary'}>
                    {property.isFeatured ? 'Destacada' : 'Normal'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal24Regular className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/propiedades/${property.slug}`}
                          target="_blank"
                          className="flex items-center gap-2"
                        >
                          <Eye24Regular className="h-4 w-4" />
                          Ver en sitio
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/propiedades/${property.id}`}
                          className="flex items-center gap-2"
                        >
                          <Edit24Regular className="h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                        onClick={() => handleDeleteClick(property)}
                      >
                        <Delete24Regular className="h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de confirmación de eliminación */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar propiedad</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que querés eliminar &ldquo;{propertyToDelete?.title}&rdquo;?
              Esta acción desactivará la propiedad del sitio.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
