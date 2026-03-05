'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Home, Key, Calendar, Users, Mail, ChevronRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

// Servicios principales
const serviceNavigation = [
  { href: '/inversiones', label: 'Inversiones', icon: TrendingUp },
  { href: '/compra-venta', label: 'Compra / Venta', icon: Home },
  { href: '/alquileres', label: 'Alquileres', icon: Key },
  { href: '/alquileres-temporales', label: 'Temporales', icon: Calendar },
];

// Páginas institucionales
const secondaryMobileNav = [
  { href: '/nosotros', label: 'Nosotros', icon: Users },
  { href: '/contacto', label: 'Contacto', icon: Mail },
];

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const isActivePath = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const renderNavLink = (link: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }) => {
    const Icon = link.icon;
    const isActive = isActivePath(link.href);

    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={onClose}
        className={cn(
          'flex items-center gap-4 px-4 py-4 rounded-xl transition-all',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground hover:bg-muted'
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="flex-1 text-base font-medium">{link.label}</span>
        <ChevronRight className={cn(
          'h-4 w-4 transition-transform',
          isActive ? 'opacity-100' : 'opacity-40'
        )} />
      </Link>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-4">
          {/* Servicios */}
          <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Servicios
          </p>
          {serviceNavigation.map(renderNavLink)}

          {/* Separador */}
          <div className="my-3 border-t" />

          {/* Empresa */}
          <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Empresa
          </p>
          {secondaryMobileNav.map(renderNavLink)}
        </nav>

        {/* Footer del menú */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Arce Monsegur
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
