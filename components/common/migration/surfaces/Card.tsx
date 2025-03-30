import { JSX } from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, PaperProps } from '@mui/material';

interface CardProps extends Omit<MuiCardProps, 'classes'>, Omit<PaperProps, 'classes'> {
  classes?: MuiCardProps['classes'] | PaperProps['classes'];
}

export const Card = ({
  variant,
  children,
  className,
  ...props
}: CardProps): JSX.Element => {

  const baseClasses = `
    p-[16px]
    gap-[16px]
    transition-all duration-100 ease
    rounded-lg
    border border-solid border-gray-300/40
    shadow-none
    dark:border-gray-700/60
  `;

  let variantClasses = 'bg-gray-50';
  if (variant === 'outlined') {
    variantClasses = `
      bg-[hsl(0, 0%, 100%)]
      dark:bg-gray-900/40
    `;
  }
  else {
    variantClasses = `
      bg-gray-50
      dark:bg-gray-800
    `;
  }

  // 4. 최종 클래스 조합 
  const combinedClasses = `
    ${className} ${baseClasses} ${variantClasses}
  `.replace(/\s+/g, ' ').trim();

  return (
    <MuiCard
      variant={variant}
      className={combinedClasses}
      {...props}
    >
      {children}
    </MuiCard>
  );
}