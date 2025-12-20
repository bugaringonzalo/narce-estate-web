// src/components/animations/ScrollReveal.tsx
'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsapConfig';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean; // Si true, la animación solo se ejecuta una vez
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  className,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Configuración de posición inicial según dirección
  const getInitialPosition = () => {
    const positions = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
      none: { x: 0, y: 0 }, // Solo fade
    };
    return positions[direction];
  };

  useGSAP(() => {
    if (!ref.current) return;

    const element = ref.current;
    const initial = getInitialPosition();

    // Configurar estado inicial
    gsap.set(element, {
      opacity: 0,
      ...initial,
    });

    // Crear animación con ScrollTrigger
    gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%', // Inicia cuando el top del elemento está al 85% del viewport
        end: 'top 20%',
        toggleActions: once ? 'play none none none' : 'play none none reverse',
        // markers: process.env.NODE_ENV === 'development', // Descomentar para debug
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === element)
        .forEach((trigger) => trigger.kill());
    };
  }, [direction, delay, duration, distance, once]);

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
};
