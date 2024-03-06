import Button from '@/views/components/Button';
import styles from './AuthFooter.module.scss';

const AuthFooter = () => {
  // const dispatch = useDispatch<AppDispatch>();

  const openLogin = () => {
    document.body.classList.add('overflow-hidden');
    // dispatch(openLoginModal());
  };

  const openRegistration = () => {
    document.body.classList.add('overflow-hidden');
    // dispatch(openRegistrationModal());
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
