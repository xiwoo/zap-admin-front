import { JSX } from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface BaseStyled {
  class: string;
  hover?: string;
  active?: string;
  dark?: string;
  darkHover?: string;
  darkActive?: string;
}

const styledToClassString = (styled: BaseStyled): string => `${styled.class} ${styled.hover ?? ''} ${styled.active ?? ''} ${styled.dark ?? ''} ${styled.darkHover ?? ''} ${styled.darkActive ?? ''}`;

export const Button = ({ 
  size = 'medium', 
  color = 'primary', 
  variant = 'contained', 
  className = '',
  children, 
  ...props 
}: ButtonProps ): JSX.Element => {
  
  // 1. 사이즈에 따른 클래스 (MUI에서는 size "small"의 경우 height와 padding 모두 지정, "medium"은 height만 지정)
  let sizeClasses = '';
  if (size === 'small') {
    // height: 2.25rem, padding: 8px 12px
    sizeClasses = 'h-9 py-2 px-3';
  } else if (size === 'medium') {
    // height: 2.5rem; 기본 패딩은 그대로 두도록 (Tailwind의 기본 text field나 버튼 padding 등과 맞출 수 있음)
    sizeClasses = 'h-10 px-4'; 
  } else if (size === 'large') {
    // (예시) large size: height와 padding 모두 재정의
    sizeClasses = 'h-12 py-3 px-5';
  }


  let variantClasses = '';

  switch(variant) { // variant 대응
    case 'contained': { // contained style

      switch(color) { // color 대응
        case 'primary': { // primary(기본) style

          variantClasses = styledToClassString({
            class: `
              text-white 
              bg-gray-900 
              bg-gradient-to-b from-gray-700 to-gray-950
              shadow-[inset_0_1px_0_hsl(220,20%,35%),_inset_0_-1px_0_1px_hsl(220,0%,0%)]
              border border-solid border-gray-700
            `,
            hover: `hover:bg-none hover:bg-gray-700 hover:shadow-none`,
            active: `active:bg-gray-800`,
            dark: `
              dark:text-black 
              dark:bg-gray-50 
              dark:bg-gradient-to-b dark:from-gray-100 dark:to-gray-50
              dark:shadow-[inset_0_-1px_0_hsl(220,30%,80%)]
              dark:border dark:border-solid dark:border-gray-50
            `,
            darkHover: `dark:hover:bg-none dark:hover:bg-gray-300 dark:hover:shadow-none`,
            darkActive: `dark:active:bg-gray-400`
          });

          break;
        }
        case 'secondary': {
    
          variantClasses = styledToClassString({
            class: `
              text-white 
              bg-brand-300 
              bg-[linear-gradient(to_bottom,hsla(210,98%,48%,0.8),hsl(210,98%,42%))]
              shadow-[inset_0_2px_0_hsl(200,20%,80%)]
              border border-brand-500 
            `,
            hover: `hover:bg-brand-700 hover:shadow-none`,
            active: `active:bg-brand-700 active:bg-none`,
          });

          break;
        }
      }

      break;
    }
    case 'outlined': { // outlined style

      switch(color) { // color 대응
        case 'primary': { // primary(기본) style

          variantClasses = styledToClassString({
            class: `
              border border-gray-200
              bg-[hsla(220,35%,97%,0.3)]
            `,
            hover: `hover:bg-gray-100 hover:border-gray-300`,
            active: `active:bg-gray-200`,
            dark: `
              dark:bg-gray-800
              dark:border-gray-700
            `,
            darkHover: `dark:hover:bg-gray-900 dark:hover:border-gray-600`,
            darkActive: `dark:active:bg-gray-900`
          });

          break;
        }
        case 'secondary': {

          variantClasses = styledToClassString({
            class: `
              text-brand-700
              border border-brand-200
              bg-brand-50
            `,
            hover: `hover:bg-brand-100 hover:border-brand-400`,
            active: `active:bg-brand-200/70`,
            dark: `
              dark:text-brand-50
              dark:border-brand-900
              dark:bg-gray-900/30
            `,
            darkHover: `dark:hover:bg-brand-900/60 dark:hover:border-brand-700/30`,
            darkActive: `dark:active:bg-brand-900/50`
          });

          break;
        }
      }

      break;
    }
    case 'text': { // text style

      switch(color) { // color 대응
        case 'primary': { // primary(기본) style

          variantClasses = styledToClassString({
            class: `
              text-gray-600
            `,
            hover: `hover:bg-gray-100`,
            active: `active:bg-gray-200`,
            dark: `
              dark:text-gray-50
            `,
            darkHover: `dark:hover:bg-gray-700`,
            darkActive: `dark:active:bg-gray-700/70`
          });

          break;
        }
        case 'secondary': {

          variantClasses = styledToClassString({
            class: `
              text-brand-700
            `,
            hover: `hover:bg-brand-100/50`,
            active: `active:bg-brand-200/70`,
            dark: `
              dark:text-brand-100
            `,
            darkHover: `dark:hover:bg-brand-900/50`,
            darkActive: `dark:active:bg-brand-900/30`
          });

          break;
        }
      }

      break;
    }
  
  }

  // 3. 기본 전환 효과 및 포커스 링 등
  const baseClasses = '!normal-case box-border transition-all ease-in duration-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';

  // 4. 최종 클래스 조합
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim().replace(/\s+/g, ' ');
  
  return (
    <MuiButton
      disableTouchRipple
      disableRipple
      {...props} className={combinedClasses}
    >
      {children}
    </MuiButton>
  );
};