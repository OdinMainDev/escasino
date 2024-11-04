/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { defaultLanguage, defaultLanguages } from '@/app/config/locales';

interface IProps {
  children: ReactNode;
}

const LangProvider = ({ children }: IProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const supportedLangs = defaultLanguages;
    
    if (pathParts[0] && supportedLangs.includes(pathParts[0])) {
      void i18n.changeLanguage(pathParts[0]);
    } else {
      void i18n.changeLanguage(defaultLanguage);
    }
  }, [location]);

  return children;
};

export default LangProvider;

export const useCurrentLanguage = () => {
  const { i18n } = useTranslation();
  return i18n.language;
};
