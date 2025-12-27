// src/components/animations/StaggerGrid.tsx
'use client';

import { useRef, ReactNode, Children } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsapConfig';
import { cn } from '@/lib/utils';

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  /** Tiempo entre cada elemento */
  stagger?: number;
  /** Duracion de cada animacion */
  duration?: number;
  /** Distancia de entrada */
  distance?: number;
  /** Direccion de entrada */
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  /** Delay inicial */
  delay?: number;
  /** Si usar ScrollTrigger */
  useScrollTrigger?: boolean;
}

export const StaggerGrid: React.FC<StaggerGridProps> = ({
  children,
  className,
  stagger = 0.1,
  duration = 0.6,
  distance = 60,
  direction = 'up',
  delay = 0,
  useScrollTrigger = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.children;
    if (items.length === 0) return;

    // Configuracion inicial segun direccion
    const getFromConfig = () => {
      switch (direction) {
        case 'up':
          return { opacity: 0, y: distance };
        case 'down':
          return { opacity: 0, y: -distance };
        case 'left':
          return { opacity: 0, x: distance };
        case 'right':
          return { opacity: 0, x: -distance };
        case 'scale':
          return { opacity: 0, scale: 0.8 };
        default:
          return { opacity: 0, y: distance };
      }
    };

    const toConfig = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      stagger: {
        amount: stagger * items.length,
        from: 'start',
      },
      delay,
      ease: 'power3.out',
    };

    if (useScrollTrigger) {
      gsap.set(items, getFromConfig());

      gsap.to(items, {
        ...toConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    } else {
      gsap.fromTo(items, getFromConfig(), toConfig);
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === containerRef.current)
        .forEach((trigger) => trigger.kill());
    };
  }, [stagger, duration, distance, direction, delay, useScrollTrigger, Children.count(children)]);

  return (
    <div ref={containerRef} className={cn('', className)}>
      {children}
    </div>
  );
};

/**
 * Item individual para usar dentro de StaggerGrid
 * Proporciona estilos base para will-change
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
};
