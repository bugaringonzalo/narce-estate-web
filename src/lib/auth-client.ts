// src/lib/auth-client.ts
// Cliente de autenticación para el frontend
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  // URL base del servidor (opcional si es el mismo dominio)
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
});

// Exportar hooks y métodos útiles
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;
