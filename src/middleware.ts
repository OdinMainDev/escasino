import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix, pathnames } from './shared/hooks/navigation';

export default createMiddleware({
  defaultLocale: 'ru',
  localePrefix,
  locales,
  pathnames,
});

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
};
