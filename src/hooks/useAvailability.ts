// src/hooks/useAvailability.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BlockedDate } from '@/types';

interface UseAvailabilityResult {
  blockedDates: BlockedDate[];
  isLoading: boolean;
  error: string | null;
  lastSync: Date | null;
  refetch: () => Promise<void>;
}

export function useAvailability(propertyId: string | null): UseAvailabilityResult {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const fetchAvailability = useCallback(async () => {
    // Si no hay propertyId, no hacemos nada
    if (!propertyId) {
      setBlockedDates([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/availability/${propertyId}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al obtener disponibilidad');
      }

      const data = await response.json();

      // Convertir strings de fecha a objetos Date
      const dates: BlockedDate[] = data.blockedDates.map((d: { start: string; end: string; summary?: string }) => ({
        start: new Date(d.start),
        end: new Date(d.end),
        summary: d.summary,
      }));

      setBlockedDates(dates);
      setLastSync(new Date(data.lastSync));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Error fetching availability:', err);
    } finally {
      setIsLoading(false);
    }
  }, [propertyId]);

  // Fetch inicial cuando cambia el propertyId
  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  return {
    blockedDates,
    isLoading,
    error,
    lastSync,
    refetch: fetchAvailability,
  };
}

// Utilidad: verificar si una fecha específica está disponible
export function isDateAvailable(date: Date, blockedDates: BlockedDate[]): boolean {
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  return !blockedDates.some((blocked) => {
    const start = new Date(blocked.start);
    const end = new Date(blocked.end);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return checkDate >= start && checkDate < end;
  });
}

// Utilidad: generar array de días con disponibilidad para los próximos N días
export function getAvailabilityCalendar(
  blockedDates: BlockedDate[],
  days: number = 90
): { date: Date; available: boolean }[] {
  const result: { date: Date; available: boolean }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    result.push({
      date,
      available: isDateAvailable(date, blockedDates),
    });
  }

  return result;
}
