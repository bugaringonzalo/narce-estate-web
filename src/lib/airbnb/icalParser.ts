// src/lib/airbnb/icalParser.ts
import ICAL from 'ical.js';

interface BlockedDate {
  start: Date;
  end: Date;
  summary?: string;
}

interface AvailabilityResult {
  propertyId: string;
  blockedDates: BlockedDate[];
  lastSync: Date;
}

/**
 * Obtiene y parsea el calendario iCal de Airbnb
 * 
 * @param icalUrl - URL del calendario iCal de Airbnb
 * @param propertyId - ID de la propiedad (para referencia)
 * @returns Objeto con las fechas bloqueadas y metadata
 * 
 * Nota: Airbnb actualiza sus calendarios iCal cada ~3 horas
 * Por eso usamos revalidate de 1 hora para no hacer requests innecesarios
 */
export async function fetchAirbnbAvailability(
  icalUrl: string,
  propertyId: string
): Promise<AvailabilityResult> {
  try {
    // Fetch del calendario iCal
    // next.revalidate cachea la respuesta por 1 hora
    const response = await fetch(icalUrl, {
      next: { revalidate: 3600 }, // 1 hora en segundos
    });

    if (!response.ok) {
      throw new Error(`Error fetching iCal: ${response.status} ${response.statusText}`);
    }

    const icalData = await response.text();

    // Parsear el formato iCal
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);

    // Obtener todos los eventos (reservas/bloqueos)
    const events = comp.getAllSubcomponents('vevent');

    // Mapear eventos a nuestro formato
    const blockedDates: BlockedDate[] = events.map((event) => {
      const vevent = new ICAL.Event(event);

      return {
        start: vevent.startDate.toJSDate(),
        end: vevent.endDate.toJSDate(),
        summary: vevent.summary || undefined,
      };
    });

    // Filtrar fechas pasadas (solo mostrar desde hoy en adelante)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureDates = blockedDates.filter((d) => d.end >= today);

    // Ordenar por fecha de inicio
    futureDates.sort((a, b) => a.start.getTime() - b.start.getTime());

    return {
      propertyId,
      blockedDates: futureDates,
      lastSync: new Date(),
    };
  } catch (error) {
    console.error('Error parsing iCal:', error);
    throw error;
  }
}

/**
 * Verifica si una fecha específica está disponible
 * 
 * @param date - Fecha a verificar
 * @param blockedDates - Array de fechas bloqueadas
 * @returns true si está disponible, false si está bloqueada
 */
export function isDateAvailable(
  date: Date,
  blockedDates: BlockedDate[]
): boolean {
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  return !blockedDates.some((blocked) => {
    const start = new Date(blocked.start);
    const end = new Date(blocked.end);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // Disponible si la fecha NO está entre start y end
    return checkDate >= start && checkDate < end;
  });
}

/**
 * Genera un array con la disponibilidad de los próximos N días
 * Útil para renderizar un calendario visual
 * 
 * @param blockedDates - Array de fechas bloqueadas
 * @param days - Cantidad de días a generar (default: 90)
 * @returns Array de objetos con fecha y disponibilidad
 */
export function getAvailabilityForRange(
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

/**
 * Obtiene el próximo rango de fechas disponibles consecutivas
 * Útil para mostrar "Próxima disponibilidad: 15-20 Enero"
 * 
 * @param blockedDates - Array de fechas bloqueadas
 * @param minNights - Mínimo de noches consecutivas (default: 2)
 * @returns Objeto con start y end del próximo rango disponible, o null
 */
export function getNextAvailableRange(
  blockedDates: BlockedDate[],
  minNights: number = 2
): { start: Date; end: Date } | null {
  const availability = getAvailabilityForRange(blockedDates, 180); // Buscar en 6 meses
  
  let rangeStart: Date | null = null;
  let consecutiveNights = 0;

  for (const day of availability) {
    if (day.available) {
      if (!rangeStart) {
        rangeStart = day.date;
      }
      consecutiveNights++;

      // Si encontramos suficientes noches consecutivas
      if (consecutiveNights >= minNights) {
        return {
          start: rangeStart,
          end: day.date,
        };
      }
    } else {
      // Reset si encontramos un día bloqueado
      rangeStart = null;
      consecutiveNights = 0;
    }
  }

  return null;
}
