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
  h1: 'text-5xl leading-[1.2] font-semibold tracking-[-0.5px]',
  h2: 'text-4xl leading-[1.2] font-semibold',
  h3: 'text-3xl leading-[1.2]',
  h4: 'text-2xl leading-[1.5] font-semibold',
  h5: 'text-xl font-semibold',
  h6: 'text-lg font-semibold',
  subtitle1: 'text-lg',
  subtitle2: 'text-sm font-medium',
  body1: 'text-sm',
  body2: 'text-sm font-normal',
  caption: 'text-xs font-normal',
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