import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '@/shared/assets/styles/globals.scss';
import { Providers } from '@/store';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Black Casino',
  description: 'Casino',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
