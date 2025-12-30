// src/components/animations/FormSuccessAnimation.tsx
'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap/gsapConfig';
import { cn } from '@/lib/utils';
import { Check, Sparkles, Mail, Rocket } from 'lucide-react';

interface FormSuccessAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
  className?: string;
  message?: string;
  submessage?: string;
}

/**
 * Animacion espectacular de exito al enviar formulario
 * El formulario "vuela" y aparece un mensaje de confirmacion con particulas
 */
export const FormSuccessAnimation: React.FC<FormSuccessAnimationProps> = ({
  isVisible,
  onComplete,
  className,
  message = '¡Mensaje enviado!',
  submessage = 'Te responderemos a la brevedad',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => onComplete?.(), 2000);
      },
    });

    // 1. Fade in del contenedor
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    // 2. Rocket despega con trail
    if (rocketRef.current) {
      tl.fromTo(
        rocketRef.current,
        {
          y: 100,
          x: -50,
          rotation: -45,
          scale: 0.5,
          opacity: 0,
        },
        {
          y: -200,
          x: 200,
          rotation: 45,
          scale: 1.5,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.in',
        },
        0.1
      );
    }

    // 3. Explosion de particulas
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      tl.fromTo(
        particles,
        {
          scale: 0,
          opacity: 1,
          x: 0,
          y: 0,
        },
        {
          scale: () => Math.random() * 1.5 + 0.5,
          opacity: 0,
          x: () => (Math.random() - 0.5) * 300,
          y: () => (Math.random() - 0.5) * 300,
          rotation: () => Math.random() * 360,
          duration: 1,
          stagger: {
            amount: 0.3,
            from: 'center',
          },
          ease: 'power2.out',
        },
        0.4
      );
    }

    // 4. Check icon aparece con bounce
    if (checkRef.current) {
      tl.fromTo(
        checkRef.current,
        {
          scale: 0,
          rotation: -180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(2)',
        },
        0.6
      );

      // Pulse effect
      tl.to(
        checkRef.current,
        {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        },
        1.2
      );
    }

    // 5. Texto aparece con stagger
    if (textRef.current) {
      const textElements = textRef.current.children;
      tl.fromTo(
        textElements,
        {
          opacity: 0,
          y: 30,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          stagger: 0.15,
          ease: 'power3.out',
        },
        0.9
      );
    }

    // 6. Glow pulsante en el check
    if (checkRef.current) {
      tl.to(
        checkRef.current,
        {
          boxShadow: '0 0 60px rgba(34, 197, 94, 0.6)',
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
        1.4
      );
    }

    return () => {
      tl.kill();
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-gradient-to-br from-background/95 via-background to-background/95',
        'backdrop-blur-md',
        className
      )}
    >
      {/* Rocket que vuela */}
      <div
        ref={rocketRef}
        className="absolute text-primary"
        style={{ fontSize: '3rem' }}
      >
        <Rocket className="w-12 h-12" />
      </div>

      {/* Particulas de celebracion */}
      <div
        ref={particlesRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              color: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'][
                i % 5
              ],
            }}
          >
            <Sparkles className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative flex flex-col items-center text-center px-6">
        {/* Check icon con circulo */}
        <div
          ref={checkRef}
          className="relative flex items-center justify-center w-24 h-24 rounded-full bg-green-500 text-white shadow-lg"
          style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}
        >
          <Check className="w-12 h-12 stroke-[3]" />
        </div>

        {/* Texto */}
        <div ref={textRef} className="mt-8 space-y-2">
          <h2 className="text-3xl font-bold text-foreground">{message}</h2>
          <p className="text-lg text-muted-foreground">{submessage}</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>Revisá tu casilla de email</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Wrapper para animar la salida del formulario
 */
interface FormFlyAwayProps {
  children: React.ReactNode;
  isSubmitting: boolean;
  isSuccess: boolean;
  className?: string;
}

export const FormFlyAway: React.FC<FormFlyAwayProps> = ({
  children,
  isSubmitting,
  isSuccess,
  className,
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  useGSAP(() => {
    if (!formRef.current) return;

    if (isSubmitting && !isSuccess) {
      // Efecto de "temblor" mientras se envia
      gsap.to(formRef.current, {
        x: () => (Math.random() - 0.5) * 4,
        y: () => (Math.random() - 0.5) * 4,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
      });
    } else if (isSuccess) {
      // Animacion de salida epica
      gsap.to(formRef.current, {
        y: -100,
        rotateX: 20,
        rotateY: -10,
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => setShouldRender(false),
      });
    } else {
      // Reset
      gsap.killTweensOf(formRef.current);
      gsap.set(formRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
      });
    }
  }, [isSubmitting, isSuccess]);

  if (!shouldRender) return null;

  return (
    <div
      ref={formRef}
      className={cn('will-change-transform', className)}
      style={{ perspective: '1000px' }}
    >
      {children}
    </div>
  );
};
