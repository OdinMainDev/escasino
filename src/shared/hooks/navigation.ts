import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'ru'] as const;
export const localePrefix = 'always';
export const pathnames = {
  '/': '/',
  '/games/[id]': '/games/[id]',
  '/games': '/games',
  '/terms': '/terms',
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
