// src/app/(admin)/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home24Regular,
  Building24Regular,
  Settings24Regular,
  Person24Regular,
  SignOut24Regular,
} from '@fluentui/react-icons';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from '@/lib/auth-client';

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Links de navegación del admin
const adminNavLinks = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: Home24Regular,
  },
  {
    href: '/admin/propiedades',
    label: 'Propiedades',
    icon: Building24Regular,
  },
  {
    href: '/admin/configuracion',
    label: 'Configuración',
    icon: Settings24Regular,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Si es la página de login, renderizar sin sidebar
  const isLoginPage = pathname === '/admin/login';

  const isActivePath = (path: string): boolean => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Si es la página de login, mostrar solo el contenido
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Mientras carga la sesión, mostrar un loading simple
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Building24Regular className="text-primary" />
            <span className="text-lg font-bold">Narce Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4">
          {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = isActivePath(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
                  (isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground')
                }
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Person24Regular className="h-4 w-4" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {session?.user?.email || ''}
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <Home24Regular className="h-4 w-4" />
                Ver sitio
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <SignOut24Regular className="h-4 w-4" />
              {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="min-h-screen p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
