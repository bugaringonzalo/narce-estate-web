'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  propertyId: string;
  variant?: 'default' | 'card';
  className?: string;
}

export function FavoriteButton({ propertyId, variant = 'default', className }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const isFav = isFavorite(propertyId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(propertyId);
  };

  if (variant === 'card') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:scale-110',
          className
        )}
        aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-colors',
            isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'
          )}
        />
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className={className}
      aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-colors',
          isFav ? 'fill-red-500 text-red-500' : ''
        )}
      />
    </Button>
  );
}
