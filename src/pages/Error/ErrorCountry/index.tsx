import { useTranslation } from 'react-i18next';
import lock from './lock.svg';
import styles from './styles.module.scss';

const ErrorCountry = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('sorry')}</div>
      <div className={styles.subtitle}>{t('countryYouCameFromNoAccess')}</div>
      <div className={styles.subtitle}>( {t('countryBan')} )</div>
      <img src={lock} className={styles.lock} alt="lock" />
    </div>
  );
};

export default ErrorCountry;
