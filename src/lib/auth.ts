// src/lib/auth.ts
// Configuración del servidor de Better Auth
import { betterAuth } from 'better-auth';
import { createClient } from '@libsql/client';

// Cliente libsql para SQLite local
const client = createClient({
  url: 'file:./auth.db',
});

export const auth = betterAuth({
  // Base de datos usando libsql
  database: {
    provider: 'sqlite',
    url: 'file:./auth.db',
  },

  // Configuración de email y password
  emailAndPassword: {
    enabled: true,
    // Requisitos de contraseña
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  // Configuración de sesión
  session: {
    // Duración de la sesión en segundos (7 días)
    expiresIn: 60 * 60 * 24 * 7,
    // Actualizar sesión si expira en menos de 1 día
    updateAge: 60 * 60 * 24,
    // Nombre de la cookie
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutos de cache
    },
  },

  // URL base de la aplicación
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',

  // Trusted origins para CORS
  trustedOrigins: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_APP_URL || '',
  ].filter(Boolean),
});

// Tipo para la sesión
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
