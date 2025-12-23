'use client';

import Link from 'next/link';
import {
  Building24Regular,
  Add24Regular,
  Eye24Regular,
} from '@fluentui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardStatsProps {
  totalProperties: number;
  totalFeatured: number;
  forSale: number;
  temporary: number;
}

export function DashboardStats({
  totalProperties,
  totalFeatured,
  forSale,
  temporary,
}: DashboardStatsProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido al panel de administración de Narce Estate
          </p>
        </div>
        <Link href="/admin/propiedades/nueva">
          <Button className="gap-2">
            <Add24Regular className="h-4 w-4" />
            Nueva Propiedad
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Propiedades
            </CardTitle>
            <Building24Regular className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              propiedades activas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Destacadas
            </CardTitle>
            <Eye24Regular className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFeatured}</div>
            <p className="text-xs text-muted-foreground">
              en home
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              En Venta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{forSale}</div>
            <p className="text-xs text-muted-foreground">
              propiedades
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Alquiler Temporal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{temporary}</div>
            <p className="text-xs text-muted-foreground">
              propiedades Airbnb
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Accede a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Link href="/admin/propiedades">
            <Button variant="outline" className="gap-2">
              <Building24Regular className="h-4 w-4" />
              Ver Propiedades
            </Button>
          </Link>
          <Link href="/admin/propiedades/nueva">
            <Button variant="outline" className="gap-2">
              <Add24Regular className="h-4 w-4" />
              Agregar Propiedad
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="outline" className="gap-2">
              <Eye24Regular className="h-4 w-4" />
              Ver Sitio
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
