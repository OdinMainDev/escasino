import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

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
    const supportedLangs = ['ru', 'en'];
    const defaultLang = 'ru';
    const userLang = navigator.language.split('-')[0];
    void i18n.changeLanguage(lang);
    if (!pathParts[0] || !supportedLangs.includes(pathParts[0])) {
      const redirectLang = supportedLangs.includes(userLang) ? userLang : defaultLang;
      navigate(`/${redirectLang}${location.pathname}`, { replace: true });
    }
  }, [navigate, location]);

  return children;
};

export default LangProvider;
