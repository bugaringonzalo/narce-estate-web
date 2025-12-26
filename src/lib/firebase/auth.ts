// src/lib/firebase/auth.ts
// Helpers de autenticación con Firebase Auth
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './config';

// Tipos
export type AuthUser = User;

// Iniciar sesión con email y contraseña
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    const firebaseError = error as { code?: string; message?: string };
    let message = 'Error al iniciar sesión';

    // Mensajes de error en español
    switch (firebaseError.code) {
      case 'auth/user-not-found':
        message = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        message = 'Contraseña incorrecta';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido';
        break;
      case 'auth/user-disabled':
        message = 'Usuario deshabilitado';
        break;
      case 'auth/too-many-requests':
        message = 'Demasiados intentos. Intentá más tarde';
        break;
      case 'auth/invalid-credential':
        message = 'Credenciales inválidas';
        break;
    }

    return { user: null, error: message };
  }
}

// Cerrar sesión
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch {
    return { error: 'Error al cerrar sesión' };
  }
}

// Obtener usuario actual
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Escuchar cambios de autenticación
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Obtener token de ID para verificación en servidor
export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}

// Exportar la instancia de auth
export { auth };
