import { JSX } from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material';
import { CheckBoxOutlineBlankRounded, CheckRounded, RemoveRounded } from '@mui/icons-material';

/*

  차이점 및 고려 사항
	1.	Outline vs. Ring
	•	원래 MUI 코드는 CSS outline 속성을 사용합니다.
	•	Tailwind CSS에서는 기본적으로 focus:outline-none으로 브라우저 기본 아웃라인을 제거한 뒤, focus:ring 유틸리티를 사용해 focus 효과(포커스 링)를 적용합니다.
	•	주의:
	•	CSS outline과 focus:ring은 렌더링 방식이 다릅니다. 특히, outline은 요소 경계 바로 외부에 표시되지만, ring은 (보통) 요소 주변에 그림자처럼 표시됩니다.
	•	또한, 두께에서도 차이가 있습니다. 원래는 3px였으나, 제공된 Tailwind 예시에서는 ring-2로 2px 두께를 사용했습니다.
	•	3px 두께를 원한다면 focus:ring-[3px]와 같이 arbitrary value를 사용할 수 있습니다.
	2.	대상 상태
	•	MUI에서는 &.Mui-focusVisible을 사용해 특정 포커스 상태(키보드 포커스 등)를 적용합니다.
	•	Tailwind에서는 일반적으로 focus: 접두사를 사용하여 포커스 상태에 스타일을 적용합니다.
	•	실질적으로 대부분의 경우 두 방식은 비슷하게 동작하지만, 세부적인 포커스 상태 처리 방식에 약간의 차이가 있을 수 있습니다.
*/
//shadow-[inset_0_0_0_1.5px_hsla(210,0%,0%,0.04)] 
//dark:shadow-[inset_0_0_0_1.5px_hsl(210,0%,0%)] 
export const Checkbox = (props: CheckboxProps): JSX.Element => {
  // 기본 라이트 모드 스타일
  const baseClasses = `
    text-black/60
    
    !m-[10px] 
    !h-[16px] !w-[16px]
    
    !rounded-[5px]
    border border-solid border-gray-300/80
    shadow-[inset_0_0_0_1.5px_hsla(210,0%,0%,0.04)] 
    bg-gray-100/40
    transition-colors duration-[120ms] ease-in

    hover:border-brand-300

    focus:outline-none 
    focus:ring-[3px]
    focus:ring-brand-500/50 
    focus:ring-offset-[2px]
    focus:border-brand-400

    checked:text-white
    checked:!bg-brand-500
    checked:border-brand-500
    checked:shadow-none 

    hover:checked:bg-brand-600
  `;

  // 다크 모드 스타일
  const darkClasses = `
    dark:!border dark:!border-solid dark:!border-gray-700/80 
    dark:!shadow-[inset_0_0_0_1.5px_hsl(210,0%,0%)] 
    dark:!bg-gray-900/80
    dark:hover:!border-brand-300
    dark:focus:!border-brand-400
    dark:focus:!outline-[3px_solid_brand-500/50] 
    dark:focus:!outline-offset-[2px]
  `;

  const combinedClasses = `
    ${baseClasses} ${darkClasses}
  `.replace(/\s+/g, ' ').trim();

  return (
    <MuiCheckbox
      disableRipple={true}
      disableTouchRipple={true}
      icon={<CheckBoxOutlineBlankRounded sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />}
      checkedIcon={<CheckRounded sx={{ height: 14, width: 14 }} />}
      indeterminateIcon={<RemoveRounded sx={{ height: 14, width: 14 }} />}
      // slotProps={{
      //   input: {
      //     className: 'checked:bg-brand-400',
      //   }
      // }}
      className={combinedClasses}
      sx={{
        '& .Mui-checked': {
          color: 'white',
          boxShadow: 'none',
          borderColor: '',
        },
      }}
      {...props}
    />
  );
};