'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Filter20Regular } from '@fluentui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LISTING_TYPE_LABELS, PROPERTY_TYPE_LABELS } from '@/types/property';

export function PropertiesFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtener valores actuales de los filtros
  const currentType = searchParams.get('type') || '';
  const currentPropertyType = searchParams.get('propertyType') || '';

  // Actualizar URL con los filtros
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    router.push(pathname);
  };

  const hasFilters = currentType || currentPropertyType;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter20Regular className="h-4 w-4" />
        <span>Filtrar por:</span>
      </div>

      {/* Filtro por tipo de operación */}
      <Select
        value={currentType || 'all'}
        onValueChange={(value) => updateFilter('type', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Operación" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las operaciones</SelectItem>
          {Object.entries(LISTING_TYPE_LABELS).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filtro por tipo de propiedad */}
      <Select
        value={currentPropertyType || 'all'}
        onValueChange={(value) => updateFilter('propertyType', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipo de propiedad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Botón para limpiar filtros */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
