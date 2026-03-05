export interface NavLink {
  href: string;
  label: string;
}

// Navegación principal: las 4 áreas de servicio
export const mainNavigation: NavLink[] = [
  {
    href: '/inversiones',
    label: 'Inversiones',
  },
  {
    href: '/compra-venta',
    label: 'Compra / Venta',
  },
  {
    href: '/alquileres',
    label: 'Alquileres',
  },
  {
    href: '/alquileres-temporales',
    label: 'Temporales',
  },
];

// Navegación secundaria: páginas institucionales
export const secondaryNavigation: NavLink[] = [
  {
    href: '/nosotros',
    label: 'Nosotros',
  },
  {
    href: '/contacto',
    label: 'Contacto',
  },
];

export const footerNavigation = {
  servicios: [
    { href: '/inversiones', label: 'Inversiones Inmobiliarias' },
    { href: '/compra-venta', label: 'Compra / Venta' },
    { href: '/alquileres', label: 'Alquileres' },
    { href: '/alquileres-temporales', label: 'Alquileres Temporales' },
  ],
  empresa: [
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
  ],
  legal: [
    { href: '/privacidad', label: 'Privacidad' },
    { href: '/terminos', label: 'Términos' },
  ],
};
