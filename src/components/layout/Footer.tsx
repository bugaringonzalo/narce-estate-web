'use client';

import Link from 'next/link';
import {
  Mail24Regular,
  Phone24Regular,
  Location24Regular,
} from '@fluentui/react-icons';
import { Logo } from './Logo';
import { footerNavigation } from '@/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Tu inmobiliaria de confianza para encontrar la propiedad perfecta.
            </p>
          </div>

          {/* Propiedades */}
          <div>
            <h3 className="font-semibold mb-4">Propiedades</h3>
            <ul className="space-y-3">
              {footerNavigation.propiedades.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerNavigation.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone24Regular className="flex-shrink-0" />
                <a href="tel:+5491112345678" className="hover:text-primary transition-colors">
                  +54 9 11 1234-5678
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail24Regular className="flex-shrink-0" />
                <a href="mailto:info@narceestate.com" className="hover:text-primary transition-colors">
                  info@narceestate.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Location24Regular className="flex-shrink-0 mt-0.5" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Narce Estate. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              {footerNavigation.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
