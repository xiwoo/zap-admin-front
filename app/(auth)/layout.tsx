
import type { Metadata } from "next";

import AuthContainer from '@/components/auth/AuthContainer';
import AuthCard from '@/components/auth/AuthCard';
import { SitemarkIcon } from '@/components/auth/CustomIcons';

import ColorModeSelect from '@/components/ColorModeSelect';


export const metadata: Metadata = {
  title: "ZAP Dating App Admin",
  description: "ZAP App Admin",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <main>
      <AuthContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <AuthCard variant="outlined">

          <SitemarkIcon />
          {children}
        </AuthCard>
      </AuthContainer>
    </main>
  );
}
