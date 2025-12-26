import Link from 'next/link';
import { Home, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Number */}
          <div className="relative">
            <span className="text-[150px] sm:text-[200px] font-bold text-muted/20 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight">
            Página no encontrada
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Lo sentimos, no pudimos encontrar la página que buscás.
            Puede que haya sido movida o ya no exista.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="w-5 h-5" />
                Volver al inicio
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/propiedades">
                <Search className="w-5 h-5" />
                Ver propiedades
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="gap-2">
              <Link href="/contacto">
                <Mail className="w-5 h-5" />
                Contactanos
              </Link>
            </Button>
          </div>

          {/* Helpful links */}
          <div className="mt-16 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Tal vez te interese:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/propiedades?type=sale"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Propiedades en venta
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link
                href="/propiedades?type=rent"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Alquileres
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link
                href="/propiedades?type=temporary"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Alquiler temporal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
