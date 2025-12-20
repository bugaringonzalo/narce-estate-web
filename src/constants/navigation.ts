export interface NavLink {
  href: string;
  label: string;
}

export const mainNavigation: NavLink[] = [
  {
    href: '/',
    label: 'Inicio',
  },
  {
    href: '/propiedades',
    label: 'Propiedades',
  },
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
  propiedades: [
    { href: '/propiedades?type=sale', label: 'En Venta' },
    { href: '/propiedades?type=rent', label: 'En Alquiler' },
    { href: '/propiedades?type=temporary', label: 'Alquiler Temporal' },
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
