import styles from './style.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Button from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';

const FooterAuthButtons = () => {
  const { t } = useTranslation();
  const { doOpenModal } = useModal();
  const openLogin = () => {
    document.body.classList.add('overflow-hidden');
    doOpenModal('login');
  };

  const openRegistration = () => {
    document.body.classList.add('overflow-hidden');
    doOpenModal('register');
  };

  return (
    <div className={styles.container}>
      <Button elType="outlined" className={styles.button} onClick={openLogin}>
        {t('enter')}
      </Button>
      <Button className={styles.button} onClick={openRegistration}>
        {t('register')}
      </Button>
    </div>
  );
};

export default FooterAuthButtons;
