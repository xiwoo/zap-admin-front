import { JSX } from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'inherit';

interface TypographyProps extends Omit<MuiTypographyProps, 'variant'> {
  variant: Variant;
}

const variantClasses: Record<Variant, string> = {
  h1: 'text-[3rem] font-semibold leading-[1.2] tracking-[-0.5px]',
  h2: 'text-[2.25rem] font-semibold leading-[1.2]',
  h3: 'text-[1.875rem] leading-[1.2]',
  h4: 'text-[1.5rem] font-semibold leading-[1.5]',
  h5: 'text-[1.25rem] font-semibold',
  h6: 'text-[1.125rem] font-semibold',
  subtitle1: 'text-[1.125rem]',
  subtitle2: 'text-[0.875rem] font-medium',
  body1: 'text-[0.875rem]',
  body2: 'text-[0.875rem] font-normal',
  caption: 'text-[0.75rem] font-normal',
  inherit: '',
};

const Typography = ({
  variant = 'body1',
  className = '',
  ...props
}: TypographyProps): JSX.Element => {

  // MUI의 Typography prop variant와 별개로, Tailwind 스타일 클래스는 별도로 적용
  const tailwindClasses = `font-sans text-gray-800 dark:text-[hsl(0,0%,100%)] ${variantClasses[variant]} ${className}`.trim();
  return (
    <MuiTypography variant={variant} className={tailwindClasses} {...props} />
  );
};

export default Typography;