import styles from './Form.module.scss';
import Button from '@/shared/ui/Button';
import { useModal } from '@/app/providers/ModalProvider';
import { useTranslation } from 'react-i18next';

const AuthResetSetPasswordComplete = () => {
  const { t } = useTranslation();
  const { doOpenModal } = useModal();

  const sendData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    doOpenModal('login');
  };
  return (
    <form className={styles.container}>
      <div>
        <div className={styles.title}>{t('newPasswordSendMail')}</div>
        <Button className={styles.button} onClick={sendData}>
          {t('enterAccount')}
        </Button>
      </div>
    </form>
  );
};

export default AuthResetSetPasswordComplete;
