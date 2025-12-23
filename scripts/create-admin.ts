// scripts/create-admin.ts
// Script para crear el usuario administrador inicial
import { auth } from '../src/lib/auth';

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@narce.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123456';
  const name = process.env.ADMIN_NAME || 'Administrador';

  console.log('Creando usuario administrador...');
  console.log(`Email: ${email}`);

  try {
    // Intentar crear el usuario usando la API de Better Auth
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    console.log('Usuario administrador creado exitosamente!');
    console.log('Datos:', result);
  } catch (error) {
    // Si el usuario ya existe, mostrar mensaje
    if (error instanceof Error && error.message.includes('already exists')) {
      console.log('El usuario administrador ya existe.');
    } else {
      console.error('Error creando usuario:', error);
    }
  }
}

createAdmin()
  .then(() => {
    console.log('Script finalizado.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
