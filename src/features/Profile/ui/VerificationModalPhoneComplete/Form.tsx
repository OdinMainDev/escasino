import styles from './Form.module.scss';
import Button from '@/shared/ui/Button';
import { useModal } from '@/app/providers/ModalProvider';

const ProfileVerificationPhoneCompleteForm = () => {
  const { doCloseModals } = useModal();

  const sendData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    doCloseModals();
  };
  return (
    <form className={styles.container}>
      <div>
        <div className={styles.title}>Успешно подтвержден телефон</div>
        <Button className={styles.button} onClick={sendData}>
          Закрыть
        </Button>
      </div>
    </form>
  );
};

export default ProfileVerificationPhoneCompleteForm;
