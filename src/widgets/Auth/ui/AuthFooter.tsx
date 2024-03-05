import Button from '@/shared/ui/Button';
import styles from './AuthFooter.module.scss';
import { useAppDispatch } from '@/shared/hooks/redux';
import { openLoginModal, openRegistrationModal } from '@/store/slices/authModalSlice';
const AuthFooter = () => {
  const dispatch = useAppDispatch();

  const openLogin = () => {
    document.body.classList.add('overflow-hidden');
    dispatch(openLoginModal());
  };

  const openRegistration = () => {
    document.body.classList.add('overflow-hidden');
    dispatch(openRegistrationModal());
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
