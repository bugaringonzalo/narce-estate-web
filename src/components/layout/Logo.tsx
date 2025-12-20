'use client';

import Link from 'next/link';
import { Home24Regular } from '@fluentui/react-icons';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Home24Regular className="text-primary" />
      <span className="text-xl font-bold tracking-tight">
        Narce Estate
      </span>
    </Link>
  );
};
