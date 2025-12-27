// src/components/animations/HeroAnimations.tsx
'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap/gsapConfig';
import { cn } from '@/lib/utils';

interface HeroTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Animacion de texto principal del Hero con efecto de revelado
 */
export const HeroTitle: React.FC<HeroTextProps> = ({
  children,
  className,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const words = ref.current.querySelectorAll('.word');

    gsap.set(words, {
      opacity: 0,
      y: 100,
      rotateX: -90,
    });

    gsap.to(words, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      stagger: 0.08,
      delay,
      ease: 'power4.out',
    });
  }, [delay]);

  // Dividir children en palabras si es string
  const renderContent = () => {
    if (typeof children === 'string') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="word inline-block" style={{ perspective: '1000px' }}>
          {word}&nbsp;
        </span>
      ));
    }
    return <span className="word inline-block">{children}</span>;
  };

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      {renderContent()}
    </div>
  );
};

/**
 * Animacion de subtitulo con fade y slide
 */
export const HeroSubtitle: React.FC<HeroTextProps> = ({
  children,
  className,
  delay = 0.5,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        delay,
        ease: 'power3.out',
      }
    );
  }, [delay]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
};

/**
 * Contenedor animado para botones del Hero
 */
export const HeroButtons: React.FC<HeroTextProps> = ({
  children,
  className,
  delay = 0.8,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const buttons = ref.current.children;

    gsap.fromTo(
      buttons,
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        delay,
        ease: 'back.out(1.7)',
      }
    );
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

/**
 * Decoraciones con efecto parallax y float
 */
interface FloatingDecorationProps {
  className?: string;
  direction?: 'up' | 'down';
  speed?: number;
}

export const FloatingDecoration: React.FC<FloatingDecorationProps> = ({
  className,
  direction = 'up',
  speed = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    // Animacion de flotacion infinita
    gsap.to(ref.current, {
      y: direction === 'up' ? -20 * speed : 20 * speed,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Efecto parallax en scroll
    gsap.to(ref.current, {
      y: direction === 'up' ? -100 : 100,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, [direction, speed]);

  return <div ref={ref} className={className} />;
};

/**
 * Wrapper para el Hero completo con animaciones coordinadas
 */
interface AnimatedHeroProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    // Fade in inicial del contenedor
    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
};
