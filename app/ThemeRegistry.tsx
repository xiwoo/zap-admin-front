
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { ReactNode } from "react";

export default function ThemeRegistry({
  children,
}: { children: ReactNode; emotionCache?: any;}) {

  return (
    <AppRouterCacheProvider options={{ 
      key: 'css', 
      prepend: true,
      // enableCssLayer: true // 적용 시, MUI 컴포넌트 기존 속성(component, variant 등) 내용이 적용되지 않음
    }}>
      {children}
    </AppRouterCacheProvider>
  );
}