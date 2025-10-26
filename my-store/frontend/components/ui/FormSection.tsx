import type { PropsWithChildren, ReactNode } from 'react';

interface FormSectionProps extends PropsWithChildren {
  title?: string;
  description?: ReactNode;
  columns?: 1 | 2;
  className?: string;
  headerClassName?: string;
}

export default function FormSection({
  title,
  description,
  columns = 1,
  className = '',
  headerClassName = '',
  children,
}: FormSectionProps) {
  const sectionClassName = ['form-section', className].filter(Boolean).join(' ');
  const headerClass = ['form-section__header', headerClassName].filter(Boolean).join(' ');
  const gridClass = ['form-grid', columns === 2 ? 'form-grid--two' : ''].filter(Boolean).join(' ');

  return (
    <section className={sectionClassName}>
      {(title || description) && (
        <div className={headerClass}>
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}
      <div className={gridClass}>{children}</div>
    </section>
  );
}
