// src/components/properties/AvailabilityCalendar.tsx
'use client';

import { useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAvailability } from '@/hooks/useAvailability';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { RefreshCw, CalendarDays, Info, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AvailabilityCalendarProps {
  propertyId: string;
  className?: string;
}

export function AvailabilityCalendar({ propertyId, className }: AvailabilityCalendarProps) {
  const { blockedDates, isLoading, error, lastSync, refetch } = useAvailability(propertyId);

  // Crear array de fechas bloqueadas para el calendario
  const disabledDates = useMemo(() => {
    const dates: Date[] = [];

    blockedDates.forEach((blocked) => {
      const start = new Date(blocked.start);
      const end = new Date(blocked.end);

      // Agregar cada día del rango bloqueado
      const current = new Date(start);
      while (current < end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });

    return dates;
  }, [blockedDates]);

  // También deshabilitar fechas pasadas
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Combinar fechas bloqueadas con fechas pasadas
  const allDisabledDates = useMemo(() => {
    const pastDates: Date[] = [];
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const current = new Date(thirtyDaysAgo);
    while (current < today) {
      pastDates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return [...pastDates, ...disabledDates];
  }, [disabledDates, today]);

  // Si está cargando, mostrar skeleton
  if (isLoading) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5" />
            Disponibilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Skeleton className="h-[320px] w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  // Si hay error o no hay iCal configurado
  if (error) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5" />
            Disponibilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
            <Info className="mb-2 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium text-muted-foreground">Calendario no disponible</p>
            <p className="mt-1 text-sm text-muted-foreground/70">Contactanos para consultar disponibilidad</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5" />
            Disponibilidad
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            className="h-8 w-8 p-0"
            title="Actualizar disponibilidad"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Leyenda clara */}
        <div className="mb-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border-2 border-emerald-500 bg-emerald-500/20" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border-2 border-red-400 bg-red-400/20" />
            <span>Reservado</span>
          </div>
        </div>

        {/* Calendario full width */}
        <Calendar
          mode="single"
          disabled={allDisabledDates}
          numberOfMonths={1}
          fromDate={today}
          toDate={new Date(today.getFullYear(), today.getMonth() + 6, 0)}
          locale={es}
          className="w-full"
          classNames={{
            months: "w-full",
            month: "w-full space-y-4",
            caption: "flex justify-center pt-1 relative items-center mb-2",
            caption_label: "text-base font-semibold capitalize",
            nav: "space-x-1 flex items-center",
            nav_button: "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-muted rounded-md inline-flex items-center justify-center",
            nav_button_previous: "absolute left-0",
            nav_button_next: "absolute right-0",
            table: "w-full border-collapse",
            head_row: "flex w-full",
            head_cell: "text-muted-foreground flex-1 font-medium text-xs uppercase text-center py-2",
            row: "flex w-full",
            cell: "flex-1 text-center p-0.5",
            day: cn(
              "w-full aspect-square p-0 font-normal rounded-md transition-all inline-flex items-center justify-center text-sm",
              "hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/30",
              "aria-disabled:bg-red-100 dark:aria-disabled:bg-red-900/40",
              "aria-disabled:text-red-500 dark:aria-disabled:text-red-400",
              "aria-disabled:cursor-not-allowed aria-disabled:hover:bg-red-100"
            ),
            day_today: "bg-primary text-primary-foreground font-bold",
            day_disabled: "text-red-500 bg-red-50 dark:bg-red-950/40",
            day_outside: "text-muted-foreground/30",
          }}
        />

        {/* Última actualización */}
        {lastSync && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Sincronizado: {format(lastSync, "d 'de' MMMM, HH:mm", { locale: es })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
