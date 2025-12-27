// src/components/animations/AnimatedCounter.tsx
'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsapConfig';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  /** Valor final del contador */
  value: number;
  /** Prefijo (ej: "$", "+") */
  prefix?: string;
  /** Sufijo (ej: "%", "K", " anos") */
  suffix?: string;
  /** Duracion de la animacion */
  duration?: number;
  /** Decimales a mostrar */
  decimals?: number;
  /** Separador de miles */
  separator?: string;
  className?: string;
  /** Delay antes de iniciar */
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
  separator = '.',
  className,
  delay = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useGSAP(() => {
    if (!ref.current) return;

    const counter = { value: 0 };

    gsap.to(counter, {
      value,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(counter.value);
      },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.trigger === ref.current)
        .forEach((trigger) => trigger.kill());
    };
  }, [value, duration, delay]);

  // Formatear numero con separador de miles
  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const [integer, decimal] = fixed.split('.');
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return decimal ? `${formattedInteger},${decimal}` : formattedInteger;
  };

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
};

/**
 * Componente de estadisticas con contador y label
 */
interface StatItemProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  prefix,
  suffix,
  duration = 2,
  delay = 0,
  className,
  valueClassName,
  labelClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className={cn('text-center', className)}>
      <div className={cn('text-4xl font-bold', valueClassName)}>
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          duration={duration}
          delay={delay + 0.2}
        />
      </div>
      <p className={cn('mt-2 text-sm text-muted-foreground', labelClassName)}>
        {label}
      </p>
    </div>
  );
};
