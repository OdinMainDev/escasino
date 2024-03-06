import Button from '@/views/components/Button';
import styles from './AuthFooter.module.scss';
import { useModal } from '@/app/providers/ModalProvider';

const AuthFooter = () => {
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
        Войти
      </Button>
      <Button className={styles.button} onClick={openRegistration}>
        Регистрация
      </Button>
    </div>
  );
};

export default AuthFooter;
