'use client';

import classNames from 'classnames';
import styles from './RegistrationForm.module.scss';

import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';

interface IProps {
  openLogin: () => void;
}

const RegistrationForm = ({ openLogin }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={classNames('title', styles.title)}>Регистрация нового игрока</div>
      <Input placeholder="Электронная почта" type="email" className={styles.input} />
      <div className={styles.input_description}>
        Адрес электронной почты будет использован как логин для входа в личный кабинет
      </div>
      <Button type="submit" className={styles.button}>
        Зарегистрироваться
      </Button>
      <div className={styles.label}>
        У вас уже есть личный кабинет? <span onClick={openLogin}>Войти</span>
      </div>
    </div>
  );
};

export default RegistrationForm;
