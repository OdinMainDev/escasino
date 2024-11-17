/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { defaultLanguages } from '@/app/config/locales';
import { useTranslation } from 'react-i18next';

interface UseSearchParams {
  get: (name: string) => string | null;
  getAll: (name: string) => string[];
}

export function useQuery(): UseSearchParams {
  const { search } = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const get = (name: string): string | null => {
    return searchParams.get(name);
  };

  const getAll = (name: string): string[] => {
    return Array.from(searchParams.getAll(name));
  };

  return { get, getAll };
}

export function usePathname(): string {
  const { pathname } = useLocation();

  const normalizedPathname = useMemo(() => {
    const langPrefixPattern = new RegExp(`^/(${defaultLanguages.join('|')})(/|$)`);
    if (langPrefixPattern.test(pathname)) {
      return pathname.replace(langPrefixPattern, '/');
    }
    return pathname == '' ? '/' : pathname;
  }, [pathname]);

  return normalizedPathname;
}

interface QueryParams {
  [key: string]: string | string[] | boolean | undefined | null;
}

interface IPushData {
  pathname: string;
  query?: QueryParams;
}
export function useRouter() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const supportedLangs = defaultLanguages;

  const goBack = () => {
    navigate(-1);
  };

  const replace = (pathname: string) => {
    navigate(`${lang ? '/' + lang : ''}${pathname}`, { replace: true });
  };

  const push = useCallback(
    (pathOrObj: string | IPushData) => {
      let url = '';

      if (lang && supportedLangs.includes(lang)) {
        url = '/' + lang;
      }

      if (typeof pathOrObj === 'string') {
        url += pathOrObj;
        navigate(url);
        return;
      }

      const { pathname, query } = pathOrObj;
      const searchParams = new URLSearchParams();

      if (query) {
        Object.keys(query).forEach((key) => {
          const value = query[key];
          if (Array.isArray(value)) {
            value.forEach((val) => searchParams.append(`${key}[]`, val.toString()));
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
          }
        });
      }

      const search = searchParams.toString();
      navigate({
        pathname: `${lang ? '/' + lang : ''}${pathname}`,
        search: search ? `?${search}` : '',
      });
      return;
    },
    [navigate],
  );
  return { push, goBack, replace };
}
