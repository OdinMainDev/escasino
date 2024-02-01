import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { Providers } from '@/store';
import '@/shared/assets/styles/globals.scss';
import AuthProvider from '@/store/ui/AuthProvider';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Black Casino',
  description: 'Casino',
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
