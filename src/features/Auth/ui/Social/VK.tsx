'use client';

import { useEffect } from 'react';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { doSocialsVkProcess } from '@/features/Auth/api/vk';
import { ISocialsVkProcessRequest } from '@/features/Auth/models/vk';
import { constructUrlWithCurrentDomain } from '@/shared/helpers/constructUrl';
import { vkUrl } from '@/app/config/socials';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthProvider } from '@/app/providers/AuthProvider';

const AuthVk = () => {
  const [searchParams] = useSearchParams();
  const { setAuthenticated } = useAuthProvider();
  const navigate = useNavigate();
  useEffect(() => {
    searchParams.get('code');
    if (!searchParams.get('code')) {
      navigate('/', { replace: true });
      return;
    }
    const handleClick = async () => {
      try {
        const fid = await getVisitorId();
        // TODO: после тестов изменить ссылку на нормальную
        let url = constructUrlWithCurrentDomain(vkUrl);
        url = 'https://exch.viorenginetest.com/socials/social_vk.php';
        const postData: ISocialsVkProcessRequest = {
          fid: fid,
          code: searchParams.get('code') ?? '',
          a_hash: searchParams.get('a_hash'),
          a_cid: searchParams.get('a_cid'),
          return_url: url,
        };
        const { data } = await doSocialsVkProcess(postData);
        if (!data.success) {
          // TODO: ошибку выводить
          return;
        }
        setAuthenticated(data.token);
        navigate('/', { replace: true });
      } catch (e) {
        console.log(e);
      }
    };
    void handleClick();
  }, []);

  return <div></div>;
};

export default AuthVk;
