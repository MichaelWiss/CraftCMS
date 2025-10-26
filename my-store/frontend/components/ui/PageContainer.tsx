import type { PropsWithChildren, HTMLAttributes } from 'react';

type PageContainerProps = PropsWithChildren<
  {
    className?: string;
  } & HTMLAttributes<HTMLDivElement>
>;

export default function PageContainer({ children, className = '', ...rest }: PageContainerProps) {
  const composedClassName = ['page-container', className].filter(Boolean).join(' ');

  return (
    <div className={composedClassName} {...rest}>
      {children}
    </div>
  );
}
