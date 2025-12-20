# 🚀 Guía de Inicio - Real Estate Website

Esta guía te lleva paso a paso desde cero hasta tener el proyecto corriendo.

---

## Paso 1: Crear el Proyecto Next.js

Abrí la terminal en la carpeta donde querés crear el proyecto y ejecutá:

```bash
npx create-next-app@latest real-estate-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Cuando te pregunte opciones, respondé:

```
✔ Would you like to use TypeScript? → Yes
✔ Would you like to use ESLint? → Yes
✔ Would you like to use Tailwind CSS? → Yes
✔ Would you like your code inside a `src/` directory? → Yes
✔ Would you like to use App Router? (recommended) → Yes
✔ Would you like to use Turbopack for `next dev`? → Yes
✔ Would you like to customize the import alias (@/* by default)? → No
```

Luego entrá al proyecto:

```bash
cd real-estate-web
```

---

## Paso 2: Instalar Dependencias

Ejecutá estos comandos en orden:

```bash
# shadcn/ui - Sistema de componentes
npx shadcn@latest init
```

Cuando te pregunte, elegí estas opciones:
```
✔ Which style would you like to use? → New York
✔ Which color would you like to use as the base color? → Neutral
✔ Would you like to use CSS variables for theming? → Yes
```

```bash
# Componentes de shadcn que vamos a usar
npx shadcn@latest add button card input textarea select badge skeleton
npx shadcn@latest add calendar dialog sheet dropdown-menu
npx shadcn@latest add carousel form label navigation-menu

# GSAP - Animaciones
npm install gsap @gsap/react

# Firebase
npm install firebase

# Iconos de Microsoft
npm install @fluentui/react-icons

# Parser de calendarios iCal (para Airbnb)
npm install ical.js

# Formularios y validación
npm install react-hook-form zod @hookform/resolvers

# Manejo de fechas
npm install date-fns

# Utilidades
npm install clsx tailwind-merge class-variance-authority
```

---

## Paso 3: Crear Proyecto en Firebase

### 3.1 - Ir a Firebase Console

1. Andá a https://console.firebase.google.com/
2. Hacé clic en **"Agregar proyecto"** o **"Add project"**
3. Poné un nombre al proyecto (ej: `real-estate-web`)
4. Google Analytics: podés desactivarlo por ahora (no es necesario)
5. Clic en **"Crear proyecto"**

### 3.2 - Registrar tu App Web

1. Una vez creado, en la pantalla principal del proyecto, hacé clic en el ícono **"</>"** (Web)
2. Poné un nombre a la app (ej: `real-estate-frontend`)
3. **NO** marques "Firebase Hosting" por ahora (vamos a usar Vercel)
4. Clic en **"Registrar app"**
5. Te va a mostrar un bloque de código con `firebaseConfig` - **COPIÁ ESOS VALORES**

Vas a ver algo así:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 3.3 - Habilitar Firestore Database

1. En el menú lateral izquierdo, andá a **"Firestore Database"**
2. Clic en **"Crear base de datos"** o **"Create database"**
3. Elegí **"Comenzar en modo de prueba"** (Start in test mode)
   - Esto permite leer/escribir sin autenticación por 30 días
   - Después lo aseguramos con reglas
4. Elegí la ubicación más cercana (ej: `southamerica-east1` para Argentina)
5. Clic en **"Habilitar"**

### 3.4 - Habilitar Storage (para imágenes)

1. En el menú lateral, andá a **"Storage"**
2. Clic en **"Comenzar"** o **"Get started"**
3. Elegí **"Comenzar en modo de prueba"**
4. Elegí la misma ubicación que Firestore
5. Clic en **"Listo"**

### 3.5 - Habilitar Authentication

1. En el menú lateral, andá a **"Authentication"**
2. Clic en **"Comenzar"** o **"Get started"**
3. En la pestaña **"Sign-in method"**, habilitá **"Correo electrónico/contraseña"**
4. Clic en **"Guardar"**

### 3.6 - Crear Usuario Admin (opcional, para después)

1. En Authentication, pestaña **"Users"**
2. Clic en **"Agregar usuario"**
3. Poné el email y contraseña del admin
4. Clic en **"Agregar usuario"**

---

## Paso 4: Configurar Variables de Entorno

En la raíz de tu proyecto, creá un archivo llamado `.env.local`:

```bash
touch .env.local
```

Y pegá este contenido, reemplazando con TUS valores de Firebase:

```env
# Firebase - Reemplazá estos valores con los de tu proyecto
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# URL del sitio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:** Agregá `.env.local` a tu `.gitignore` si no está (Next.js ya lo hace por defecto)

---

## Paso 5: Crear la Estructura de Carpetas

Ejecutá estos comandos para crear todas las carpetas:

```bash
# Crear estructura dentro de src/
mkdir -p src/components/ui
mkdir -p src/components/animations
mkdir -p src/components/properties
mkdir -p src/components/layout
mkdir -p src/components/home
mkdir -p src/components/forms

mkdir -p src/lib/firebase
mkdir -p src/lib/gsap
mkdir -p src/lib/airbnb

mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/constants

mkdir -p src/app/\(marketing\)/propiedades/\[slug\]
mkdir -p src/app/\(marketing\)/nosotros
mkdir -p src/app/\(marketing\)/contacto
mkdir -p src/app/\(admin\)/dashboard/propiedades/\[id\]
mkdir -p src/app/\(admin\)/dashboard/configuracion
mkdir -p src/app/api/properties/\[id\]
mkdir -p src/app/api/availability/\[propertyId\]
mkdir -p src/app/api/contact
```

---

## Paso 6: Crear Archivos Base

Los archivos de configuración de Firebase, GSAP, tipos, etc. están en los archivos adjuntos de este pack:

- `src/lib/firebase/config.ts` - Inicialización de Firebase
- `src/lib/firebase/firestore.ts` - Helpers para Firestore
- `src/lib/gsap/gsapConfig.ts` - Configuración de GSAP
- `src/types/property.ts` - Tipos de propiedades
- `src/components/animations/ScrollReveal.tsx` - Componente de animación
- `firestore.rules` - Reglas de seguridad

---

## Paso 7: Probar que Todo Funcione

```bash
npm run dev
```

Abrí http://localhost:3000 y deberías ver la página default de Next.js.

---

## Paso 8: Crear Primera Propiedad de Prueba

Podés crear datos de prueba directamente desde Firebase Console:

1. Andá a Firebase Console → Firestore Database
2. Clic en **"Iniciar colección"** o **"Start collection"**
3. ID de colección: `properties`
4. ID del documento: dejá en "Auto-ID"
5. Agregá estos campos:

| Campo | Tipo | Valor |
|-------|------|-------|
| title | string | Departamento en Palermo |
| slug | string | departamento-palermo-001 |
| description | string | Hermoso departamento de 2 ambientes... |
| price | number | 150000 |
| currency | string | USD |
| propertyType | string | apartment |
| listingType | string | sale |
| address | string | Thames 1234 |
| neighborhood | string | Palermo |
| city | string | Buenos Aires |
| bedrooms | number | 2 |
| bathrooms | number | 1 |
| area | number | 65 |
| amenities | array | [balcón, cocina integrada] |
| images | array | [] |
| isFeatured | boolean | true |
| isActive | boolean | true |
| createdAt | timestamp | (clic en el ícono de reloj) |
| updatedAt | timestamp | (clic en el ícono de reloj) |

6. Clic en **"Guardar"**

---

## 🎉 ¡Listo!

Ya tenés todo configurado para empezar a desarrollar. Los próximos pasos son:

1. Crear el layout principal (Header, Footer)
2. Crear el componente PropertyCard
3. Implementar la página Home
4. Crear el listado de propiedades
5. etc...

---

## Comandos Útiles

```bash
# Iniciar en desarrollo
npm run dev

# Build de producción
npm run build

# Ver errores de TypeScript
npm run lint

# Iniciar servidor de producción (después del build)
npm run start
```

---

## Recursos

- [Documentación Next.js 15](https://nextjs.org/docs)
- [Documentación Firebase](https://firebase.google.com/docs)
- [Documentación GSAP](https://gsap.com/docs/v3/)
- [Componentes shadcn/ui](https://ui.shadcn.com/docs/components)
- [Iconos Fluent UI](https://github.com/microsoft/fluentui-system-icons)
