'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins una sola vez para evitar memory leaks
if (typeof window !== 'undefined' && !gsap.core.globals()['ScrollTrigger']) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
