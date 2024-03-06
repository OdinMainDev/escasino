import {
  URLSearchParamsInit,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useCallback, useMemo } from 'react';

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
    const langPrefixPattern = /^\/(ru|en)(\/|$)/;
    if (langPrefixPattern.test(pathname)) {
      return pathname.replace(langPrefixPattern, '/');
    }
    return pathname;
  }, [pathname]);

  return normalizedPathname;
}

interface QueryParams {
  [key: string]: string | string[] | boolean | undefined;
}

interface IPushData {
  pathname: string;
  query?: QueryParams;
}
export function useRouter() {
  const navigate = useNavigate();
  const { lang } = useParams();

  const push = useCallback(
    (pathOrObj: string | IPushData) => {
      if (typeof pathOrObj === 'string') {
        navigate(`/${lang}/${pathOrObj}`);
      } else {
        const { pathname, query } = pathOrObj;
        const searchParams = query
          ? `?${createSearchParams(query as URLSearchParamsInit).toString()}`
          : '';
        navigate({
          pathname: `/${lang}${pathname}`,
          search: searchParams,
        });
      }
    },
    [navigate],
  );
  return { push };
}
