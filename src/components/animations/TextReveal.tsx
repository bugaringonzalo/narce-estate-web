// src/components/animations/TextReveal.tsx
'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsapConfig';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: string;
  className?: string;
  /** Tipo de animacion */
  type?: 'words' | 'chars' | 'lines';
  /** Duracion de cada letra/palabra */
  duration?: number;
  /** Tiempo entre cada elemento */
  stagger?: number;
  /** Delay inicial */
  delay?: number;
  /** Usar ScrollTrigger */
  useScrollTrigger?: boolean;
  /** Tag HTML a usar */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className,
  type = 'words',
  duration = 0.8,
  stagger = 0.03,
  delay = 0,
  useScrollTrigger = true,
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('.split-element');
    if (elements.length === 0) return;

    const animation = {
      from: {
        opacity: 0,
        y: type === 'chars' ? 50 : 80,
        rotateX: type === 'chars' ? -90 : -45,
        scale: type === 'chars' ? 0.8 : 1,
      },
      to: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration,
        stagger: {
          amount: stagger * elements.length,
          from: 'start',
        },
        delay,
        ease: 'power4.out',
      },
    };

    gsap.set(elements, animation.from);

    if (useScrollTrigger) {
      gsap.to(elements, {
        ...animation.to,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    } else {
      gsap.to(elements, animation.to);
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === ref.current)
        .forEach((trigger) => trigger.kill());
    };
  }, [type, duration, stagger, delay, useScrollTrigger]);

  // Dividir texto segun tipo
  const renderSplitText = () => {
    if (type === 'chars') {
      return children.split('').map((char, i) => (
        <span
          key={i}
          className="split-element inline-block"
          style={{ perspective: '1000px' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    if (type === 'words') {
      return children.split(' ').map((word, i) => (
        <span
          key={i}
          className="split-element inline-block mr-[0.25em]"
          style={{ perspective: '1000px' }}
        >
          {word}
        </span>
      ));
    }

    // lines
    return children.split('\n').map((line, i) => (
      <span
        key={i}
        className="split-element block"
        style={{ perspective: '1000px' }}
      >
        {line}
      </span>
    ));
  };

  return (
    // @ts-expect-error - Tag dinamico
    <Tag ref={ref} className={cn('overflow-hidden', className)}>
      {renderSplitText()}
    </Tag>
  );
};

/**
 * Linea revelada con efecto de mascara
 */
interface LineRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
  useScrollTrigger?: boolean;
}

export const LineReveal: React.FC<LineRevealProps> = ({
  children,
  className,
  direction = 'up',
  duration = 1,
  delay = 0,
  useScrollTrigger = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current) return;

    const getClipPath = () => {
      switch (direction) {
        case 'left':
          return { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' };
        case 'right':
          return { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' };
        case 'up':
          return { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' };
        case 'down':
          return { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' };
      }
    };

    const clipPath = getClipPath();

    gsap.set(contentRef.current, { clipPath: clipPath.from });

    const animationConfig = {
      clipPath: clipPath.to,
      duration,
      delay,
      ease: 'power4.inOut',
    };

    if (useScrollTrigger) {
      gsap.to(contentRef.current, {
        ...animationConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    } else {
      gsap.to(contentRef.current, animationConfig);
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === containerRef.current)
        .forEach((trigger) => trigger.kill());
    };
  }, [direction, duration, delay, useScrollTrigger]);

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)}>
      <div ref={contentRef} className="will-change-[clip-path]">
        {children}
      </div>
    </div>
  );
};
