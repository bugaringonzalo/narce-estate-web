import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  Star,
  Handshake,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Nosotros | Narce Estate',
  description: 'Conocé nuestra historia y nuestro equipo. Somos tu inmobiliaria de confianza en Buenos Aires.',
};

const valores = [
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Trabajamos con transparencia y honestidad en cada operación.',
  },
  {
    icon: Handshake,
    title: 'Compromiso',
    description: 'Nos comprometemos a encontrar la mejor opción para vos.',
  },
  {
    icon: Star,
    title: 'Excelencia',
    description: 'Buscamos la excelencia en cada detalle de nuestro servicio.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Te acompañamos en todo el proceso de manera personalizada.',
  },
];

const estadisticas = [
  { valor: '10+', label: 'Años de experiencia' },
  { valor: '500+', label: 'Propiedades vendidas' },
  { valor: '1000+', label: 'Clientes satisfechos' },
  { valor: '50+', label: 'Propiedades activas' },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Sobre Nosotros
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Somos una inmobiliaria con más de 10 años de experiencia en el mercado
              inmobiliario de Buenos Aires, comprometidos con encontrar el hogar
              perfecto para cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Nuestra Historia
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Narce Estate nació de la pasión por conectar personas con sus hogares
                ideales. Desde nuestros inicios, nos propusimos ofrecer un servicio
                diferente: cercano, transparente y enfocado en las necesidades reales
                de cada cliente.
              </p>
              <p>
                A lo largo de los años, hemos construido relaciones duraderas basadas
                en la confianza y el profesionalismo. Cada propiedad que gestionamos
                es tratada con el mismo cuidado y dedicación.
              </p>
              <p>
                Hoy, seguimos creciendo y evolucionando, incorporando tecnología y
                nuevas herramientas para brindarte la mejor experiencia en la búsqueda
                de tu próximo hogar.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-6xl font-bold text-primary">10+</span>
                <p className="mt-2 text-lg text-muted-foreground">
                  Años construyendo hogares
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {estadisticas.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary md:text-5xl">
                  {stat.valor}
                </div>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nuestros Valores
          </h2>
          <p className="mt-4 text-muted-foreground">
            Los principios que guían nuestro trabajo día a día.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((valor) => {
            const Icon = valor.icon;
            return (
              <Card key={valor.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">{valor.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {valor.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para encontrar tu hogar?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contactanos y te ayudamos a encontrar la propiedad perfecta para vos.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/propiedades">
                  Ver propiedades
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contacto">Contactanos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
