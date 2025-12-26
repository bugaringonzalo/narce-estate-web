# Narce Estate

Sitio web inmobiliario construido con Next.js 16, Firebase, y Tailwind CSS.

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Base de datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **Storage**: Firebase Storage
- **Estilos**: Tailwind CSS 4
- **Componentes UI**: shadcn/ui + Radix UI
- **Iconos**: Fluent UI Icons
- **Animaciones**: GSAP
- **Email**: Resend
- **Calendario**: iCal.js (sincronización con Airbnb)

## Configuración

### 1. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# URL del sitio
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=tu_email@ejemplo.com
FROM_EMAIL=onboarding@resend.dev
```

### 2. Configuración de Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Authentication con Email/Password
3. Crear una base de datos Firestore
4. Habilitar Storage
5. Copiar las credenciales al archivo `.env.local`

### 3. Configuración de Resend (Email)

Resend se usa para enviar emails desde el formulario de contacto.

#### Pasos para configurar Resend:

1. **Crear cuenta**: Ir a [resend.com](https://resend.com) y crear una cuenta

2. **Obtener API Key**:
   - Ir a [resend.com/api-keys](https://resend.com/api-keys)
   - Crear una nueva API Key
   - Copiar la key y agregarla en `.env.local` como `RESEND_API_KEY`

3. **Configurar emails**:
   - `CONTACT_EMAIL`: Email donde recibís las consultas de contacto
   - `FROM_EMAIL`: Email remitente (usar `onboarding@resend.dev` para testing)

4. **Dominio verificado (opcional - producción)**:
   - Para producción, verificar tu dominio en [resend.com/domains](https://resend.com/domains)
   - Una vez verificado, podés usar tu dominio como remitente (ej: `contacto@tudominio.com`)

#### Ejemplo de configuración:

```env
# Para desarrollo/testing
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=tu_email@gmail.com
FROM_EMAIL=onboarding@resend.dev

# Para producción (con dominio verificado)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=contacto@tudominio.com
FROM_EMAIL=noreply@tudominio.com
```

### 4. Configuración de iCal (Airbnb)

Para sincronizar disponibilidad con Airbnb:

1. En Airbnb, ir a tu propiedad > Disponibilidad > Exportar calendario
2. Copiar la URL del calendario iCal
3. Agregar la URL en el campo `icalUrl` de la propiedad en Firestore

### 5. Configuración de WhatsApp

Para cambiar el número de WhatsApp del botón flotante, editá el archivo `src/components/layout/FloatingButtons.tsx`:

```typescript
const WHATSAPP_NUMBER = '5491112345678'; // Cambiar por el número real
```

El formato debe ser el código de país + número sin espacios ni guiones (ej: `5491112345678` para Argentina).

## Scripts disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Lint
npm run lint

# Seed de propiedades de ejemplo
npm run db:seed
```

## Estructura del proyecto

```
src/
├── app/
│   ├── (admin)/          # Panel de administración
│   │   └── admin/
│   │       ├── login/    # Login para admin
│   │       └── ...       # Otras páginas admin
│   ├── (marketing)/      # Sitio público
│   │   ├── propiedades/  # Listado y detalle de propiedades
│   │   ├── contacto/     # Formulario de contacto
│   │   └── ...
│   ├── api/
│   │   └── contact/      # API para envío de emails
│   └── ...
├── components/
│   ├── ui/               # Componentes shadcn/ui
│   └── ...
├── hooks/                # Custom hooks
├── lib/
│   └── firebase/         # Configuración Firebase
└── types/                # TypeScript types
```

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/propiedades` | Listado de propiedades |
| `/propiedades/[id]` | Detalle de propiedad |
| `/contacto` | Formulario de contacto |
| `/admin` | Panel de administración |
| `/admin/login` | Login de administrador |

## Deploy

El proyecto está optimizado para deploy en Vercel:

```bash
npm run build
```

Para otros hosts, asegurarse de configurar las variables de entorno correspondientes.

## Tareas pendientes para producción

### 1. Personalizar contenido legal

Editar los textos de las páginas legales con la información real de la empresa:

- `src/app/(marketing)/privacidad/page.tsx` - Política de privacidad
- `src/app/(marketing)/terminos/page.tsx` - Términos y condiciones

Cambiar emails de contacto, datos de empresa, etc.

### 2. Configurar dominio en producción

En las variables de entorno de Vercel (o en `.env.local` para otros hosts), actualizar:

```env
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

Esto es importante para que funcionen correctamente:
- El sitemap.xml
- Los links de compartir en redes sociales
- Los meta tags de OpenGraph

### 3. Verificar dominio en Resend (emails)

Para que los emails se envíen desde tu dominio (no desde `onboarding@resend.dev`):

1. Ir a [resend.com/domains](https://resend.com/domains)
2. Agregar tu dominio
3. Configurar los registros DNS que te indican (TXT, MX, etc.)
4. Esperar verificación (puede tardar unos minutos)
5. Actualizar en `.env.local`:
   ```env
   FROM_EMAIL=noreply@tudominio.com
   ```

Esto mejora la entregabilidad de los emails y evita que caigan en spam.
