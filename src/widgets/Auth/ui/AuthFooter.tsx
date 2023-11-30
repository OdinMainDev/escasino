'use client';

import Button from '@/shared/ui/Button';
import styles from './AuthFooter.module.scss';
import { useState } from 'react';
import AuthLoginModal from './AuthLoginModal';
import AuthRegistrationModal from './AuthRegistrationModal';

const AuthFooter = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegistration, setIsRegistraion] = useState(false);

  const openLoginModal = () => {
    setIsOpenLogin(true);
    setIsRegistraion(false);
  };

  const openRegistrationModal = () => {
    setIsOpenLogin(false);
    setIsRegistraion(true);
  };

  const closeLoginModal = () => {
    setIsOpenLogin(false);
  };

  const closeRegistrationModal = () => {
    setIsRegistraion(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Button elType="outlined" className={styles.button} onClick={openLoginModal}>
          Войти
        </Button>
        <Button className={styles.button} onClick={openRegistrationModal}>
          Регистрация
        </Button>
      </div>
      <AuthLoginModal isOpen={isOpenLogin} close={closeLoginModal} />
      <AuthRegistrationModal isOpen={isOpenRegistration} close={closeRegistrationModal} />
    </>
  );
};

export default AuthFooter;
