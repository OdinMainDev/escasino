import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { defaultLanguages, defaultLanguage } from '@/common/config/locales';

interface IProps {
  children: ReactNode;
}

const LangProvider = ({ children }: IProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    // TODO: исправить ошибку
    const supportedLangs = defaultLanguages;
    // TODO: исправить ошибку
    const defaultLang = defaultLanguage;
    const userLang = navigator.language.split('-')[0];
    if (!pathParts[0] || !supportedLangs.includes(pathParts[0])) {
      const redirectLang = supportedLangs.includes(userLang) ? userLang : defaultLang;
      navigate(`/${redirectLang}${location.pathname}`, { replace: true });
      return;
    }
    void i18n.changeLanguage(lang);
  }, [navigate, location]); // не надо ли добавить , i18n, lang?

  return children;
};

export default LangProvider;
