// src/app/api/auth/[...all]/route.ts
// Handler para las rutas de autenticación de Better Auth
import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

export const { GET, POST } = toNextJsHandler(auth.handler);
