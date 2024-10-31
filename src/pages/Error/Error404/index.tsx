import { useTranslation } from 'react-i18next';

const Error404 = () => {
  const { t } = useTranslation();
  return `${t('error')} 404`;
};

export default Error404;
