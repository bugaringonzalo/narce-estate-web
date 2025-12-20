'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap/gsapConfig';
import { Navigation24Regular } from '@fluentui/react-icons';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { mainNavigation } from '@/constants';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  // Animación del header en scroll
  useGSAP(() => {
    if (!headerRef.current) return;

    gsap.to(headerRef.current, {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      scrollTrigger: {
        start: 'top -50',
        end: 'top -50',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  const isActivePath = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {mainNavigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={'text-sm font-medium transition-colors hover:text-primary ' + (
                    isActivePath(link.href)
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Abrir menú"
            >
              <Navigation24Regular />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
};
