
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZAP Dating App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {


  return (
    <main>
      {children}
    </main>
  );
}
