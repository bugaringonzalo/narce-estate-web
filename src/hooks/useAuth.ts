// src/hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    // Cleanup al desmontar
    return () => unsubscribe();
  }, []);

  // Iniciar sesión
  const signIn = async (email: string, password: string): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      // Mapear errores de Firebase a mensajes en español
      const errorCode = (err as { code?: string }).code;
      
      const errorMessages: Record<string, string> = {
        'auth/invalid-email': 'El email no es válido',
        'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
        'auth/user-not-found': 'No existe una cuenta con este email',
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/too-many-requests': 'Demasiados intentos. Intentá más tarde',
        'auth/invalid-credential': 'Credenciales inválidas',
      };

      setError(errorMessages[errorCode || ''] || 'Error al iniciar sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Cerrar sesión
  const signOut = async (): Promise<void> => {
    setError(null);
    
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      setError('Error al cerrar sesión');
      throw err;
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
    error,
  };
}
