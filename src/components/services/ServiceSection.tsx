'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ServiceSectionProps {
  title: string;
  description: string;
  listTitle?: string;
  items?: string[];
  footer?: string;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  description,
  listTitle,
  items,
  footer,
}) => {
  return (
    <ScrollReveal direction="up" duration={0.6}>
      <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="font-serif text-lg font-bold tracking-tight text-foreground">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {items && items.length > 0 && (
          <>
            {listTitle && (
              <p className="mt-4 text-sm font-semibold text-foreground">
                {listTitle}
              </p>
            )}
            <ul className="mt-3 space-y-2 pl-5 text-sm text-muted-foreground">
              {items.map((item) => (
                <li key={item} className="list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        {footer && (
          <p className="mt-4 text-sm font-semibold text-foreground">
            {footer}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
};
