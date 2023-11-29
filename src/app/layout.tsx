import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '@/shared/assets/styles/globals.scss';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Black Casino',
  description: 'Casino',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
