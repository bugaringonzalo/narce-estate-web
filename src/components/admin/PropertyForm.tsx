'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save24Regular, ArrowLeft24Regular } from '@fluentui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Property } from '@/types/property';
import {
  PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
} from '@/types/property';

// Schema de validación con Zod
const propertySchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  slug: z.string().min(3, 'El slug debe tener al menos 3 caracteres'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  price: z.number().min(1, 'El precio debe ser mayor a 0'),
  currency: z.enum(['USD', 'ARS']),
  propertyType: z.enum(['apartment', 'house', 'ph', 'office', 'land', 'local']),
  listingType: z.enum(['sale', 'rent', 'temporary']),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  neighborhood: z.string().min(2, 'El barrio debe tener al menos 2 caracteres'),
  city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres'),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  area: z.number().min(1, 'El área debe ser mayor a 0'),
  amenities: z.array(z.string()),
  images: z.array(z.string()),
  airbnbUrl: z.string().optional(),
  icalUrl: z.string().optional(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  property?: Property;
  mode: 'create' | 'edit';
}

export function PropertyForm({ property, mode }: PropertyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesInput, setImagesInput] = useState(
    property?.images?.join('\n') || ''
  );
  const [amenitiesInput, setAmenitiesInput] = useState(
    property?.amenities?.join(', ') || ''
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title || '',
      slug: property?.slug || '',
      description: property?.description || '',
      price: property?.price || 0,
      currency: property?.currency || 'USD',
      propertyType: property?.propertyType || 'apartment',
      listingType: property?.listingType || 'sale',
      address: property?.address || '',
      neighborhood: property?.neighborhood || '',
      city: property?.city || 'Buenos Aires',
      bedrooms: property?.bedrooms || 1,
      bathrooms: property?.bathrooms || 1,
      area: property?.area || 0,
      amenities: property?.amenities || [],
      images: property?.images || [],
      airbnbUrl: property?.airbnbUrl || '',
      icalUrl: property?.icalUrl || '',
      isFeatured: property?.isFeatured || false,
      isActive: property?.isActive ?? true,
    },
  });

  // Generar slug automáticamente del título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue('title', title);
    if (mode === 'create') {
      setValue('slug', generateSlug(title));
    }
  };

  // Procesar imágenes (una URL por línea)
  const handleImagesChange = (value: string) => {
    setImagesInput(value);
    const images = value
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    setValue('images', images);
  };

  // Procesar amenities (separadas por coma)
  const handleAmenitiesChange = (value: string) => {
    setAmenitiesInput(value);
    const amenities = value
      .split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0);
    setValue('amenities', amenities);
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);

    try {
      const url = mode === 'create'
        ? '/api/properties'
        : `/api/properties/${property?.id}`;

      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/admin/propiedades');
        router.refresh();
      } else {
        const error = await response.json();
        console.error('Error:', error);
        alert('Error al guardar la propiedad');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la propiedad');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft24Regular className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {mode === 'create' ? 'Nueva Propiedad' : 'Editar Propiedad'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'create'
                ? 'Completá los datos para crear una nueva propiedad'
                : `Editando: ${property?.title}`}
            </p>
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          <Save24Regular className="h-4 w-4" />
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Columna principal */}
        <div className="space-y-6 lg:col-span-2">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>
                Datos principales de la propiedad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    onChange={handleTitleChange}
                    placeholder="Ej: Moderno Loft en Palermo"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    {...register('slug')}
                    placeholder="moderno-loft-palermo"
                  />
                  {errors.slug && (
                    <p className="text-sm text-destructive">{errors.slug.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  rows={4}
                  placeholder="Descripción detallada de la propiedad..."
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ubicación */}
          <Card>
            <CardHeader>
              <CardTitle>Ubicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Dirección *</Label>
                <Input
                  id="address"
                  {...register('address')}
                  placeholder="Ej: Honduras 4500"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Barrio *</Label>
                  <Input
                    id="neighborhood"
                    {...register('neighborhood')}
                    placeholder="Ej: Palermo Soho"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad *</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="Ej: Buenos Aires"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Características */}
          <Card>
            <CardHeader>
              <CardTitle>Características</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Ambientes</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min={0}
                    {...register('bedrooms', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Baños</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min={0}
                    {...register('bathrooms', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Superficie (m²) *</Label>
                  <Input
                    id="area"
                    type="number"
                    min={1}
                    {...register('area', { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (separados por coma)</Label>
                <Textarea
                  id="amenities"
                  value={amenitiesInput}
                  onChange={(e) => handleAmenitiesChange(e.target.value)}
                  rows={2}
                  placeholder="WiFi, Aire acondicionado, Cocina equipada, TV"
                />
              </div>
            </CardContent>
          </Card>

          {/* Imágenes */}
          <Card>
            <CardHeader>
              <CardTitle>Imágenes</CardTitle>
              <CardDescription>
                Una URL por línea (pueden ser de Unsplash, Firebase Storage, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={imagesInput}
                onChange={(e) => handleImagesChange(e.target.value)}
                rows={4}
                placeholder="https://images.unsplash.com/photo-xxx&#10;https://images.unsplash.com/photo-yyy"
              />
            </CardContent>
          </Card>

          {/* Airbnb */}
          <Card>
            <CardHeader>
              <CardTitle>Integración Airbnb</CardTitle>
              <CardDescription>
                Opcional: para propiedades de alquiler temporal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="airbnbUrl">URL de Airbnb</Label>
                <Input
                  id="airbnbUrl"
                  {...register('airbnbUrl')}
                  placeholder="https://www.airbnb.com/rooms/12345678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icalUrl">URL del Calendario iCal</Label>
                <Input
                  id="icalUrl"
                  {...register('icalUrl')}
                  placeholder="https://www.airbnb.com/calendar/ical/12345678.ics?s=..."
                />
                <p className="text-xs text-muted-foreground">
                  Encontralo en Airbnb → Tu propiedad → Calendario → Sincronización
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Precio y tipo */}
          <Card>
            <CardHeader>
              <CardTitle>Precio y Operación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="listingType">Tipo de Operación *</Label>
                <Select
                  defaultValue={watch('listingType')}
                  onValueChange={(value) => setValue('listingType', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(LISTING_TYPE_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyType">Tipo de Propiedad *</Label>
                <Select
                  defaultValue={watch('propertyType')}
                  onValueChange={(value) => setValue('propertyType', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio *</Label>
                  <Input
                    id="price"
                    type="number"
                    min={1}
                    {...register('price', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select
                    defaultValue={watch('currency')}
                    onValueChange={(value) => setValue('currency', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="ARS">ARS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado */}
          <Card>
            <CardHeader>
              <CardTitle>Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isFeatured">Destacada</Label>
                  <p className="text-xs text-muted-foreground">
                    Mostrar en la home
                  </p>
                </div>
                <Switch
                  id="isFeatured"
                  checked={watch('isFeatured')}
                  onCheckedChange={(checked) => setValue('isFeatured', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isActive">Activa</Label>
                  <p className="text-xs text-muted-foreground">
                    Visible en el sitio
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={watch('isActive')}
                  onCheckedChange={(checked) => setValue('isActive', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
