'use client';

import { useState, useEffect } from 'react';
import {
  ArrowUp24Regular,
  Chat24Filled,
} from '@fluentui/react-icons';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '5491112345678'; // Cambiar por el número real
const WHATSAPP_MESSAGE = 'Hola! Me gustaría obtener más información sobre sus propiedades.';

export const FloatingButtons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to top button */}
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className={`
          h-12 w-12 rounded-full shadow-lg bg-background/95 backdrop-blur-sm
          border-border/50 hover:bg-muted transition-all duration-300
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
        aria-label="Volver arriba"
      >
        <ArrowUp24Regular className="h-5 w-5" />
      </Button>

      {/* WhatsApp button */}
      <Button
        onClick={openWhatsApp}
        className="h-14 w-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#20BD5A] transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <Chat24Filled className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};
