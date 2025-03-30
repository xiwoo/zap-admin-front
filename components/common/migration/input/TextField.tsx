import { JSX } from 'react';
import { TextField as MuiTextField, TextFieldProps, OutlinedInput } from '@mui/material';

export const TextField = ({
  size = 'medium',
  className = '', sx = {},
  slotProps: {
    input = {}, ...slotProps
  } = {},
  ...props
}: TextFieldProps): JSX.Element => {
  // 1. 루트 컨테이너 스타일: 패딩, border, background, border-radius, 전환 효과, hover, focus 스타일
  const baseClasses = `
    text-gray-800
    px-[12px] py-[8px]
    border border-solid border-gray-500/40
    bg-[hsl(0,0%,99%)]
    rounded-lg
    transition-colors duration-[120ms] ease-in
    hover:border-gray-400
    dark:text-[hsl(0,0%,100%)]
    dark:bg-gray-950
    dark:hover:border-gray-500
  `;
  // 포커스 상태: outline 대신 Tailwind의 ring 사용 (3px 두께, hsla(210,98%,42%,0.5), ring-offset-2, focus:border 색상)
  const focusClasses = `
    focus:outline-none 
    focus:ring-[3px] 
    focus:ring-[hsla(210,98%,42%,0.5)] 
    focus:ring-offset-2 
    focus:border-[hsl(210,98%,48%)]
  `;
  // 2. 사이즈 variant에 따른 높이 설정
  const sizeClasses = size === 'small' ? 'h-9' : 'h-10';
  
  // 3. Input 내부 스타일: 입력 패딩 제거, placeholder 스타일
  const inputClasses = `
    placeholder-opacity-70 
    placeholder:text-gray-500
  `;
  
  // 4. 최종 클래스 조합 (기본, focus, 사이즈, 그리고 추가 className)
  const combinedClasses = `
    ${baseClasses} ${focusClasses} ${sizeClasses} ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <MuiTextField
      {...props}
      variant="outlined"
      sx={{
        ...sx,
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none', // 원하는 색상
        },
      }}
      slotProps={{
        input: {
          ...input,
          className: `${combinedClasses} ${inputClasses} `.trim(),
        },
        htmlInput: { style: { padding: 0 } },
        ...slotProps
      }}
    />
  );
};