
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZAP Dating App Admin",
  description: "ZAP App Admin",
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
