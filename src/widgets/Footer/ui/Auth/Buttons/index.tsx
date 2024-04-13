import styles from './style.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Button from '@/shared/ui/Button';

const FooterAuthButtons = () => {
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

export default FooterAuthButtons;
