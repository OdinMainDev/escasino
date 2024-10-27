import styles from './Form.module.scss';
import Button from '@/shared/ui/Button';
import { useModal } from '@/app/providers/ModalProvider';
import { useTranslation } from 'react-i18next';

const ProfileChangeEmailCompleteForm = () => {
  const { t } = useTranslation();
  const { doCloseModals } = useModal();

  const sendData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    doCloseModals();
  };
  return (
    <form className={styles.container}>
      <div>
        <div className={styles.title}>{t('emailChangeSuccessfully')}</div>
        <Button className={styles.button} onClick={sendData}>
          {t('close')}
        </Button>
      </div>
    </form>
  );
};

export default ProfileChangeEmailCompleteForm;
