import { JSX } from 'react';
import { IconButton as MuiIconButton, IconButtonProps } from '@mui/material';

export const IconButton = ({
  size = 'medium',
  className = '',
  children,
  ...props
}: IconButtonProps): JSX.Element => {

  // 1. 기본 클래스: MUI IconButton의 기본 동작을 대체하기 위한 클래스들
  const baseClasses = `
    shadow-none 
    rounded-md 
    normal-case 
    font-medium 
    tracking-normal 
    transition-all ease-in duration-100 
    focus:outline-none focus:ring-2 focus:ring-blue-500
    text-gray-900 
    border border-solid border-gray-200 
    bg-gray-50/30
    hover:bg-gray-100 hover:border-gray-300 
    active:bg-gray-200
  `;

  // 2. 다크 모드 스타일 (Tailwind dark: 접두사를 사용)
  //    - 다크 모드 기본: 배경: gray-800, 테두리: gray-700
  //    - 다크 모드 Hover: 배경: gray-900, 테두리: gray-600; Active: bg-gray-900
  const darkClasses = `
    dark:bg-gray-800 
    dark:border-gray-700 
    dark:hover:bg-gray-900 dark:hover:border-gray-600 
    dark:active:bg-gray-900
  `;

  // 3. 사이즈 variant에 따른 클래스
  let sizeClasses = "";
  if (size === 'small') {
    // small: width/height: 2.25rem (w-9, h-9), padding: 0.25rem (p-1)
    sizeClasses = "w-9 h-9 p-1";
  } else if (size === 'medium') {
    // medium: width/height: 2.5rem (w-10, h-10); MUI의 기본 경우에는 padding은 따로 오버라이드하지 않음
    sizeClasses = "w-10 h-10";
  }

  // 5. 최종 클래스 조합
  const combinedClasses = [
    baseClasses,
    darkClasses,
    sizeClasses,
    className,
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <MuiIconButton {...props} className={combinedClasses}>
      {children}
    </MuiIconButton>
  );
};

export default IconButton;