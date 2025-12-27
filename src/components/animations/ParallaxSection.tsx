// src/components/animations/ParallaxSection.tsx
'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsapConfig';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Velocidad del parallax (1 = normal, <1 = mas lento, >1 = mas rapido) */
  speed?: number;
  /** Direccion del parallax */
  direction?: 'vertical' | 'horizontal';
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  speed = 0.5,
  direction = 'vertical',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || !innerRef.current) return;

    const movement = 100 * speed;
    const axis = direction === 'vertical' ? 'y' : 'x';

    gsap.fromTo(
      innerRef.current,
      { [axis]: -movement },
      {
        [axis]: movement,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === ref.current)
        .forEach((trigger) => trigger.kill());
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
};

/**
 * Imagen con efecto parallax
 */
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  /** Escala extra para cubrir el overflow */
  scale?: number;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className,
  speed = 0.3,
  scale = 1.2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    const movement = 50 * speed;

    gsap.fromTo(
      imageRef.current,
      { y: -movement, scale },
      {
        y: movement,
        scale,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === containerRef.current)
        .forEach((trigger) => trigger.kill());
    };
  }, [speed, scale]);

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="h-full w-full object-cover will-change-transform"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
};

/**
 * Seccion con fondo parallax
 */
interface ParallaxBackgroundProps {
  children: ReactNode;
  backgroundUrl?: string;
  backgroundColor?: string;
  className?: string;
  overlayClassName?: string;
  speed?: number;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  backgroundUrl,
  backgroundColor,
  className,
  overlayClassName,
  speed = 0.3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !bgRef.current) return;

    const movement = 100 * speed;

    gsap.fromTo(
      bgRef.current,
      { y: -movement },
      {
        y: movement,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === containerRef.current)
        .forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      {/* Background layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
          backgroundColor: backgroundColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Extra height para el movimiento
          top: '-20%',
          bottom: '-20%',
          height: '140%',
        }}
      />

      {/* Overlay opcional */}
      {overlayClassName && (
        <div className={cn('absolute inset-0', overlayClassName)} />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
