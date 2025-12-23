// src/middleware.ts
// Middleware para proteger rutas del admin
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas del admin (login)
  const publicAdminPaths = ['/admin/login'];

  // Verificar si es una ruta pública del admin
  const isPublicAdminPath = publicAdminPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Si es la ruta de login, permitir acceso
  if (isPublicAdminPath) {
    return NextResponse.next();
  }

  // Para rutas /admin protegidas, verificar sesión
  if (pathname.startsWith('/admin')) {
    // Obtener la cookie de sesión de Better Auth
    const sessionCookie = request.cookies.get('better-auth.session_token');

    // Si no hay sesión, redirigir al login
    if (!sessionCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Si hay cookie, validar la sesión con el servidor
    try {
      const sessionResponse = await fetch(
        new URL('/api/auth/get-session', request.url),
        {
          headers: {
            cookie: request.headers.get('cookie') || '',
          },
        }
      );

      if (!sessionResponse.ok) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }

      const session = await sessionResponse.json();

      if (!session || !session.user) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      // Si hay error validando, redirigir al login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Proteger todas las rutas /admin excepto assets
    '/admin/:path*',
  ],
};
