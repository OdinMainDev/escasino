import React, { useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { defaultLanguages } from '../config/locales';

const LanguageGuard: React.FC = () => {
  const params = useParams<{ lang?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.lang || !defaultLanguages.includes(params.lang)) {
      navigate('/', { replace: true });
    }
  }, [params.lang, navigate]);

  return <Outlet />;
};

export default LanguageGuard;
