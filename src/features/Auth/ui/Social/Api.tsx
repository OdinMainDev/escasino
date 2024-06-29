'use client';

import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ISocialsApiRequest } from '../../models/api';
import { doApiProcess } from '../../api/api';
import { useAuthProvider } from '@/app/providers/AuthProvider';

const AuthApi = () => {
  const [searchParams] = useSearchParams();
  const { setAuthenticated } = useAuthProvider();
  const navigate = useNavigate();
  useEffect(() => {
    const h = searchParams.get('h');
    if (!h || h == '') {
      navigate('/', { replace: true });
      return;
    }
    const b = searchParams.get('b');
    if (!b || b == '') {
      navigate('/', { replace: true });
      return;
    }
    const handleAuth = async () => {
      try {
        const fid = await getVisitorId();
        const postData: ISocialsApiRequest = {
          fid: fid,
          h: h,
          b: b,
        };
        const { data } = await doApiProcess(postData);
        if (!data.success) {
          // TODO: ошибку выводить
          return;
        }
        setAuthenticated(data.token);
        navigate('/', { replace: true });
      } catch (e) {
        // console.log(e);
      }
    };
    void handleAuth();
  }, []);

  return <div></div>;
};

export default AuthApi;
