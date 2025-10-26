import type { PropsWithChildren, HTMLAttributes, ReactNode } from 'react';

type PageSectionProps = PropsWithChildren<
  {
    className?: string;
    containerClassName?: string;
    variant?: 'default' | 'tight' | 'flush';
    id?: string;
    title?: string;
    subtitle?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  } & HTMLAttributes<HTMLElement>
>;

export default function PageSection({
  children,
  className = '',
  containerClassName = '',
  variant = 'default',
  id,
  title,
  subtitle,
  headingLevel = 2,
  ...rest
}: PageSectionProps) {
  const sectionClasses = [
    'page-section',
    variant === 'tight' && 'page-section--tight',
    variant === 'flush' && 'page-section--flush',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={sectionClasses} {...rest}>
      <div className={['page-container', containerClassName].filter(Boolean).join(' ')}>
        {(title || subtitle) && (
          <div className="page-section__header">
            {title && (
              <Heading headingLevel={headingLevel} className="page-section__title">
                {title}
              </Heading>
            )}
            {subtitle && <p className="page-section__subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

interface HeadingProps {
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: ReactNode;
}

function Heading({ headingLevel, className = '', children }: HeadingProps) {
  const Tag = (`h${headingLevel}` as keyof JSX.IntrinsicElements);
  return <Tag className={className}>{children}</Tag>;
}
