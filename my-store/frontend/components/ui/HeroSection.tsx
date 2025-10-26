import type { PropsWithChildren, ReactNode } from 'react';

interface HeroSectionProps extends PropsWithChildren {
  title: string;
  highlight?: ReactNode;
  description?: ReactNode;
  symbol?: ReactNode;
  id?: string;
  className?: string;
}

export default function HeroSection({
  title,
  highlight,
  description,
  symbol,
  id,
  className = '',
  children,
}: HeroSectionProps) {
  return (
    <section id={id} className={['hero scroll-fade', className].filter(Boolean).join(' ')}>
      <div className="hero-image" aria-hidden={symbol ? undefined : 'true'}>
        {symbol}
      </div>
      <h2 className="hero-title">
        {title}
        {highlight}
      </h2>
      {description && <p className="hero-text">{description}</p>}
      {children}
    </section>
  );
}
