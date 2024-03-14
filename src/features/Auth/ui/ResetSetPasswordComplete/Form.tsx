import styles from './Form.module.scss';
import Button from '@/shared/components/Button';
import { useModal } from '@/app/providers/ModalProvider';

const AuthResetSetPasswordComplete = () => {
  const { doOpenModal } = useModal();

  const sendData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    doOpenModal('login');
  };
  return (
    <form className={styles.container}>
      <div>
        <div className={styles.title}>Новый пароль отправлен на электронную почту!</div>
        <Button className={styles.button} onClick={sendData}>
          Войти в аккаунт
        </Button>
      </div>
    </form>
  );
};

export default AuthResetSetPasswordComplete;
