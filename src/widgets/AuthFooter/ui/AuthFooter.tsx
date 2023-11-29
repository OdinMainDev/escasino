import Button from '@/shared/ui/Button';
import styles from './AuthFooter.module.scss';
import { useState } from 'react';

const AuthFooter = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegistration, setIsRegistraion] = useState(false);

  const openLoginModal = () => {
    setIsOpenLogin(true);
    setIsRegistraion(false);
  };

  return (
    <div className={styles.container}>
      <Button elType="outlined" className={styles.button}>
        Войти
      </Button>
      <Button className={styles.button}>Регистрация</Button>
    </div>
  );
};

export default AuthFooter;
