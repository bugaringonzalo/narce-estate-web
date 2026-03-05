'use client';

import Link from 'next/link';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = false }) => {
  return (
    <Link href="/" className={`flex items-baseline gap-2 ${className}`}>
      <span className="text-lg font-extrabold tracking-widest uppercase">
        Arce Monsegur
      </span>
      {showTagline && (
        <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
          Estrategias en Real Estate y Finanzas
        </span>
      )}
    </Link>
  );
};
