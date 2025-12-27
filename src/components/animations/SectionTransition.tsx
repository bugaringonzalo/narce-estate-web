// src/components/animations/SectionTransition.tsx
'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsapConfig';
import { cn } from '@/lib/utils';

type TransitionType =
  | 'fade-up'
  | 'fade-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'rotate-in'
  | 'flip'
  | 'split'
  | 'blur-in'
  | 'glitch';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  /** Tipo de transicion */
  type?: TransitionType;
  /** Duracion de la animacion */
  duration?: number;
  /** Delay antes de iniciar */
  delay?: number;
  /** Distancia del movimiento */
  distance?: number;
  /** Threshold de visibilidad para iniciar (0-100) */
  threshold?: number;
  /** Si la animacion debe repetirse al scroll */
  once?: boolean;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className,
  type = 'fade-up',
  duration = 1,
  delay = 0,
  distance = 100,
  threshold = 80,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const element = ref.current;

    // Configuracion segun tipo de transicion
    const getAnimationConfig = (): { from: gsap.TweenVars; to: gsap.TweenVars } => {
      switch (type) {
        case 'fade-up':
          return {
            from: { opacity: 0, y: distance },
            to: { opacity: 1, y: 0 },
          };

        case 'fade-down':
          return {
            from: { opacity: 0, y: -distance },
            to: { opacity: 1, y: 0 },
          };

        case 'slide-left':
          return {
            from: { opacity: 0, x: distance, skewX: 5 },
            to: { opacity: 1, x: 0, skewX: 0 },
          };

        case 'slide-right':
          return {
            from: { opacity: 0, x: -distance, skewX: -5 },
            to: { opacity: 1, x: 0, skewX: 0 },
          };

        case 'zoom-in':
          return {
            from: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
            to: { opacity: 1, scale: 1, filter: 'blur(0px)' },
          };

        case 'rotate-in':
          return {
            from: { opacity: 0, rotation: 10, y: distance / 2 },
            to: { opacity: 1, rotation: 0, y: 0 },
          };

        case 'flip':
          return {
            from: { opacity: 0, rotationX: -90, transformOrigin: 'top center' },
            to: { opacity: 1, rotationX: 0 },
          };

        case 'split':
          return {
            from: { opacity: 0, scaleY: 0, transformOrigin: 'center center' },
            to: { opacity: 1, scaleY: 1 },
          };

        case 'blur-in':
          return {
            from: { opacity: 0, filter: 'blur(20px)', scale: 1.1 },
            to: { opacity: 1, filter: 'blur(0px)', scale: 1 },
          };

        case 'glitch':
          return {
            from: { opacity: 0, x: 0, skewX: 20 },
            to: { opacity: 1, x: 0, skewX: 0 },
          };

        default:
          return {
            from: { opacity: 0, y: distance },
            to: { opacity: 1, y: 0 },
          };
      }
    };

    const config = getAnimationConfig();

    gsap.set(element, config.from);

    gsap.to(element, {
      ...config.to,
      duration,
      delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: `top ${threshold}%`,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    // Efecto especial para glitch
    if (type === 'glitch') {
      gsap.to(element, {
        x: () => (Math.random() - 0.5) * 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        delay: delay + 0.1,
        scrollTrigger: {
          trigger: element,
          start: `top ${threshold}%`,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === element)
        .forEach((trigger) => trigger.kill());
    };
  }, [type, duration, delay, distance, threshold, once]);

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{ perspective: '1000px' }}
    >
      {children}
    </div>
  );
};

/**
 * Linea decorativa animada
 */
interface AnimatedLineProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  color?: string;
  duration?: number;
  delay?: number;
}

export const AnimatedLine: React.FC<AnimatedLineProps> = ({
  className,
  direction = 'horizontal',
  color = 'currentColor',
  duration = 1,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const isHorizontal = direction === 'horizontal';

    gsap.fromTo(
      ref.current,
      {
        scaleX: isHorizontal ? 0 : 1,
        scaleY: isHorizontal ? 1 : 0,
        transformOrigin: 'left center',
      },
      {
        scaleX: 1,
        scaleY: 1,
        duration,
        delay,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [direction, duration, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        direction === 'horizontal' ? 'h-[2px] w-full' : 'w-[2px] h-full',
        className
      )}
      style={{ backgroundColor: color }}
    />
  );
};

/**
 * Container que revela contenido con mascara
 */
interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
  /** Color de la mascara durante la transicion */
  maskColor?: string;
}

export const MaskReveal: React.FC<MaskRevealProps> = ({
  children,
  className,
  direction = 'left',
  duration = 1.2,
  delay = 0,
  maskColor = 'hsl(var(--primary))',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !maskRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    const getMaskAnimation = () => {
      switch (direction) {
        case 'left':
          return { from: { x: '-100%' }, to: { x: '100%' } };
        case 'right':
          return { from: { x: '100%' }, to: { x: '-100%' } };
        case 'up':
          return { from: { y: '100%' }, to: { y: '-100%' } };
        case 'down':
          return { from: { y: '-100%' }, to: { y: '100%' } };
      }
    };

    const maskAnim = getMaskAnimation();

    // Contenido oculto inicialmente
    gsap.set(contentRef.current, { opacity: 0 });

    // Mascara entra
    tl.fromTo(
      maskRef.current,
      maskAnim.from,
      {
        ...{ x: '0%', y: '0%' },
        duration: duration / 2,
        delay,
        ease: 'power4.inOut',
      }
    );

    // Contenido aparece mientras mascara esta encima
    tl.to(
      contentRef.current,
      { opacity: 1, duration: 0.01 },
      `-=${duration / 4}`
    );

    // Mascara sale
    tl.to(maskRef.current, {
      ...maskAnim.to,
      duration: duration / 2,
      ease: 'power4.inOut',
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === containerRef.current)
        .forEach((trigger) => trigger.kill());
    };
  }, [direction, duration, delay]);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      {/* Mascara */}
      <div
        ref={maskRef}
        className="absolute inset-0 z-10"
        style={{ backgroundColor: maskColor }}
      />

      {/* Contenido */}
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
