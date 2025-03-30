import { JSX } from 'react';
import { Stack as MuiStack, StackProps } from '@mui/material';

const AuthContainer = ({
  children,
  ...props
}: StackProps): JSX.Element => {

  return (
    <MuiStack
      className="
        relative
        h-[calc((1-var(--template-frame-height,0))*100dvh)]
        min-h-full
        p-4 sm:p-8
        flex flex-col justify-between
      "
      {...props}
    >
      {/* 배경 오버레이 역할의 요소 */}
      <div
        className="
          absolute inset-0 z-[-1]
          bg-no-repeat
          bg-[radial-gradient(ellipse_at_50%_50%,_hsl(210,100%,97%),_hsl(0,0%,100%))]
          dark:bg-[radial-gradient(at_50%_50%,_hsla(210,100%,16%,0.5),_hsl(220,30%,5%))]
        "
      />
      {children}
    </MuiStack>
  )
};

export default AuthContainer;