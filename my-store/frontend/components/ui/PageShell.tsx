import type { PropsWithChildren } from 'react';
import PageSection from '@/components/ui/PageSection';

interface PageShellProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'tight' | 'flush';
  sectionClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  id?: string;
}

export default function PageShell({
  children,
  title,
  subtitle,
  headingLevel = 1,
  variant = 'default',
  sectionClassName = '',
  containerClassName = '',
  contentClassName = '',
  id,
}: PageShellProps) {
  return (
    <PageSection
      id={id}
      title={title}
      subtitle={subtitle}
      headingLevel={headingLevel}
      variant={variant}
      className={sectionClassName}
      containerClassName={containerClassName}
    >
      <div className={['page-shell__content', contentClassName].filter(Boolean).join(' ')}>{children}</div>
    </PageSection>
  );
}
