// src/app/(admin)/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Building, Settings, User, LogOut, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { onAuthChange, signOut, AuthUser } from '@/lib/firebase/auth';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Links de navegación del admin
const adminNavLinks = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/admin/propiedades',
    label: 'Propiedades',
    icon: Building,
  },
  {
    href: '/admin/contactos',
    label: 'Contactos',
    icon: Mail,
  },
  {
    href: '/admin/configuracion',
    label: 'Configuración',
    icon: Settings,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Si es la página de login, renderizar sin sidebar
  const isLoginPage = pathname === '/admin/login';

  // Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setLoading(false);

      // Si no hay usuario y no estamos en login, redirigir
      if (!authUser && !isLoginPage) {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router, isLoginPage]);

  // Cerrar sidebar cuando cambia la ruta (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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

  // Mientras carga o no hay usuario, mostrar loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  // Si no hay usuario, no mostrar nada (se redirigirá en el useEffect)
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Redirigiendo...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 md:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          <span className="font-bold">Narce Admin</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Overlay para cerrar sidebar en mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 border-r bg-background transition-transform duration-300 md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Building className="text-primary" />
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
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
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
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">
                {user.displayName || 'Admin'}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email || ''}
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
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
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-h-screen pt-16 md:pl-64 md:pt-0">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
